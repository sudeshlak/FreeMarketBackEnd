import {INewCategory} from "../types/CategoryTypes";

const Category = require('../models/category');

export const addCategoryService = async (newCategory: INewCategory) => {
  try {
    return await Category.create(newCategory);
  } catch (err) {
    throw new Error('Failed to create category');
  }
}

export const getAllCategoriesService = async () => {
  try {
    return await Category.find();
  } catch (err) {
    throw new Error('Categories not found');
  }
}
