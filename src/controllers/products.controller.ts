import { Context } from '../types/context';
import { INewProduct, IProduct } from '../types/productTypes';
import { VerifyAdminAuthorization, VerifyAuthorization } from '../decorators/auth.decorator';
import {
  addProductService,
  deleteProductService,
  getAllProductService, getOneProductService,
  updateProductService,
} from '../services/product.service';
import { Bucket, s3 } from '../config';

export class ProductsController {
  @VerifyAdminAuthorization
  async addProduct(ctx: Context, newProduct: INewProduct) {
    return await addProductService(newProduct);
  }

  async getAllProducts() {
    return await getAllProductService();
  }

  async getOneProduct(id: string) {
    return await getOneProductService(id);
  }

  @VerifyAdminAuthorization
  async deleteProduct(ctx: Context, id: string, imageName: string) {
    try {
      const params = { Bucket, Key: imageName };
      await s3.deleteObject(params).promise();
      return await deleteProductService(id);
    } catch (err) {
      throw new Error('Failed to delete product');
    }
  }

  @VerifyAdminAuthorization
  async updateProduct(ctx: Context, id: string, newProduct: INewProduct) {
    try {
      if (newProduct.image === '') {
        return await updateProductService(id, newProduct);
      } else {
        const tempProduct: IProduct = await getOneProductService(id);
        const params = { Bucket, Key: tempProduct.image };
        await s3.deleteObject(params).promise();
        return await updateProductService(id, newProduct);
      }
    } catch (err) {
      throw new Error('Failed to delete product');
    }
  }
}