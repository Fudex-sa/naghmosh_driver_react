import axios from "axios";
import { ApiErrorException, ApiErrorTypes } from "./errors";
import { showError } from "../common";
import I18n from "react-native-i18n";
export default class Products {
  constructor() {
    this.productsSourceToken = axios.CancelToken.source();
  }

  getProducts = async (orderBy, token) => {
    try {
      const res = await axios.get(`productsfilter?api_token=${token}&orderBy=${orderBy}`, {
        cancelToken: this.productsSourceToken.token
      });

      if (res.status === 200 && res.data.status === 206) { return res.data.products.data }
      else {
        showError(I18n.t("ui-error-happened"))
        return
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new ApiErrorException(ApiErrorTypes.CANCEL, "api-cancel");
      } else if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          "ui-networkConnectionError"
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          "ui-error-happened"
        );
      }
    }
  };

  cancelGetProducts = () => {
    this.productsSourceToken.cancel();
  };

}
