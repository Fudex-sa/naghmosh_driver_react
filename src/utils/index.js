import { Navigation } from "react-native-navigation";
import { AppNavigation } from "../common";

import store from "../store";
export function setHomeScreen() {
  Navigation.mergeOptions("MAIN_STACK", {
    bottomTabs: {
      currentTabIndex: 0
    }
  });
  AppNavigation.init('MAIN_STACK', {
    bottomTabs: [
      {
        screen: 'Home',
        label: 'Home',
        icon: require('../assets/imgs/avatarClient.png'),
      },
      {
        screen: 'Souq',
        label: 'Souq',
        icon: require('../assets/imgs/avatarClient.png'),
      },
      {
        screen: 'Products',
        label: 'Products',
        icon: require('../assets/imgs/avatarClient.png'),
      },
      {
        screen: 'GoldPrice',
        label: 'GoldPrice',
        icon: require('../assets/imgs/avatarClient.png'),
      },
      {
        screen: 'Account',
        label: 'Account',
        icon: require('../assets/imgs/avatarClient.png'),
      },
    ],
  });
}

export function secondsToHMS(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  return { hours: h, minutes: m, seconds: s };
}
