import React, { useState, useEffect } from 'react';
import { ImageBackground, } from 'react-native';
import Swiper from 'react-native-swiper';
import { AppView, AppText, AppImage } from "../../../src/common";
import Login from "../../components/login/Login";
import backgroundImg from "../../assets/imgs/background.png";
import logo from "../../assets/imgs/logo.png";
import checkinImg from "../../assets/imgs/checkin.png";
import fishImg from "../../assets/imgs/fish.png";
import meatImg from "../../assets/imgs/meat.png";
import SignUp from '../../components/signUp/SignUp';

export default SignUpScreen = props => {

  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1 }}>
      <SignUp />
    </ImageBackground>
  );
}