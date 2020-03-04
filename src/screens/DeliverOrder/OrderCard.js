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
        AppNavigation.push({ name: "OrderDetails", passProps: { orderID: props.data.order_id } });
      }}
    >
      <AppView flex={1.7} stretch center borderRightWidth={0.7} borderColor={'gray'} >
        <AppText>{I18n.t('OrderNumber')}</AppText>
        <AppText size={7} color="#23A636">{props.data.order_id}</AppText>
      </AppView>
      <AppView flex={4} marginLeft={5}>
        <AppText bold size={6.5}>{`${props.data.order_client_first_name} ${props.data.order_client_last_name}`}</AppText>
        <AppView row>
          {!props.data.status && (
            <AppIcon
              name="location-pin"
              type="entypo"
              color="grey"
              size={8}
            />
          )}
          <AppText size={5} numberOfLines={1}>
            {props.data.order_full_address}
          </AppText>
        </AppView>
      </AppView>
      <AppView paddingHorizontal={7}>
        {props.data.status ? (
          <AppView
            stretch
            borderRadius={7}
            padding={2}
            backgroundColor={!props.notDeliver ? "#23A636" : "red"}
            paddingHorizontal={2}
          >
            <AppText color="white">{props.data.status}</AppText>
          </AppView>
        ) : (
            <AppIcon name="ios-arrow-forward" type="ion" flip color="grey" size={9} />
          )}
      </AppView>
    </AppView>
  );
}

