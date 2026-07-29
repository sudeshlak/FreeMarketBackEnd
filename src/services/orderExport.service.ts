import { pipeline, Transform, TransformCallback } from "stream";

const Order = require('../models/orders');


class OrderToCsvTransform extends Transform {
    private isFirstChunk = true;
    private header = 'orderCode,status,paymentType,paymentStatus,requestedDate,discountPercentage,customerEmail,customerName,billingFullName,billingAddress,billingCity,billingPostalCode,billingCountry,billingContactNumber,productCount\n';
    
    constructor() {
        super({objectMode:true});
    }

    _transform(order: any, encoding: string, callback: TransformCallback): void {
        try {
            if(this.isFirstChunk){
                this.push(this.header);
                this.isFirstChunk = false;
            }
            // Extract fields from order
            const row = [
                order.orderCode || '',
                order.status || '',
                order.paymentType || '',
                order.paymentStatus || '',
                order.requestedDate || '',
                order.discountPercentage || '',
                order.requestedUser?.email || '',
                order.requestedUser?.name || '',
                order.billingDetails?.fullName || '',
                order.billingDetails?.address || '',
                order.billingDetails?.city || '',
                order.billingDetails?.postalCode || '',
                order.billingDetails?.country || '',
                order.billingDetails?.contactNumber || '',
                order.productList?.length || 0
            ];
        
            // Convert to CSV line with proper escaping
            const csvLine = row.map(field => {
                const str = String(field);
                // Escape quotes by doubling them
                const escaped = str.replace(/"/g, '""');
                // Wrap in quotes if contains comma, quote, or newline
                if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${escaped}"`;
                }
                return escaped;
            }).join(',') + '\n';
        
            this.push(csvLine);
            callback();            
        } catch (error) {
            callback(error as Error);
            
        }
    }

}

export async function streamOrdersToCsv(res:any):Promise<void>{
    try {

        res.setHeader('Content-type','text/csv; charset=utf-8');
        res.setHearder('Content-Disposition', 'attach');

        const cursor  = Order.find({}).populate('user').populate('requestedUser').cursor();

        // Create transform stream
        const csvTransform = new OrderToCsvTransform();
    
        // Pipeline: cursor → transform → response
        await pipeline(cursor, csvTransform, res);
        
    } catch (error) {
        // Destroy response if headers already sent
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to stream orders' });
        } else {
            res.destroy();
        }
    }
}
