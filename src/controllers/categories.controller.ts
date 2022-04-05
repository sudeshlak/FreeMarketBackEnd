import {INewCategory} from "../types/CategoryTypes";
import {Context} from "../types/context";
import {addCategoryService} from "../services/category.service";
import {getAllCategoriesService} from "../services/category.service";

export class CategoryController {
  async addCategory(newCategory: INewCategory, ctx: Context) {
    return await addCategoryService(newCategory);
  }

  async getAllCategories() {
    return await getAllCategoriesService();
  }
}