import axios from "axios";
import { ApiErrorException, ApiErrorTypes } from "./errors";
import { showError } from "../common"
import I18n from 'react-native-i18n';
export default class Auth {

  signUp = async (data) => {
    try {
      const res = await axios.post("driverregister", data);
      if (res.data.status === 200) { return res.data }
      else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          "ui-error-happened"
        );
      }
    } catch (error) {
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          "ui-networkConnectionError"
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          "CUSTOM ERROR"
          // JSON.parse(JSON.stringify(error.response)).data.error[0].msg
        );
      }
    }
  };

  signIn = async (data) => {
    try {
      const res = await axios.post("driverlogin", data);
      if (res.data.status === 200) { return res.data }
      else if (res.data.status === 403) {
        showError(res.data.message)
        return
      }
    } catch (error) {
      showError(I18n.t("ui-error-happened"))
    }
  };

  getPrincipalUserProfileData = async clientId => {
    try {
      const res = await axios.get(`clients/${clientId}`);
      return res.data;
    } catch (error) {
      if (!error.response) {
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

  updatePrincipalUserProfileData = async (clientId, data) => {
    try {
      const res = await axios.put(`clients/${clientId}`, data);
      return res.data;
    } catch (error) {
      if (!error.response) {
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

  verifyCode = async (
    data = {
      phone,
      confirmationCode
    }
  ) => {
    try {
      const res = await axios.post("clients/confirm-code", data);
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          "ui-networkConnectionError"
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          JSON.parse(JSON.stringify(error.response)).data.error[0].msg
        );
      }
    }
  };
}
