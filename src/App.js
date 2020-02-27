import { Navigation } from "react-native-navigation";
import splashScreen from "react-native-splash-screen";
import regterScreens from "./screens";
import { AppNavigation } from "./common";
import appLaunchConfig from "./utils/AppLaunchConfig";
import AuthRepo from "./repo/auth";
import store from "./store/store";
import { setUserData } from "./actions/auth";

export default () => {
  splashScreen.hide();
  //appLaunch
  Navigation.events().registerAppLaunchedListener(async () => {
    //navigation config
    AppNavigation.setNavigationDefaultOptions();
    //screens
    regterScreens();
    //default app config
    await appLaunchConfig();
    //navigation
    const authRepo = new AuthRepo();
    const userData = await authRepo.checkPrincipalUser();
    const rtl = store.getState().lang.rtl;
    if (userData) await store.dispatch(setUserData(userData));
    if (userData && !userData.isLogout) {
      // auth
      AppNavigation.navigateToHome();
    } else {
      // no auth
      AppNavigation.navigateToHome();
    }
  });
};
