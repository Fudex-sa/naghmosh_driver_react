import I18n from "react-native-i18n";
import AsyncStorage from "@react-native-community/async-storage";
import { AppNavigation, showError } from "../common";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_RESET_ERROR, LOGOUT } from "./types";
import Api, { validateRequst } from "../utils/Network";
import store from "../store";

export const signIn = (values, setSubmitting) => async (dispatch, getState) => {
  try {
    console.log("onsign in", values);

    const res = await Api.post(`clientlogin`, values);

    console.log("^^^^^^^^^^^", res);

    const response = validateRequst(res);
    console.log("response ***** --->>>>", response.data.data);

    if (response.isError) {
      setSubmitting(false);
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError")
      });
      showError(response.data.message);
      return;
    }
    // success
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    getCart()(dispatch, getState);
    await AsyncStorage.setItem("@CART", "");
    await AsyncStorage.setItem("@TOTAL", "");
    await AsyncStorage.setItem("@COUNTER", "");

    await AsyncStorage.setItem(
      "@CurrentUser",
      JSON.stringify(response.data.data)
    );
    setSubmitting(false);

    AppNavigation.init("MAIN_STACK", {
      rtl: store.getState().lang.rtl,
      name: "home",
      sideMenu: "menu"
    });
  } catch (error) {
    console.log("error", JSON.parse(JSON.stringify(error)));

    setSubmitting(false);

    if (!error.response) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError")
      });
    }
  }
};

export const signUp = (values, setSubmitting) => async (dispatch, getState) => {
  try {
    console.log("*********************************************");

    const res = await Api.post(`clientregister`, values);

    console.log("^^^^^^^^^^^", res);

    const response = validateRequst(res);
    console.log("response ***** --->>>>", response.data.data);

    if (response.isError) {
      setSubmitting(false);
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError")
      });
      showError(response.data.message);
      return;
    } // success
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
    getCart()(dispatch, getState);

    await AsyncStorage.setItem(
      "@CurrentUser",
      JSON.stringify(response.data.data)
    );

    AppNavigation.init("MAIN_STACK", {
      rtl: store.getState().lang.rtl,
      name: "home",
      sideMenu: "menu"
    });
  } catch (error) {
    console.log("error -->>", JSON.parse(JSON.stringify(error)));
    setSubmitting(false);

    if (!error.response) {
      dispatch({
        type: LOGIN_FAIL,
        payload: I18n.t("ui-networkConnectionError")
      });
    }
  }
};

export const autoLogin = async (dispatch, getState) => {
  let user = "";
  try {
    user = await AsyncStorage.getItem("@CurrentUser");
    user = JSON.parse(user);
    console.log(user);
    getCart()(dispatch, getState);

    if (user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });

      return { exist: true };
    }
  } catch (error) {
    console.log("AsyncStorage#getItem error: ", error.message);
    return false;
  }
  return { exist: false };
};

export const logout = id => async (dispatch, getState) => {
  await AsyncStorage.setItem("@CurrentUser", "");

  AppNavigation.setStackRoot("signIn");
  setTimeout(() => dispatch({ type: LOGOUT }), 1500);
};
