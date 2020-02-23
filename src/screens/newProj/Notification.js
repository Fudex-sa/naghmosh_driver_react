import React, { Component } from "react";

import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon,
  AppList
} from "../../common";

import { AppHeader } from "../../components";
import HomeCard from "./HomeCard";
import notification from "../../assets/imgs/notification.png";
import NotificationCard from "./NotificationCard";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="الاشعارات" transparent />
        <AppList
          data={[1, 2, 1, 2, 1, 2]}
          rowRenderer={() => <NotificationCard />}
          flatlist
          flex
          stretch
          paddingTop={7}
        />
        {/* <AppScrollView stretch>
          <AppImage source={notification} stretch height={60} />
        </AppScrollView> */}
      </AppView>
    );
  }
}

export default Home;
