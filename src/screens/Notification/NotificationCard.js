import React, { Component } from "react";

import { AppView, AppText, AppImage, AppIcon, showSuccess, showError, AppNavigation } from "../../common";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { refreshList } from "../../actions/list";

const NotificationCard = (props) => {
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
  const dispatch = useDispatch();
  const readNotifications = () => {
    Axios.post('driver/notifications/single/to_read',
      {
        api_token: token, notificationId: props.data.id,
      })
      .then((res) => {
        props.updateItemInList(props.data.id, { is_read: 1 })
        // showSuccess(res.data.message);
        dispatch(refreshList('homeNotifCount'))
        AppNavigation.push({ name: "OrderDetails", passProps: { orderID: props.data.order_id } });
      })
      .catch((error) => {
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
      });
  }

  return (
    <AppView
      stretch
      row
      backgroundColor="white"
      marginHorizontal={10}
      elevation={3}
      marginVertical={5}
      borderRadius={5}
      onPress={() => {
        props.data.is_read === 1 ?
          AppNavigation.push({ name: "OrderDetails", passProps: { orderID: props.data.order_id } })
          :
          readNotifications()
      }}
    >
      <AppView equalSize={20} margin={5}>
        <AppImage source={require('../../assets/imgs/logo.png')} equalSize={20} resizeMode={'contain'} />
      </AppView>
      <AppView stretch centerY flex top>
        <AppText bold size={7}>{props.data.title}</AppText>
        <AppText size={6} numberOfLines={1}>{props.data.content}</AppText>
        <AppText color='primary' numberOfLines={1}>{props.data.created_since}</AppText>
      </AppView>

      {
        props.data.is_read === 0 && <AppView
          equalSize={3}
          center
          borderRadius={7} marginRight={10}
          backgroundColor="primary"
        />
      }
    </AppView >
  );
};

export default NotificationCard;
