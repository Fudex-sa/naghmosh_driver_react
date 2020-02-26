import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, showError } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground, ActivityIndicator } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import { useSelector } from 'react-redux';
import Axios from 'axios';

const renderItem = (title, value, isPassword) => {
    return (
        <AppView stretch borderColor={colors.grey} borderTopWidth={.7} paddingVertical={5} >
            <AppText color="#000" bold marginHorizontal={10} >
                {title}
            </AppText>
            <AppView row stretch spaceBetween>
                <AppText color={colors.darkgrey} bold marginHorizontal={10} paddingTop={5} >
                    {value}
                </AppText>
                {isPassword &&
                    <AppText color={colors.primary} bold paddingHorizontal={10}
                        onPress={() => { AppNavigation.push('ChangePassword') }}>
                        {I18n.t("edit")}
                    </AppText>
                }
            </AppView>
        </AppView>
    )
}

export default Profile = props => {
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const [loading, setLoading] = useState(false);
    // const [user, setUser] = useState(useSelector(state => state.auth.userData ? state.auth.userData.data : null));
    // const [reload, setReload] = useState(false)
    // useEffect(() => {
    //     setLoading(true)
    //     Axios.get(`getprofile?api_token=${token}`)
    //         .then((res) => {
    //             setUser(res.data.profile_data)
    //             setLoading(false)
    //             // setReload(false)
    //         }).catch((error) => {
    //             setLoading(false)
    //             if (!error.response) {
    //                 showError(I18n.t("ui-networkConnectionError"));
    //             } else {
    //                 showError(I18n.t("ui-error-happened"));
    //             }
    //             return I18n.t("ui-networkConnectionError");
    //         })
    // }
    //     , [reload])

    return (
        <AppView flex stretch >
            <AppHeader title={I18n.t("profile")} hideCart />
            <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
                {!user || loading ?
                    <AppView flex stretch center>
                        <ActivityIndicator />
                    </AppView>
                    : <AppScrollView flex stretch paddingBottom={5} >
                        <AppView stretch center marginHorizontal={10} marginTop={10} marginBottom={5} >
                            <AppText color={colors.darkgrey} bold size={7}>
                                {I18n.t("personal picture")}
                            </AppText>
                            <AppImage
                                circleRadius={25}
                                bw={1}
                                resizeMode='cover'
                                source={user.img_url ? { uri: user.img_url } : require('../../assets/imgs/logo.png')}
                            />
                            <AppText color={colors.primary} bold padding={2}
                                onPress={() => {
                                    AppNavigation.push({
                                        name: 'EditPicture',
                                        // passProps: { onDone: () => { setReload(true); } }
                                    })
                                }}>
                                {I18n.t("edit")}
                            </AppText>
                        </AppView>
                        <AppView row stretch spaceBetween marginHorizontal={10} marginTop={10} marginBottom={5} >
                            <AppText color={colors.darkgrey} bold size={7}>
                                {I18n.t("profile-info")}
                            </AppText>
                            <AppText color={colors.primary} bold padding={2}
                                onPress={() => { AppNavigation.push('EditProfile') }}>
                                {I18n.t("edit")}
                            </AppText>
                        </AppView>
                        {renderItem(I18n.t("first-name"), user.first_name)}
                        {renderItem(I18n.t("last-name"), user.last_name)}
                        {renderItem(I18n.t("email"), user.email)}
                        {renderItem(I18n.t("phone"), user.mobile)}
                        {renderItem(I18n.t("password"), "**********", true)}
                    </AppScrollView>
                }
            </ImageBackground>
        </AppView>
    );
}
