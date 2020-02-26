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
import { useSelector, useDispatch } from 'react-redux';
import { setLang } from '../../actions/lang';

export default Language = props => {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.lang ? state.lang.lang : null);
    return (
        <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }}>
            <AppHeader title={I18n.t('lang')} hideCart />
            <AppView
                stretch row height={6.5} spaceBetween borderBottomWidth={.5} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10}
            >
                <AppText bold marginHorizontal={5} size={7} stretch>
                    {'عربى'}
                </AppText>
                <AppIcon
                    name={lang === 'ar' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={lang === 'ar' ? colors.primaryAccent : colors.darkgrey}
                    size={10}
                    onPress={() => {
                        lang === 'en' ? dispatch(setLang('ar', true)) : undefined;
                        AppNavigation.navigateToHomeAr();
                    }}
                />
            </AppView>
            <AppView
                stretch row height={6.5} spaceBetween borderBottomWidth={.5} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10}>
                <AppText bold marginHorizontal={5} size={7} stretch>
                    {'English'}
                </AppText>
                <AppIcon
                    name={lang === 'en' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={lang === 'en' ? colors.primaryAccent : colors.darkgrey}
                    size={10}
                    onPress={() => {
                        lang === 'ar' ? dispatch(setLang('en', false)) : undefined;
                        AppNavigation.navigateToHome();
                    }}
                />
            </AppView>
        </ImageBackground>
    );
}
