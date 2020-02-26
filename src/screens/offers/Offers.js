import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, showError } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import OffersCard from '../../components/offers/OffersCard';
import { useSelector } from 'react-redux';

export default Offers = props => {
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
  const ApiRequest = {
    url: `offers?api_token=${token}`,
    responseResolver: response => {
      return {
        data: response.data.offers.data,
        pageCount: response.data.offers.last_page,
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
    <AppView flex stretch >
      <AppHeader title={I18n.t("offers")} hideBack hideCart />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        <AppList
          stretch
          flex
          flatlist
          apiRequest={ApiRequest}
          paddingTop={10}
          rowHeight={130}
          rowRenderer={data => (
            <OffersCard
              data={data}
            />
          )}
        />
      </ImageBackground>
    </AppView>
  );
}
