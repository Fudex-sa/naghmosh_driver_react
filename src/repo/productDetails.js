import ProductDetailsApi from "../api/productDetails";

export default class productDetails {
  constructor() {
    this.productDetailsApi = new ProductDetailsApi();
  }

  getProduct = async (productId, token) => {
    const product = await this.productDetailsApi.getProduct(productId, token);
    return product;
  };

  cancelGetProducts = () => {
    this.productDetailsApi.cancelGetProduct();
  };

}
