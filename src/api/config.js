import axios from "axios";
import * as urls from "./urls";
import store from "../store/store";

export default () => {
  const { userData } = store.getState().auth;
  // Add a request interceptor
  axios.interceptors.request.use(
    config => {
      config.baseURL = urls.BASE_URL;
      return {
        ...config,
        headers: {
          ...config.headers,
          "X-localization": store.getState().lang.lang,
        }
      };
    },
    error => {
      // TODO custom error interseptor
      return Promise.reject(error);
    }
  );
};
