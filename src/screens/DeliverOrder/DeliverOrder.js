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
import colors from "../../common/defaults/colors";

export default DeliverOrder = props => {
  const lang = useSelector(state => state.lang.lang);
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
  const [ordersCount, setOrdersCount] = useState(0);
  const refresh = useSelector(state => state.list.refreshDeliveredOrderList)
  const ApiRequest = {
    url: `driverorders/active?api_token=${token}`,
    responseResolver: response => {
      setOrdersCount(response.data.active_orders.length === 0 ? 0 : response.data.active_orders.total)
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
          linearBackgroundGradient={{
            colors: [colors.black, colors.thirdly],
            start: { x: lang === 'ar' ? 1 : 0, y: lang === 'ar' ? 1 : 0 },
            end: { x: lang === 'ar' ? 0 : 1, y: lang === 'ar' ? 0 : 1 }
          }}
          paddingHorizontal={5}
        >
          <AppText color='white' size={8} >{`${ordersCount}`}</AppText>
          <AppText color='white' size={7} >{`${I18n.t('Total number of requests')}`}</AppText>

        </AppView>
        <AppView
          stretch flex={1} center row spaceBetween
          backgroundColor={colors.thirdly}
        >
          <AppView stretch flex>
            <AppImage
              source={lang === 'ar' ? require('../../assets/imgs/currentAr.png') : require('../../assets/imgs/currentEn.png')}
              flex stretch resizeMode={'contain'} />
          </AppView>
        </AppView>
      </AppView>

      <AppList
        stretch
        flex
        flatlist
        noResultsLabel={ordersCount === 0 ? I18n.t('noCurrentOrders') : ''}
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

