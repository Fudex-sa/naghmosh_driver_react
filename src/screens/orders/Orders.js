import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, showError } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import OrderCard from '../../components/orders/OrderCard';
import colors from '../../common/defaults/colors';
import { useSelector } from 'react-redux';

export default Orders = props => {
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
  const [ordersCount, setOrdersCount] = useState(0);
  const ApiRequest = {
    url: `myorders?api_token=${token}`,
    responseResolver: response => {
      setOrdersCount(response.data.client_orders.data.length)
      return {
        data: response.data.client_orders === [] ? [] : response.data.client_orders.data,
        pageCount: response.data.client_orders === [] ? 1 : response.data.client_orders.last_page,
        nextPage: response.data.client_orders.current_page,
      }
    },
    onError: error => {
      if (!error.response) {
        showError(I18n.t("ui-networkConnectionError"));
      } else {
        showError(I18n.t("ui-error-happened"));
      }
      return I18n.t("ui-networkConnectionError");
    }
  };
  return (
    <AppView flex stretch >
      <AppHeader title={I18n.t("orders")} />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        <AppView row stretch spaceBetween marginVertical={10} marginHorizontal={10} >
          <AppText bold color={colors.darkgrey} size={6.5}>
            {I18n.t("all-orders")}
          </AppText>
          <AppView row stretch>
            <AppText marginHorizontal={2} bold color={colors.darkgrey} size={6.5}>
              {ordersCount > 0 && ordersCount}
            </AppText>
            <AppText bold color={colors.darkgrey} size={6.5}>
              {I18n.t("orders-num")}
            </AppText>
          </AppView>
        </AppView>
        <AppList
          stretch
          flex
          flatlist
          // noResultsLabel={noFavourite}
          apiRequest={ApiRequest}
          rowHeight={55}
          rowRenderer={data => (
            <OrderCard
              data={data}
            />
          )}
        />
      </ImageBackground >
    </AppView >
  );
}
