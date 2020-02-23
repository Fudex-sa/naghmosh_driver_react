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
import OrderCard from "./OrderCard";
import finished from "../../assets/imgs/finished.png";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="الطلبات المنتهيه" transparent />
        <AppScrollView stretch>
          <AppImage
            source={finished}
            stretch
            height={22}
            marginHorizontal={7}
            borderRadius={10}
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم التسلسم"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={12}
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم الاسترجاع"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={7}
            notDeliver
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم التسلسم"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={8}
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم التسلسم"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={6}
          />
        </AppScrollView>
      </AppView>
    );
  }
}

export default Home;
