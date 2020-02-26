import CategoriesApi from "../api/categories";

export default class Categories {
  constructor() {
    this.categoriesApi = new CategoriesApi();
  }

  getAllCategories = async () => {
    const categories = await this.categoriesApi.getAllCategories();
    return categories;
  };

  cancelGetAllCategories = () => {
    this.categoriesApi.cancelGetAllCategories();
  };

}
