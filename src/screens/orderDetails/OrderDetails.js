import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppScrollView, AppButton } from "../../common";
import { AppHeader } from "../../components";
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; 

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
    <AppView flex stretch>
      <AppHeader title="تفاصيل الطلب" transparent />
      <AppScrollView stretch>
        <AppView stretch height={35}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            // style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.007016387588862472,
              longitudeDelta: 0.004741139709949493
            }}
          />
        </AppView>
        <AppView stretch flex paddingTop={10}>
          <Row label="رقم الطلب" value={34} marginBottom={10} />
          <RowDetails
            labelHeader="بيانات الطلب"
            data={[
              { label: "الاسم", value: "محمد امير" },
              { label: "العنوان", value: "الدمام - شارع الخيزارن" },
              { label: "رقم الهاتف", value: "01212002733" },
              { label: "طريقه الدفع", value: "كاش" }
            ]}
          />
          <Row label="المبلغ المطلوب" value={111} real />
        </AppView>
        <AppView spaceBetween stretch row paddingHorizontal={7}>
          <AppButton
            title="تسليم الطلب"
            flex
            stretch
            height={7}
            backgroundColor="#23A636"
            onPress={() => {
              AppNavigation.push("FollowOrder");
            }}
          />
          <AppView width={5} />
          <AppButton
            title="رفض الطلب"
            flex
            stretch
            height={7}
            backgroundColor="#E3000F"
          />
        </AppView>
      </AppScrollView>
    </AppView>
  );
}

const Row = props => (
  <AppView
    stretch
    height={7}
    elevation={1}
    marginHorizontal={7}
    row
    spaceBetween
    centerY
    borderRadius={7}
    marginBottom={10}
    paddingHorizontal={7}
    {...props.rest}
  >
    <AppText bold> {props.label}</AppText>
    <AppView stretch row>
      <AppText color="foreground">{props.value}</AppText>
      {props.real && <AppText>ريال </AppText>}
    </AppView>
  </AppView>
);

const RowDetails = props => (
  <AppView
    stretch
    elevation={1}
    marginHorizontal={7}
    spaceBetween
    centerY
    borderRadius={7}
    paddingHorizontal={7}
    marginBottom={10}
    {...props.rest}
  >
    <AppText bold marginVertical={5} color="#4C4C4C">
      {props.labelHeader}
    </AppText>
    {props.data.map(item => (
      <AppView stretch row spaceBetween paddingBottom={5}>
        <AppText color="#C9C9C9"> {item.label}</AppText>

        <AppText color="#C9C9C9"> {item.value}</AppText>
      </AppView>
    ))}
  </AppView>
);

