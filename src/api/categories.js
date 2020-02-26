import axios from "axios";
import { ApiErrorException, ApiErrorTypes } from "./errors";
import { showError } from "../common";
export default class Categories {
  constructor() {
    this.allCategoriesSourceToken = axios.CancelToken.source();
  }

  getAllCategories = async () => {
    try {
      const res = await axios.get("categories", {
        cancelToken: this.allCategoriesSourceToken.token
      });

      if (res.data.status === 200) { return res.data.data }
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

  cancelGetAllCategories = () => {
    this.allCategoriesSourceToken.cancel();
  };

}
