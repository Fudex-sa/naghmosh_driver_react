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
} from "../../../common";

import { AppHeader } from "../../../components";
import NotificationCard from "./NotificationCard";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('notifications')}  />
        <AppList
          data={[1, 2, 1, 2, 1, 2]}
          rowRenderer={() => <NotificationCard />}
          flatlist
          flex
          stretch
          paddingTop={7}
        />
      </AppView>
    );
  }
}

export default Home;
