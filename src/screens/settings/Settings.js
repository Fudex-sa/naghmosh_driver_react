import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import backgroundImg from '../../assets/imgs/background.png';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../common";
import I18n from "react-native-i18n";
import { AppHeader } from "../../components";
import HeaderSection from '../../components/settings/HeaderSection';
import colors from '../../common/defaults/colors';
import MenuItem from '../../components/settings/MenuItem';
import MenuHeader from '../../components/settings/MenuHeader';
import { useSelector } from 'react-redux';

export default Settings = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    return (
        <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }}>
            <AppHeader title={user ? user.user_name : I18n.t('user')} hideBack hideCart />
            <AppScrollView showsVerticalScrollIndicator={false} flex stretch>
                {token && <HeaderSection />}
                {token && <>
                    <MenuHeader name="my-account" />
                    <MenuItem name={I18n.t("addresses")} iconName="flag" screenName="Addresses" />
                    {/* <MenuItem name={I18n.t("payment")} iconName="maps" screenName="" />
                    <MenuItem name={I18n.t("return")} iconName="reply" screenName="" /> */}
                </>}
                <MenuHeader name="settings" />
                {/* <MenuItem name={I18n.t("country")} iconName="flag" screenName="" /> */}
                <MenuItem name={I18n.t("lang")} iconName="lang" screenName="Language" />

                <MenuHeader name="contact-us" />
                <MenuItem name={I18n.t("help")} iconName="inf" screenName="HowToUse" />
                <MenuItem name={I18n.t("contact-us")} iconName="ios-call" iconType="ion" screenName="contactUs" />
                {token && <MenuItem name={I18n.t("log-out")} iconName="out" screenName="Logout" />}

            </AppScrollView>
        </ImageBackground>
    );
}
