import React, { } from "react";
import {
  AppView,
  AppText,
  AppImage,
  AppIcon,
  AppNavigation
} from "../../common";
import I18n from 'react-native-i18n'

export default OrderCard = (props) => {
  return (
    <AppView
      stretch
      height={10}
      row
      marginTop={2}
      marginHorizontal={10}
      elevation={1.5}
      borderRadius={5}
      marginBottom={7}
      onPress={() => {
        AppNavigation.push({ name: "OrderDetails", passProps: { orderID: props.data.order_id, } });
      }}
    >
      <AppView flex={1.7} stretch center borderRightWidth={0.7} borderColor={'gray'} >
        <AppText stretch center>{I18n.t('OrderNumber')}</AppText>
        <AppText size={7} color="#23A636">{props.data.order_id}</AppText>
      </AppView>
      <AppView flex={4} marginLeft={5}>
        <AppText bold size={6.5}>{`${props.data.order_client_first_name} ${props.data.order_client_last_name}`}</AppText>
        <AppText size={5} numberOfLines={1}>
          {props.data.order_full_address}
        </AppText>
      </AppView>
      <AppView paddingHorizontal={3} flex={1.7}>
        <AppView
          stretch
          borderRadius={7}
          padding={2} center
          backgroundColor={props.data.status === 'Returned' || props.data.status === 'تم الإرجاع' ? '#E3000F' : "#23A636"}
          paddingHorizontal={2}
        >
          <AppText color="white">{props.data.status}</AppText>
        </AppView>
      </AppView>
    </AppView>
  );
}

