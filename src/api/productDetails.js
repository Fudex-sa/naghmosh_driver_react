import axios from "axios";
import { ApiErrorException, ApiErrorTypes } from "./errors";
import { showError } from "../common";
import I18n from "react-native-i18n";
export default class ProductDetails {
  constructor() {
    this.productSourceToken = axios.CancelToken.source();
  }

  getProduct = async (productId, token) => {
    try {
      const res = await axios.get(`singleproduct?api_token=${token}&productId=${productId}`, {
        cancelToken: this.productSourceToken.token
      });

      if (res.status === 200 && res.data.status === 200) { return res.data.data }
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

  cancelGetProduct = () => {
    this.productSourceToken.cancel();
  };

}
