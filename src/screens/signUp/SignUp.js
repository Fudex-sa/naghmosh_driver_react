import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, AppIcon, AppSpinner, showError, showSuccess } from "../../common";
import logo from "../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import { setUserData } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { ApiErrorTypes } from "../../api/errors";
import AuthRepo from "../../repo/auth";
import { AppHeader } from '../../components';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { ActivityIndicator } from 'react-native';

export default SignUp = props => {
    const [fcm, setFCM] = useState(null)
    const dispatch = useDispatch();
    useEffect(async () => {
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) { setFCM(fcmToken) }
    }, []);
    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true)
        let formData = new FormData();
        Object.keys(values).forEach((value, index) => {
            formData.append(value, values[value]);
        });
        Axios.post('driverregister', formData)
            .then(async (res) => {
                setSubmitting(false)
                showSuccess(res.data.message)
                await dispatch(setUserData(res.data));
                try {
                    await AsyncStorage.setItem("@UserData", JSON.stringify(res.data));
                } catch (error) {
                }
                AppNavigation.navigateToHome();
            })
            .catch((error) => {
                setSubmitting(false)
                if (error.response.data.email) {
                    showError(error.response.data.email[0])
                }
                if (error.response.data.mobile) {
                    showError(error.response.data.mobile[0])
                }
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                }
            });
    }

    const renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue
    }) => (
            <AppView flex stretch >
                <AppView flex stretch>
                    <AppInput
                        {...injectFormProps("first_name")}
                        placeholder={I18n.t("first-name")}
                        height={7}
                        size={7}
                        borderRadius={7}
                        leftItems={<AppIcon name="user-o" type="font-awesome" size={8} marginHorizontal={5} />}
                    />
                    <AppInput
                        {...injectFormProps("last_name")}
                        placeholder={I18n.t("last-name")}
                        height={7}
                        size={7}
                        borderRadius={7}
                        leftItems={<AppIcon name="user-o" type="font-awesome" size={8} marginHorizontal={5} />}
                    />
                    <AppInput
                        {...injectFormProps("job_description")}
                        placeholder={I18n.t("desc")}
                        height={7}
                        size={7}
                        borderRadius={7}
                        leftItems={<AppIcon name="user-o" type="font-awesome" size={8} marginHorizontal={5} />}
                    />
                    <AppInput
                        {...injectFormProps("email")}
                        placeholder={I18n.t("email")}
                        email
                        height={7}
                        size={7}
                        borderRadius={7}
                        leftItems={<AppIcon name="email-open-outline" type="material-community" size={8} marginHorizontal={5} />}
                    />
                    <AppInput
                        {...injectFormProps("mobile")}
                        placeholder={I18n.t("phone")}
                        phone
                        height={7}
                        size={7}
                        leftItems={<AppIcon name="phone" type="ant" flip size={9} marginHorizontal={5} />}
                        borderRadius={7}
                    />
                    <AppInput
                        {...injectFormProps("password")}
                        secure
                        showSecureEye
                        placeholder={I18n.t("password")}
                        height={7}
                        size={7}
                        borderRadius={7}
                        leftItems={<AppIcon name="lock" type="simple-line" size={8} marginHorizontal={5} />} />
                    <AppInput
                        {...injectFormProps("password_confirmation")}
                        secure
                        showSecureEye
                        placeholder={I18n.t("confirm-password")}
                        height={7}
                        size={7}
                        borderRadius={7}
                        leftItems={<AppIcon name="lock" type="simple-line" size={8} marginHorizontal={5} />} />
                </AppView>

                <AppButton
                    marginVertical={5}
                    stretch
                    borderRadius={7}
                    processing={isSubmitting}
                    onPress={handleSubmit}
                    title={I18n.t("sign-up-create-account")}
                    backgroundColor="#23A636"
                />

            </AppView>
        );
    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t("sign-up-new-account")} />
            <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} center >
                <AppText marginTop={10} bold size={8} color="darkgrey">
                    {I18n.t("dont-have-an-account")}
                </AppText>
                <AppText marginTop={1} color="darkgrey" size={7} marginBottom={15}>
                    {I18n.t("sign-up-hint")}
                </AppText>
                {!fcm ?
                    <AppView flex stretch center>
                        <ActivityIndicator />
                    </AppView>
                    : <AppForm
                        schema={{
                            first_name: "",
                            last_name: "",
                            email: "",
                            mobile: "",
                            password: "",
                            job_description: '',
                            password_confirmation: "",
                            deviceToken: fcm,
                        }}
                        validationSchema={validationSchema}
                        render={renderForm}
                        onSubmit={onSubmit}
                    />
                }
            </AppScrollView>
        </AppView>
    );
}
