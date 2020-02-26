import { I18nManager } from "react-native";
import store from "../store/store";
import { initLang } from "../actions";
import I18n from "react-native-i18n";
import ar from "../common/defaults/ar.json";
import en from "../common/defaults/en.json";
import appAr from "../translation/appAr.json";
import appEn from "../translation/appEn.json";
import { registerCustomIconType } from "../common";
import icoMoonConfig from "../common/utils/selection.json";
import configRestApi from "../api/config";

const configTranslation = async () => {
  I18n.fallbacks = true;
  I18n.translations = {
    ar: { ...ar, ...appAr },
    en: { ...en, ...appEn }
  };

  await initLang(
    //TODO uncomment this
    // I18nManager.isRTL ? "ar" : "en", I18nManager.isRTL
    "ar" , true
  
  )(
    store.dispatch
  );
};

export default async () => {
  //icons
  registerCustomIconType("custom", icoMoonConfig);
  //default ar
  await configTranslation();

  configRestApi();

  // await LocationConfig.config();
};
