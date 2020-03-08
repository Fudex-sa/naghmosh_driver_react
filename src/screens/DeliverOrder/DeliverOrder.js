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
  const refresh = useSelector(state => state.list.refreshDeliveredOrderList)
  const ApiRequest = {
    url: `driverorders/active?api_token=${token}`,
    responseResolver: response => {
      setOrdersCount(response.data.active_orders.length === 0 ? 0 : response.data.active_orders.total)
      console.log(response.data.active_orders)
      return {
        data: response.data.active_orders.length === 0 ? [] : response.data.active_orders.data,
        pageCount: response.data.active_orders.length === 0 ? 1 : response.data.active_orders.last_page,
        nextPage: response.data.active_orders.current_page,
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
        refreshControl={refresh}
        idPathInData={'order_id'}
        rowRenderer={data => (
          <OrderCard
            data={data}
          />
        )}
      />
    </AppView>
  );
}

