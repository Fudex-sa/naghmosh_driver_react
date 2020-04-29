import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon, showSuccess } from "../../common";
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserData } from "../../actions/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../actions/lang';
import { Switch } from 'native-base';
import Axios from 'axios';

export default MenuItem = props => {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.lang);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const [notif, setNotif] = useState(user && user.notifications === 'on' ? true : false);

    const deleteToken = () => {
        Axios.post('drivertoken/delete', { api_token: user.api_token })
            .then(async (res) => {
                // showSuccess(res.data.message)
            })
            .catch((error) => {
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }

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
                                deleteToken()
                                await AsyncStorage.removeItem("@UserData");
                                await dispatch(setUserData(null));
                                AppNavigation.navigateToAuth();
                            } catch (e) {
                                // remove error
                            }
                        },
                },
            ],
            { cancelable: false },
        );
    }

    const notificationOnOff = (url) => {
        Axios.post(url, { api_token: user.api_token })
            .then(async (res) => {
                await dispatch(setUserData(res.data));
                try {
                    await AsyncStorage.setItem("@UserData", JSON.stringify(res.data));
                } catch (error) {
                }
                showSuccess(res.data.message)
            })
            .catch((error) => {
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }

    return (
        <AppView
            linearBackgroundGradient={{
                colors: [colors.black, colors.thirdly],
                start: { x: lang === 'ar' ? 1 : 0, y: lang === 'ar' ? 1 : 0 },
                end: { x: lang === 'ar' ? 0 : 1, y: lang === 'ar' ? 0 : 1 }
            }} stretch row height={7} spaceBetween
            centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}
            onPress={props.noti ? undefined : () => {
                if (props.screenName === 'Logout') {
                    renderLogout();
                }
                if (props.screenName && props.screenName !== 'Logout')
                    AppNavigation.push({ name: props.screenName, passProps: { url: props.url } })
            }}
        >
            <AppView stretch row  >
                <AppIcon
                    name={props.iconName}
                    type={props.iconType || "custom"}
                    size={9} color={colors.primary}
                />
                <AppText bold marginHorizontal={5} size={8} color={colors.primary}>
                    {props.name}
                </AppText>
            </AppView>
            {props.noti ?
                <Switch
                    trackColor={notif ? colors.secondary : colors.primary}
                    onValueChange={value => {
                        setNotif(value)
                        if (value) { notificationOnOff('driver/notifications/on') }
                        else { notificationOnOff('driver/notifications/off') }
                    }}
                    thumbColor={notif ? colors.primary : colors.white}
                    value={notif}
                />
                :
                <AppIcon
                    name="chevron-right"
                    type="entypo"
                    color={colors.primary}
                    flip
                    size={10}
                />
            }

        </AppView>
    )

}
