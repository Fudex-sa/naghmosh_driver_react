import React, { } from "react";
import {
  AppView,
  AppText,
  AppImage,
  AppIcon,
  AppNavigation
} from "../../common";
import I18n from 'react-native-i18n'
import colors from "../../common/defaults/colors";

export default OrderCard = (props) => {
  let bg = colors.black
  let statusColor = colors.primary
  const { status } = props.data;
  if (status === 'Returned' || status === 'تم الإرجاع') {
    bg = colors.error;
    statusColor = colors.white
  }
  if (status === "انتهى" || status === 'Done') {
    bg = colors.black;
    statusColor = colors.primary
  }
  if (status === 'تم التسليم' || status === 'Delivered') {
    bg = "#B4E3FF"
    statusColor = "#047AC0"
  }

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
        <AppText stretch center color={colors.black}>{I18n.t('OrderNumber')}</AppText>
        <AppText size={7} color={colors.primary}>{props.data.order_id}</AppText>
      </AppView>
      <AppView flex={4} marginLeft={5}>
        <AppText bold size={6.5} color={colors.black}>{`${props.data.order_client_first_name} ${props.data.order_client_last_name}`}</AppText>
        <AppText size={5} numberOfLines={1} color={colors.darkgrey}>
          {props.data.order_full_address}
        </AppText>
      </AppView>
      <AppView paddingHorizontal={3} flex={1.7}>
        <AppView
          stretch
          borderRadius={7}
          padding={2} center
          backgroundColor={bg}
          paddingHorizontal={2}
        >
          <AppText color={statusColor}>{props.data.status}</AppText>
        </AppView>
      </AppView>
    </AppView>
  );
}

