import React, { Component } from "react";

import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppNavigation
} from "../../common";

import { AppHeader } from "../../components";
import HomeCard from "./HomeCard";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="الرئيسية" transparent hideBack />
        <AppScrollView paddingTop={10} stretch>
          <HomeCard
            iconName="md-person"
            iconType="ion"
            label="الصفحه الشخصيه"
            hint="معلومات السائق الشخصيه مع امكانيه التعديل"
            onPress={() => {
              AppNavigation.push("ProfileScreen");
            }}
          />
          <HomeCard
            iconName="md-person"
            iconType="ion"
            label="الاشعارات"
            hint="طلب جديد او تحويل طلب او الغاء طلب"
            notification
            onPress={() => {
              AppNavigation.push("NotificationScreen");
            }}
          />
          <HomeCard
            iconName="md-person"
            iconType="ion"
            label="طلبات التوصيل"
            hint="كل ما يخص طلبات التوصيل . تفاصيل"
            onPress={() => {
              AppNavigation.push("DeliverOrderScreen");
            }}
          />
          <HomeCard
            iconName="md-person"
            iconType="ion"
            label="الطلبات المنتهيه"
            hint="معلومات السائق الشخصيه مع امكانيه التعديل"
            onPress={() => {
              AppNavigation.push("FinishedOrderScreen");
            }}
          />
          <HomeCard
            iconName="md-person"
            iconType="ion"
            label="الاعدادات"
            hint="اعدادات الاشعارات ,تغيير اللغه  ,تسجيل خروج"
            onPress={()=>{
              AppNavigation.push("AppSetting")
            }}
          />
          <HomeCard
            iconName="md-person"
            iconType="ion"
            label="معلومات"
            hint="عن التطبيق والشركه المطوره, خدمة العملاء ,سياسه الاستخدام"
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
