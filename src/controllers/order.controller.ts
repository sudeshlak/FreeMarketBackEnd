import {
  addOrderService,
  changeOrderStatusService,
  getAllOrderService,
  getOneOrderService,
} from '../services/order.service';
import { Context } from '../types/context';
import { INewOrder, IOrder, IState } from '../types/orderTypes';
import { VerifyAdminAuthorization, VerifyAuthorization } from '../decorators/auth.decorator';
import * as jwt from 'jsonwebtoken';
import { INewProduct, IProduct } from '../types/productTypes';
import { getOneProductService, updateProductService } from '../services/product.service';

export class OrdersController {
  @VerifyAuthorization
  async getAllOrders(ctx: Context) {
    return await getAllOrderService();
  }

  @VerifyAuthorization
  async getOrdersByToken(ctx: Context, token: string) {
    const payload = <{ data: string; iat: number }>(
      jwt.verify(token, <string>process.env.auth_encryption_salt));
    const email: string = payload['data'];
    const orders: IOrder[] = await getAllOrderService();
    return orders.filter((order: IOrder) => order.requestedUser.email === email);
  }

  @VerifyAuthorization
  async addOrder(ctx: Context, newOrder: INewOrder) {
    return await addOrderService(newOrder);
  }

  @VerifyAdminAuthorization
  async changeOrderStatus(ctx: Context, id: string, newState: IState) {
    const order: IOrder = await getOneOrderService(id);
    if (newState === 'approved') {
      let flag: boolean = true;
      let errorMassage: string[] = [];
      for (const productInOrder of order.productList) {
        const tempProduct: IProduct = await getOneProductService(productInOrder.id);
        if (!tempProduct || tempProduct.quantity - productInOrder.quantity < 0) {
          if (!tempProduct) {
            errorMassage.push('Product ' + productInOrder.title + ' does not exists');
          } else if (tempProduct.quantity - productInOrder.quantity < 0) {
            errorMassage.push('Product ' + productInOrder.title + ' quantity is not enough');
          }
          flag = false;
        }
      }
      if (!flag) {
        return {
          changed: false,
          order: null,
          productErrorMessages: errorMassage,
        };
      }
      for (const productInOrder of order.productList) {
        const tempProduct: IProduct = await getOneProductService(productInOrder.id);
        const newProduct: INewProduct = {
          category: tempProduct.category,
          discount_price: tempProduct.discount_price,
          quantity: tempProduct.quantity - productInOrder.quantity,
          image: '',
          regular_price: tempProduct.regular_price,
          title: tempProduct.title,
        };
        await updateProductService(productInOrder.id, newProduct);
      }
    }
    return {
      changed: true,
      order: await changeOrderStatusService(id, newState),
      productErrorMessages: null,
    };
  }

  @VerifyAuthorization
  async getOneOrder(ctx: Context, id: string) {
    return await getOneOrderService(id);
  }
}