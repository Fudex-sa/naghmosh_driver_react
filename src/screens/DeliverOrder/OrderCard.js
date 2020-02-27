import React, { Component } from "react";

import {
  AppView,
  AppText,
  AppImage,
  AppIcon,
  AppNavigation
} from "../../common";
import I18n from 'react-native-i18n'
import { AppHeader } from "../../components";

class OrderCard extends Component {
  render() {
    const {
      iconName,
      iconType,
      name,
      hint,
      notification,
      status,
      orderNum,
      ...rest
    } = this.props;
    return (
      <AppView
        stretch
        height={10}
        row
        marginHorizontal={10}
        elevation={1.5}
        borderRadius={5}
        marginBottom={7}
        onPress={() => {
          AppNavigation.push("OrderDetails");
        }}
        {...rest}
      >
        <AppView flex={1.7} stretch center borderRightWidth={0.7} borderColor={'gray'} >
          <AppText>{I18n.t('OrderNumber')}</AppText>
          <AppText size={7} color="#23A636">{orderNum}</AppText>
        </AppView>
        <AppView flex={4} marginLeft={5}>
          <AppText bold size={6}>{name}</AppText>
          <AppView row>
            {!status && (
              <AppIcon
                name="location-pin"
                type="entypo"
                color="grey"
                size={8}
              />
            )}
            <AppText size={4.3} numberOfLines={1}>
              {hint}
            </AppText>
          </AppView>
        </AppView>
        <AppView paddingHorizontal={7}>
          {status ? (
            <AppView
              stretch
              borderRadius={7}
              backgroundColor={!this.props.notDeliver ? "#23A636" : "red"}
              paddingHorizontal={2}
            >
              <AppText color="white">{status}</AppText>
            </AppView>
          ) : (
              <AppIcon name="ios-arrow-forward" type="ion" flip color="grey" size={9} />
            )}
        </AppView>
      </AppView>
    );
  }
}

export default OrderCard;
