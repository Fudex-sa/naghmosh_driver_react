import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Images from '../../assets/imgs/index';
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
    const [notif, setNotif] = useState(false);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const deleteToken = () => {
        Axios.post('drivertoken/delete', { api_token: user.api_token })
            .then(async (res) => {
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

    return (
        <AppView
            linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
            stretch row height={7} spaceBetween borderWidth={1} borderColor={colors.darkgrey}
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
                    size={9} color='white'
                />
                <AppText bold marginHorizontal={5} size={8} color={'white'}>
                    {props.name}
                </AppText>
            </AppView>
            {props.noti ?
                <Switch
                    trackColor={notif ? 'white' : '#E95B06'}
                    onValueChange={value => {
                        setNotif(value)
                        // this.StopNotifications(value);
                    }}
                    thumbColor={notif ? '#E95B06' : 'white'}
                    value={notif}
                />
                :
                <AppIcon
                    name="chevron-right"
                    type="entypo"
                    color={'white'}
                    flip
                    size={10}
                />
            }

        </AppView>
    )

}
