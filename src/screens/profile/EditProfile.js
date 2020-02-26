import React, { useState, useEffect, useRef } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, AppForm, showSuccess, showError, AppInput, AppButton } from "../../common";
import { AppHeader } from "../../components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { validationSchema } from './validation';
import { setUserData } from '../../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';


export default EditProfile = props => {
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        let formData = new FormData();
        Object.keys(values).forEach((value, index) => {
            formData.append(value, values[value]);
        });

        Axios.post('updateprofile', formData)
            .then(async (res) => {
                showSuccess(res.data.message)
                setLoading(false)
                await dispatch(setUserData(res.data));
                try {
                    await AsyncStorage.setItem("@UserData", JSON.stringify(res.data));
                } catch (error) {
                }
                AppNavigation.pop();
            })
            .catch((error) => {
                setLoading(false)
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }

    const renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue
    }) => {
        return (
            <AppView flex stretch >
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("first-name")}</AppText>
                <AppInput
                    {...injectFormProps("firstName")}
                    placeholder={I18n.t("first-name")}
                    height={7}
                    size={7}
                    paddingHorizontal={10}
                    borderRadius={70}
                />
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("last-name")}</AppText>
                <AppInput
                    {...injectFormProps("lastName")}
                    placeholder={I18n.t("last-name")}
                    height={7}
                    size={7}
                    paddingHorizontal={10}
                    borderRadius={70}
                />
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("email")}</AppText>
                <AppInput
                    {...injectFormProps("email")}
                    placeholder={I18n.t("email")}
                    height={7}
                    size={7}
                    paddingHorizontal={10}
                    borderRadius={70}
                />
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("phone")}</AppText>
                <AppInput
                    {...injectFormProps("mobile")}
                    placeholder={I18n.t("phone")}
                    phone
                    height={7}
                    size={7}
                    paddingHorizontal={10}
                    borderRadius={70}
                />
                <AppButton
                    title={I18n.t("Save edits")}
                    stretch
                    bottom
                    size={7}
                    borderRadius={25}
                    marginTop={10}
                    height={7}
                    onPress={handleSubmit}
                    center
                    processing={loading}
                />
            </AppView>
        );
    }
    return (
        <AppView flex stretch >
            <AppHeader title={I18n.t("editProfile")} hideCart />
            <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
                <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} >
                    <AppForm
                        schema={{
                            api_token: user ? user.api_token : "",
                            firstName: user ? user.first_name : "",
                            lastName: user ? user.last_name : "",
                            email: user ? user.email : "",
                            mobile: user ? user.mobile : "",
                        }}
                        validationSchema={validationSchema}
                        render={renderForm}
                        onSubmit={onSubmit}
                    />
                </AppScrollView>
            </ImageBackground>
        </AppView>
    );
}
