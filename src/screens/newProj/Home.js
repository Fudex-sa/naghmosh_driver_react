import React, { Component } from "react";

import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppNavigation
} from "../../common";
import I18n from 'react-native-i18n'
import { AppHeader } from "../../components";
import HomeCard from "./HomeCard";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('home')} transparent hideBack />
        <AppScrollView paddingTop={10} stretch>
          <HomeCard
            source={require('../../assets/imgs/person.png')}
            label={I18n.t('personalPage')}
            hint={I18n.t('personalPageDetalis')}
            onPress={() => {
              AppNavigation.push("ProfileScreen");
            }}
          />
          <HomeCard
            source={require('../../assets/imgs/service.png')}
            label={I18n.t('notifications')}
            hint={I18n.t('notificationsDetalis')}
            notification
            onPress={() => {
              AppNavigation.push("NotificationScreen");
            }}
          />
          <HomeCard
            source={require('../../assets/imgs/current.png')}
            label={I18n.t('Delivery requests')}
            hint={I18n.t('DeliveryDetails')}
            onPress={() => {
              AppNavigation.push("DeliverOrderScreen");
            }}
          />
          <HomeCard
            source={require('../../assets/imgs/finished.png')}
            label={I18n.t('Completed requests')}
            hint={I18n.t('CompletedDetails')}
            onPress={() => {
              AppNavigation.push("FinishedOrderScreen");
            }}
          />
          <HomeCard
            source={require('../../assets/imgs/settings.png')}
            label={I18n.t('Settings')}
            hint={I18n.t('SettingsDetalis')}
            onPress={() => {
              AppNavigation.push("AppSetting")
            }}
          />
          <HomeCard
            source={require('../../assets/imgs/information.png')}
            label={I18n.t('informations')}
            hint={I18n.t('informationsDetails')}
            onPress={() => {
              AppNavigation.push("aboutBalsam");
            }}
          />
        </AppScrollView>
      </AppView>
    );
  }
}

export default Home;
