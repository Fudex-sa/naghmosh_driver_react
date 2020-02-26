import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground, ActivityIndicator } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import CartCard from '../../components/cart/CartCard';
import TotalSection from '../../components/cart/TotalSection';
import ProductInfo from '../../components/productDetails/ProductInfo';
import colors from '../../common/defaults/colors';
import ProductDetailsCard from '../../components/productDetails/ProductDetailsCard';
import OrderProduct from '../../components/OrderDetails/OrderProduct';
import OrderTotal from '../../components/OrderDetails/OrderTotal';
import { useSelector } from 'react-redux';
import Axios from 'axios';

const renderStatus = (id, date, status) => {
  return (
    <AppView stretch row spaceBetween marginVertical={10} >
      <AppView stretch flex center>
        <AppText bold>
          {I18n.t("order-num")}
        </AppText>
        <AppText center marginTop={3} marginHorizontal={3} bold color={colors.darkgrey}>
          {id}
        </AppText>
      </AppView>
      <AppView stretch flex center>
        <AppText bold>
          {I18n.t("order-date")}
        </AppText>
        <AppText marginTop={3} bold color={colors.darkgrey}>
          {date}
        </AppText>
      </AppView>
      <AppView stretch flex center>
        <AppText bold>
          {I18n.t("order-status")}
        </AppText>
        <AppText marginTop={3} bold color="#5B8052" backgroundColor="#D3F5CA" padding={2} borderRadius={5} >
          {status}
        </AppText>
      </AppView>
    </AppView>
  )
}

export default OrderDetails = props => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
  useEffect(() => {
    setLoading(true)
    Axios.get(`orderdetails?api_token=${token}&orderId=${props.id}`)
      .then((res) => {
        setOrder(res.data.data)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
        return I18n.t("ui-networkConnectionError");
      })
  }
    , [])
  return (
    <AppView flex stretch >
      <AppHeader title={`${I18n.t("order")}`} />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        {!order || loading ?
          <AppView flex stretch center>
            <ActivityIndicator />
          </AppView>
          :
          <AppScrollView flex stretch paddingBottom={5} >
            {renderStatus(order.order_encrypted_id, order.created_since, order.status)}
            <AppList
              stretch
              flex
              flatlist
              staticData
              data={order.order_details}
              rowRenderer={data => (
                <OrderProduct
                  data={data}
                />
              )}
            />
            <OrderTotal delivery={order.order_delivery_value}
              prodectsCost={order.order_total_cost}
              finalPrice={order.order_final_total_after_delivery}
              extra={order.order_extra_value}
            />
          </AppScrollView>
        }
      </ImageBackground>
    </AppView>
  );
}
