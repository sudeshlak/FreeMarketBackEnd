import { INewProduct, IProductCategory } from '../types/productTypes';

const Products = require('../models/products');

export const addProductService = async (newProduct: INewProduct) => {
  try {
    return await Products.create(newProduct);
  } catch (err) {
    throw new Error('Failed to create product');
  }
};

export const getAllProductService = async () => {
  try {
    return await Products.find();
  } catch (err) {
    throw new Error('Products not found');
  }
};

export const getOneProductService = async (id:string) => {
  try {
    return await Products.findById({ _id: id });
  }catch (err){
    throw new Error('Product not found');
  }
}

export const deleteProductService = async (id: string) => {
  try {
    return await Products.findByIdAndDelete({ _id: id });
  } catch (err) {
    throw new Error('Failed to delete product');
  }
};

export const updateProductService = async (id: string, newProduct: INewProduct) => {
  try {
    if (newProduct.image === '') {
      return await Products.findOneAndUpdate({ _id: id }, {
        title: newProduct.title,
        category: newProduct.category,
        quantity: newProduct.quantity,
        regular_price: newProduct.regular_price,
        discount_price: newProduct.discount_price,
      }, { new: true });
    } else {
      return await Products.findOneAndUpdate({ _id: id }, newProduct, { new: true });
    }
  } catch (err) {
    throw new Error('Failed to update product');
  }
};

