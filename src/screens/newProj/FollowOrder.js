import React, { Component } from "react";

import I18n from "react-native-i18n";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon,
  AppTabs,
  AppNavigation
} from "../../common";

import { AppHeader } from "../../components";
import HomeCard from "./HomeCard";
import profile from "../../assets/imgs/profile.png";
import styles from "./styles";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch backgroundColor="white">
        <AppHeader title="تتبع الطلب" />

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.007016387588862472,
            longitudeDelta: 0.004741139709949493
          }}
        />
        <AppView
          height={40}
          stretch
          backgroundColor="white"
          style={styles.container}
          margin={5}
          borderRadius={7}
          elevation={1}
          centerX
          paddingTop={15}
        >
          <AppText bold> تتبع الطلب</AppText>
          <AppView row stretch center marginVertical={5}>
            <AppText> الوصول في خلال</AppText>
            <AppText color="foreground" marginHorizontal={2}>
              {" "}
              10:12
            </AppText>
            <AppText> دقيقة</AppText>
          </AppView>
          <AppView stretch row spaceAround>
            <AppView stretch centerX>
              <AppView circleRadius={15} center backgroundColor="#C2C2C2">
                <AppIcon name="phone" type="ant" color="white" flip size={10} />
              </AppView>
              <AppText color="#C2C2C2"> مكالمة</AppText>
            </AppView>
            <AppView stretch centerX>
              <AppView circleRadius={15} center backgroundColor="#C2C2C2">
                <AppIcon name="wechat" type="ant" color="white" size={10} />
              </AppView>
              <AppText color="#C2C2C2"> ارسال رساله</AppText>
            </AppView>
          </AppView>
          <AppButton
            title="تفاصيل الطلب"
            stretch
            backgroundColor="foreground"
            marginHorizontal={10}
            marginTop={8}
            onPress={() => {
              AppNavigation.push("OrderDetails");
            }}
          />
        </AppView>
      </AppView>
    );
  }
}

export default Home;
