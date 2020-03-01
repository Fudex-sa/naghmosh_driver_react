import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import backgroundImg from '../../assets/imgs/background.png';
import homeTopImg from '../../assets/imgs/hometop.png';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../../src/common";
import I18n from "react-native-i18n";
import splashScreen from "react-native-splash-screen";
import HomeCard from './HomeCard'
import { AppHeader } from '../../components';
import PushNotification from 'react-native-push-notification';

export default Home = props => {

  PushNotification.configure({
    onNotification: function (notification) {
      console.log('notification', notification);

    },
    // ANDROID: GCM or FCM Sender ID
    senderID: '56743868961',
    popInitialNotification: true,
    requestPermissions: true,
  });

  return (
    <AppView flex stretch>
      <AppHeader title={I18n.t('home')} transparent hideBack />
      <AppScrollView paddingTop={10} stretch>
        <HomeCard
          source={require('../../assets/imgs/person.png')}
          label={I18n.t('personalPage')}
          hint={I18n.t('personalPageDetalis')}
          onPress={() => {
            AppNavigation.push("profile");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/service.png')}
          label={I18n.t('notifications')}
          hint={I18n.t('notificationsDetalis')}
          notification
          onPress={() => {
            AppNavigation.push("Notifications");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/current.png')}
          label={I18n.t('Delivery requests')}
          hint={I18n.t('DeliveryDetails')}
          onPress={() => {
            AppNavigation.push("DeliverOrder");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/finished.png')}
          label={I18n.t('Completed requests')}
          hint={I18n.t('CompletedDetails')}
          onPress={() => {
            AppNavigation.push("FinishedOrders");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/settings.png')}
          label={I18n.t('Settings')}
          hint={I18n.t('SettingsDetalis')}
          onPress={() => {
            AppNavigation.push("Settings")
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/information.png')}
          label={I18n.t('informations')}
          hint={I18n.t('informationsDetails')}
          onPress={() => {
            // AppNavigation.push("HowToUse");
          }}
        />
      </AppScrollView>
    </AppView>

  );
}
