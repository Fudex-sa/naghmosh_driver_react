import React, { Component } from "react";

import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon
} from "../../common";

import { AppHeader } from "../../components";
import HomeCard from "./HomeCard";
import profile from "../../assets/imgs/profile.png";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="الرئيسية" transparent />
        <AppScrollView stretch>
          <AppImage source={profile} stretch height={22} />
          <AppView
            row
            stretch
            spaceBetween
            paddingHorizontal={7}
            marginBottom={10}
          >
            <AppText>معلومات الحساب الشخصي</AppText>

            <AppButton
              title="حفظ"
              color="foreground"
              transparent
              stretch
              paddingHorizontal={0}
            />
          </AppView>
          <AppInput
            placeholder="اسم السائق"
            marginBottom={5}
            marginHorizontal={7}
            borderRadius={7}
            leftItems={<AppIcon name="md-person" type="ion" />}
          />
          <AppInput
            placeholder="رقم الهاتف"
            marginBottom={5}
            marginHorizontal={7}
            borderRadius={7}
            leftItems={<AppIcon name="phone" type="ant" flip />}
          />
          <AppInput
            placeholder={I18n.t("signup-email")}
            marginBottom={5}
            marginHorizontal={7}
            borderRadius={7}
            leftItems={
              <AppIcon name="email-open-outline" type="material-community" />
            }
          />
          <AppView
            stretch
            height={7}
            elevation={1}
            row
            spaceBetween
            paddingHorizontal={7}
            marginTop={15}
          >
            <AppText>تغيرر كلمة المرور</AppText>
            <AppIcon name="ios-arrow-forward" type="ion" flip color="grey" />
          </AppView>
        </AppScrollView>
      </AppView>
    );
  }
}

export default Home;
