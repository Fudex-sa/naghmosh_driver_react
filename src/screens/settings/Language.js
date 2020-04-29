import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../common";
import I18n from "react-native-i18n";
import { AppHeader } from "../../components";
import colors from '../../common/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import { setLang } from '../../actions/lang';

export default Language = props => {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.lang ? state.lang.lang : null);
    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t('lang')} hideCart />
            <AppView
                linearBackgroundGradient={{
                    colors: [colors.black, colors.thirdly],
                    start: { x: lang === 'ar' ? 1 : 0, y: lang === 'ar' ? 1 : 0 },
                    end: { x: lang === 'ar' ? 0 : 1, y: lang === 'ar' ? 0 : 1 }
                }} stretch row height={6.5} spaceBetween
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}
            >
                <AppText bold marginHorizontal={5} size={8} color={colors.primary} stretch>
                    {'عربى'}
                </AppText>
                <AppIcon
                    name={lang === 'ar' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={lang === 'ar' ? colors.primary : colors.white}
                    size={10}
                    onPress={() => {
                        lang === 'en' ? dispatch(setLang('ar', true)) : undefined;
                        AppNavigation.navigateToHome();
                    }}
                />
            </AppView>
            <AppView
                linearBackgroundGradient={{
                    colors: [colors.black, colors.thirdly],
                    start: { x: lang === 'ar' ? 1 : 0, y: lang === 'ar' ? 1 : 0 },
                    end: { x: lang === 'ar' ? 0 : 1, y: lang === 'ar' ? 0 : 1 }
                }} stretch row height={6.5} spaceBetween
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}>
                <AppText bold marginHorizontal={5} size={8} color={colors.primary} stretch>
                    {'English'}
                </AppText>
                <AppIcon
                    name={lang === 'en' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={lang === 'en' ? colors.primary : colors.white}
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
