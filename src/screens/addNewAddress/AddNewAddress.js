import React, { useState, useEffect } from 'react';
import { ImageBackground, } from 'react-native';
import { AppView, AppText, AppImage } from "../../../src/common";
import { AppHeader } from "../../components"
import backgroundImg from "../../assets/imgs/background.png";
import NewAddressForm from '../../components/addNewAddress/NewAddressForm';
import I18n from "react-native-i18n";
export default AddNewAddress = props => {

  return (
    <AppView flex stretch >
      <AppHeader title={I18n.t("add-new-address")} hideCart/>
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }}>
        <NewAddressForm />
      </ImageBackground>
    </AppView>
  );
}