import React, { Component } from "react";

import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon,
  AppList,
  showError
} from "../../common";

import { AppHeader } from "../../components";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";

const Notifications = () => {
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
  const ApiRequest = {
    url: `driver/notifications/all?api_token=${token}`,
    responseResolver: response => {
      return {
        data: response.data.data.length === 0 ? [] : response.data.data.data,
        pageCount: response.data.data.length === 0 ? 1 : response.data.data.last_page,
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
      <AppHeader title={I18n.t('notifications')} />
      <AppList
        stretch
        flex
        center
        flatlist
        apiRequest={ApiRequest}
        rowRenderer={data => (
          <NotificationCard
            data={data}
          />
        )}
      />
    </AppView>
  );
};

export default Notifications;
