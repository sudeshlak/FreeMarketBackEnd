import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendOrderStatusEmail = async(
    payload:{
    email:string,
    orderCode:string,
    status:string
    }
)=> {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: payload.email,
        subject: `Free Market - Order ${payload.orderCode} status updated`,
        text: `Your Order ${payload.orderCode} status changed to ${payload.status}`
    });
}
