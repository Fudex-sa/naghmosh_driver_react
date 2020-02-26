import ProductsApi from "../api/products";

export default class Products {
  constructor() {
    this.productsApi = new ProductsApi();
  }

  getProducts = async (orderBy, token) => {
    const products = await this.productsApi.getProducts(orderBy, token);
    return products;
  };

  cancelGetProducts = () => {
    this.productsApi.cancelGetProducts();
  };

}
