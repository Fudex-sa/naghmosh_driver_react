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
        <AppView flex stretch>
            <AppHeader title={I18n.t('lang')} hideCart />
            <AppView
                linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
                stretch row height={6.5} spaceBetween borderWidth={1} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}
            >
                <AppText bold marginHorizontal={5} size={8} color='white' stretch>
                    {'عربى'}
                </AppText>
                <AppIcon
                    name={lang === 'ar' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={lang === 'ar' ? 'white' : colors.darkgrey}
                    size={10}
                    onPress={() => {
                        lang === 'en' ? dispatch(setLang('ar', true)) : undefined;
                        AppNavigation.navigateToHome();
                    }}
                />
            </AppView>
            <AppView
                linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
                stretch row height={6.5} spaceBetween borderWidth={1} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}>
                <AppText bold marginHorizontal={5} size={8} color='white' stretch>
                    {'English'}
                </AppText>
                <AppIcon
                    name={lang === 'en' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={lang === 'en' ? 'white' : colors.darkgrey}
                    size={10}
                    onPress={() => {
                        lang === 'ar' ? dispatch(setLang('en', false)) : undefined;
                        AppNavigation.navigateToHome();
                    }}
                />
            </AppView>
        </AppView>
    );
}
