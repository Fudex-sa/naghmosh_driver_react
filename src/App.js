import { Navigation } from "react-native-navigation";
import { Platform, StatusBar } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import store from "./store";
import registerScreens from "./screens";
import {
  getColors,
  AppNavigation as nv,
  registerCustomIconType
} from "./common";
import icoMoonConfig from "./common/utils/selection.json";
import { initInternetConnection } from "./actions/network";
import { initLang, setLang } from "./actions/lang";
import colors from "./common/defaults/colors";
import { autoLogin } from "./actions/AuthActions";
import {
  checkLocationPermission,
  initBackgroundGeolocation
} from "./actions/location";

export const startApp = () => {
  registerCustomIconType("custom", icoMoonConfig);
  registerScreens();

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: colors.statusBar,
        style: "dark"
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },
      layout: {
        backgroundColor: "white",
        orientation: ["portrait"]
      },
      animations: {
        push: {
          waitForRender: false
        },
        showModal: {
          waitForRender: false
        }
      },
      bottomTabs: {
        visible: false,
        animate: false
      }
    });
    await initLang("ar", true)(store.dispatch);
    initInternetConnection(store.dispatch);

    checkLocationPermission(true, () => {
      initBackgroundGeolocation(store.dispatch, store.getState);
    });
    const { exist } = await autoLogin(store.dispatch);

    console.log("%%%%%%%%%%%%%", exist);
    initInternetConnection(store.dispatch);
    if (exist) {
      nv.init("MAIN_STACK", {
        // rtl: store.getState().lang.rtl,
        name: "homeScreen"
        // sideMenu: "menu"
      });
    } else {
      nv.init("MAIN_STACK", {
        name: "SignInScreen"
      });
    }
  });
};
