import { Context } from '../../types/context';
import { IResolvers } from 'graphql-tools';
import * as jwt from 'jsonwebtoken';
import { AppConstants } from '../../constants/app.constants';
import { UsersController } from '../../controllers/users.controller';
import { ProductsController } from '../../controllers/products.controller';
import { CategoryController } from '../../controllers/categories.controller';
import { ImageController } from '../../controllers/image.controller';
import { OrdersController } from '../../controllers/order.controller';
import { CouponController } from '../../controllers/coupon.controller';

const usersController = new UsersController();
const productController = new ProductsController();
const imageController = new ImageController();
const categoryController = new CategoryController();
const orderController = new OrdersController();
const couponController = new CouponController();

const resolvers: IResolvers = {
  Query: {
    getAllCategories: () => {
      return categoryController.getAllCategories();
    },
    getAllProducts: async () => {
      return await productController.getAllProducts();
    },
    getAllOrders: async (_, args, ctx: Context) => {
      return await orderController.getAllOrders(ctx);
    },
    getAllCoupons: async (_, args, ctx: Context) => {
      return await couponController.getAllCoupons(ctx);
    },
  },

  Mutation: {
    token: (_, args: any) => {
      return jwt.sign({ data: args[AppConstants.EMAIL] }, <string>process.env.auth_encryption_salt);
    },
    getOneOrder: async (_, { id }, ctx: Context) => {
      return await orderController.getOneOrder(ctx, id);
    },
    changeOrderStatus: async (_, { id, newState }, ctx: Context) => {
      return await orderController.changeOrderStatus(ctx, id, newState);
    },
    getOrdersByToken: async (_, { token }, ctx: Context) => {
      return await orderController.getOrdersByToken(ctx, token);
    },
    getUserByToken: async (_, { token }, ctx: Context) => {
      return await usersController.getUserByToken(ctx, token);
    },
    addOrder: async (_, { newOrder }, ctx: Context) => {
      return await orderController.addOrder(ctx, newOrder);
    },
    addProduct: async (_, { newProduct }, ctx: Context) => {
      return await productController.addProduct(ctx, newProduct);
    },
    addCategory: async (_, { newCategory }, ctx: Context) => {
      return categoryController.addCategory(newCategory, ctx);
    },
    addUser: (_, { newUser }, ctx: Context) => {
      return usersController.addUser(newUser);
    },
    login: (_, { email, password }, ctx: Context) => {
      return usersController.login(email, password);
    },
    updateUser: (_, inputObject, ctx: Context) => {
      return usersController.updateUser(inputObject);
    },
    generatePutUrl: (_, { image }, ctx: Context) => {
      return imageController.generatePutUrl(ctx, image);
    },
    generateGetUrl: (_, { image }, ctx: Context) => {
      return imageController.generateGetUrl(image);
    },
    deleteProduct: async (_, { id, imageName }, ctx: Context) => {
      return await productController.deleteProduct(ctx, id, imageName);
    },
    updateProduct: async (_, { id, newProduct }, ctx: Context) => {
      return await productController.updateProduct(ctx, id, newProduct);
    },
    addCoupon:async (_, {newCoupon},ctx:Context)=>{
      return await couponController.addCoupon(ctx,newCoupon);
    },
    deleteCoupon:async (_, {id},ctx:Context)=>{
      return await couponController.deleteCoupon(ctx,id);
    },
    getOneCoupon:async (_, {couponCode},ctx:Context)=>{
      return await couponController.getOneCoupon(couponCode);
    }
  },
};

export default resolvers;