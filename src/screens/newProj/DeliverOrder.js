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
import delivery from "../../assets/imgs/delivery.png";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="الطلبات التوصيل " transparent />
        <AppScrollView stretch>
          <AppView stretch>
            <AppImage
              source={delivery}
              stretch
              height={22}
              marginHorizontal={7}
              borderRadius={10}
            />
          </AppView>
          <OrderCard
            name="محمد السلام"
            hint="الدمام حي القويزه شارع الحيزارن"
            orderNum={12}
          />
          <OrderCard
            name="محمد  احمد السلام"
            hint="الدمام حي القويزه شارع الحيزارن"
            orderNum={7}
            notDeliver
          />
          <OrderCard
            name="محمد مؤمن "
            hint="الدمام حي القويزه شارع الحيزارن"
            orderNum={8}
          />
          <OrderCard
            name="محمد  السلام"
            hint="الدمام حي القويزه شارع الحيزارن"
            orderNum={6}
          />
        </AppScrollView>
      </AppView>
    );
  }
}

export default Home;
