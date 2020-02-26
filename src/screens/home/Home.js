import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import backgroundImg from '../../assets/imgs/background.png';
import homeTopImg from '../../assets/imgs/hometop.png';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../../src/common";
import I18n from "react-native-i18n";
import SearchInput from '../../components/home/SearchInput';
import Categories from '../../components/home/Categories';
import Products from '../../components/home/Products';
import { Navigation } from 'react-native-navigation';
import splashScreen from "react-native-splash-screen";

export default Home = props => {
  splashScreen.hide();
  Navigation.mergeOptions("MAIN_STACK", {
    bottomTabs: {
      currentTabIndex: 2,
    }
  });

  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }}>
      <AppScrollView showsVerticalScrollIndicator={false} flex stretch>
        <AppImage stretch height={35} source={homeTopImg} resizeMode="cover" width={100} />
        <SearchInput />
        <Categories />
        <Products orderBy={"recentlyArrived"} />
        <AppImage
          marginBottom={5}
          source={require('../../assets/imgs/checkinsline.png')}
          resizeMode="cover"
          width={95}
          centerSelf
          center
          height={15}
          borderRadius={25}
        />
        <Products orderBy={"mostCommon"} />
      </AppScrollView>
    </ImageBackground>
  );
}
