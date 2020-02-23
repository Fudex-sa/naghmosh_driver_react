import React, { Component } from "react";

import {
  AppView,
  AppText,
  AppImage,
  AppIcon,
  AppNavigation
} from "../../common";

import { AppHeader } from "../../components";

class Home extends Component {
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
        <AppView flex={1.5} stretch center paddingHorizontal={7}>
          <AppText>رقم الطلب</AppText>
          <AppText color="#23A636">{orderNum}</AppText>
        </AppView>
        <AppView flex={4}>
          <AppText bold>{name}</AppText>
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
            <AppIcon name="ios-arrow-forward" type="ion" flip color="grey" />
          )}
        </AppView>
      </AppView>
    );
  }
}

export default Home;
