import React, { useState, useEffect } from 'react';
import { ImageBackground, } from 'react-native';
import Swiper from 'react-native-swiper';
import { AppView, AppText, AppImage } from "../../../src/common";
import Login from "../login/Login";
import backgroundImg from "../../assets/imgs/background.png";
import logo from "../../assets/imgs/logo.png";
import checkinImg from "../../assets/imgs/checkin.png";
import fishImg from "../../assets/imgs/fish.png";
import meatImg from "../../assets/imgs/meat.png";
import splashScreen from "react-native-splash-screen";

export default Welcome = props => {
  splashScreen.hide();
  const renderTypeImg = (img) => {
    return (
      <AppView stretch centerX bottom flex>
        <AppImage
          equalSize={16}
          source={img}
          resizeMode="contain"
          marginBottom={10}
        />
      </AppView>
    )
  }

  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1 }}>
      {/* <AppView
        stretch center marginVertical={10} marginTop={15}
      // style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <AppImage
          width={50}
          height={25}
          source={logo}
          resizeMode="contain"
        />
      </AppView> */}
      {/* <Swiper loop={false} autoplay autoplayTimeout={1.5} showsPagination={false} style={{ alignSelf: "stretch", flex: 1 }} > */}
      {/* {renderTypeImg(checkinImg)}
        {renderTypeImg(fishImg)}
        {renderTypeImg(meatImg)} */}
      <Login />
      {/* </Swiper> */}
    </ImageBackground>
  );
}