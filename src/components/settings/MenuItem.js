import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../common";
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserData } from "../../actions/auth";
import { useDispatch } from 'react-redux';
import { setLang } from '../../actions/lang';

export default MenuItem = props => {
    const dispatch = useDispatch();

    const renderLogout = () => {
        return Alert.alert(
            I18n.t('Are you sure you want to sign out'),
            '',
            [
                {
                    text: I18n.t('cancel'),
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: I18n.t('logout'),
                    onPress:
                        async () => {
                            try {
                                await AsyncStorage.removeItem("@UserData");
                                await dispatch(setUserData(null));
                                AppNavigation.push({ name: 'Login', passProps: { loginInApp: true } });
                            } catch (e) {
                                // remove error
                            }

                        },
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <AppView
            stretch row height={6.5} spaceBetween borderBottomWidth={.5} borderColor={colors.darkgrey}
            centerY paddingHorizontal={10}
            onPress={() => {
                if (props.screenName === 'Logout') {
                    renderLogout();
                }
                if (props.screenName && props.screenName !== 'Logout') AppNavigation.push(props.screenName)
                // if (props.screenName === 'lang') {
                //     dispatch(setLang('ar', true))
                // }
            }}
        >
            <AppView stretch row  >
                <AppIcon
                    name={props.iconName}
                    type={props.iconType || "custom"}
                    size={8}
                />
                <AppText bold marginHorizontal={5} size={7}>
                    {props.name}
                </AppText>
            </AppView>
            <AppIcon
                name="chevron-right"
                type="entypo"
                color={colors.darkgrey}
                flip
                size={10}
            />

        </AppView>
    )

}
