import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';

export default ProductInfo = props => {

  return (
    <AppView flex stretch margin={5} >
      <AppView row spaceBetween stretch paddingVertical={5} borderBottomColor={colors.grey} borderBottomWidth={.5} >
        <AppText size={6} bold>
          {I18n.t("products-total")}
        </AppText>
        <AppView stretch row>
          <AppText size={6} bold marginHorizontal={2}>
            {props.prodectsCost}
          </AppText>
          <AppText size={6} bold>
            {I18n.t("sar")}
          </AppText>
        </AppView>
      </AppView>
      <AppView row spaceBetween stretch paddingVertical={5} borderBottomColor={colors.grey} borderBottomWidth={.5} >
        <AppText size={6} bold>
          {I18n.t("The value of the tax")}
        </AppText>
        <AppView stretch row>
          <AppText size={6} bold marginHorizontal={2}>
            {props.extra}
          </AppText>
          <AppText size={6} bold>
            {I18n.t("sar")}
          </AppText>
        </AppView>
      </AppView>
      <AppView row spaceBetween stretch paddingVertical={5} borderBottomColor={colors.grey} borderBottomWidth={.5} >
        <AppText size={6} bold>
          {I18n.t("shipping")}
        </AppText>
        <AppView stretch row>
          <AppText size={6} bold marginHorizontal={2}>
            {props.delivery}
          </AppText>
          <AppText size={6} bold>
            {I18n.t("sar")}
          </AppText>
        </AppView>
      </AppView>
      <AppView row spaceBetween stretch paddingVertical={5} borderBottomColor={colors.grey} borderBottomWidth={.5} >
        <AppText size={6} color={colors.primaryAccent} bold>
          {I18n.t("all-total")}
        </AppText>
        <AppView stretch row>
          <AppText size={6} color={colors.primaryAccent} bold marginHorizontal={2} >
            {props.finalPrice}
          </AppText>
          <AppText size={6} color={colors.primaryAccent} bold>
            {I18n.t("sar")}
          </AppText>
        </AppView>
      </AppView>
    </AppView>
  );
}
