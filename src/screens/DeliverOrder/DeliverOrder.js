import React, { useState } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppList,
  showError,
} from "../../common";
import { useSelector } from 'react-redux';
import { AppHeader } from "../../components";
import OrderCard from "./OrderCard";

export default DeliverOrder = props => {
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
  const [ordersCount, setOrdersCount] = useState(0);
  const ApiRequest = {
    url: `driverorders?api_token=${token}`,
    responseResolver: response => {
      setOrdersCount(response.data.driver_orders.length === 0 ? 0 : response.data.driver_orders.total)
      return {
        data: response.data.driver_orders.length === 0 ? [] : response.data.driver_orders.data,
        pageCount: response.data.driver_orders.length === 0 ? 1 : response.data.driver_orders.last_page,
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
    <AppView flex stretch>
      <AppHeader title={I18n.t('Delivery requests')} transparent />
      <AppView
        stretch
        row
        height={12}
        margin={10}
        borderRadius={5}
      >
        <AppView
          stretch flex={2} center
          backgroundColor={'#E95B06'}
          paddingHorizontal={5}
        >
          <AppText color='white' size={8} >{`${ordersCount}`}</AppText>
          <AppText color='white' size={7} >{`${I18n.t('Total number of requests')}`}</AppText>

        </AppView>
        <AppView
          stretch flex={1} center row spaceBetween
          linearBackgroundGradient={{ colors: ['#E3000F', '#E95B06'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }}
        >
          <AppView stretch flex>
            <AppImage source={require('../../assets/imgs/finishedorders.png')} flex stretch resizeMode={'contain'} />
          </AppView>
        </AppView>
      </AppView>

      <AppList
        stretch
        flex
        flatlist
        noResultsLabel={ordersCount === 0 && I18n.t('noCurrentOrders')}
        noResultListHeight={10}
        apiRequest={ApiRequest}
        rowRenderer={data => (
          <OrderCard
            data={data}
          />
        )}
      />
    </AppView>
  );
}

