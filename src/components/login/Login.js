import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, AppIcon, AppSpinner, showError } from "../../../src/common";
import logo from "../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import googleImg from "../../assets/imgs/go.png";
import fbImg from "../../assets/imgs/fb.png";
import { setUserData } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { ApiErrorTypes } from "../../api/errors";
import AuthRepo from "../../repo/auth";

export default Login = props => {
    const rtl = useSelector(state => state.lang.rtl);
    const dispatch = useDispatch();

    const onSubmit = async (values, { setSubmitting }) => {
        const authRepo = new AuthRepo();
        const userData = await authRepo.signIn(values);
        if (!userData) {
            setSubmitting(false);
            return
        }
        await dispatch(setUserData(userData));
        await authRepo.setPrincipalUser(userData);
        setSubmitting(false);
        if (props.loginInApp && !props.navigateToHome) {
            AppNavigation.pop();
        } else
            if (rtl)
                AppNavigation.navigateToHomeAr();
            else
                AppNavigation.navigateToHome();
    }

    const renderForgetPassword = () => {
        return (
            <AppView stretch marginTop={3} center>
                <AppText color={colors.primaryAccent} size={7}
                    onPress={() => AppNavigation.push('ForgetPassword')} padding={4}>
                    {I18n.t("forget-password")}
                </AppText>
            </AppView >
        )
    }

    const renderSocial = () => {
        return (
            <AppView stretch row spaceBetween height={10} marginBottom={5}>
                <AppImage source={googleImg} width={40} stretch resizeMode="contain" onPress={() => alert("comming soon!")} />
                <AppImage source={fbImg} width={40} stretch resizeMode="contain" onPress={() => alert("comming soon!")} />
            </AppView>
        )
    }
    const renderCreateAccount = () => {
        return (
            <AppButton
                stretch
                size={7}
                height={7}
                onPress={() => AppNavigation.push("signUp")}
                borderRadius={35}
                spaceBetween
                marginVertical={5}
                paddingHorizontal={8}
                backgroundColor={colors.primaryAccent}
            >
                <AppText color="#fff" bold size={7}>
                    {I18n.t("signUp")}
                </AppText>
                <AppIcon
                    name="left"
                    type="ant"
                    color="#fff"
                    reverse
                />
            </AppButton>

        )
    }

    const renderSkip = () => {
        return (
            <AppView stretch marginVertical={5} center>
                <AppText
                    onPress={() => {
                        if (rtl)
                            AppNavigation.navigateToHomeAr();
                        else
                            AppNavigation.navigateToHome();
                    }}
                    color={colors.primaryAccent} size={7} >
                    {I18n.t("skip")}
                </AppText>
            </AppView>
        )
    }

    const renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue
    }) => (
            <AppView flex stretch >
                {/* {props.loginInApp && <AppView
                    stretch center marginVertical={10} marginTop={15}
                >
                    <AppImage
                        width={50}
                        height={25}
                        source={logo}
                        resizeMode="contain"
                    />
                </AppView>
                } */}
                <AppView flex stretch>
                    <AppInput
                        {...injectFormProps("mobile")}
                        placeholder={I18n.t("phone")}
                        phone
                        height={7}
                        size={7}
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
                    <AppInput
                        {...injectFormProps("password")}
                        secure
                        showSecureEye
                        password
                        placeholder={I18n.t("password")}
                        height={7}
                        size={7}
                        borderRadius={70}
                        paddingHorizontal={10}
                    />
                </AppView>
                <AppButton
                    stretch
                    size={7}
                    height={7}
                    onPress={handleSubmit}
                    borderRadius={35}
                    spaceBetween
                    paddingHorizontal={8}
                    marginBottom={3}
                >
                    {isSubmitting ?
                        <AppView flex stretch center>
                            <AppSpinner color="#fff" />
                        </AppView>
                        :
                        <>
                            <AppText color="#fff" bold size={7}>
                                {I18n.t("login")}
                            </AppText>
                            <AppIcon
                                name="right"
                                type="ant"
                                color="#fff"
                                flip
                            />
                        </>
                    }
                </AppButton>

            </AppView>
        );
    return (
        <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} center >
            <AppImage
                width={50}
                height={40}
                source={logo}
                resizeMode="contain"
                marginBottom={10}
            />
            <AppForm
                schema={{
                    mobile: "",
                    password: ""
                }}
                validationSchema={validationSchema}
                render={renderForm}
                onSubmit={onSubmit}
            />

            {renderForgetPassword()}
            {/* {renderSocial()} */}
            {renderCreateAccount()}
            {renderSkip()}
        </AppScrollView>
    );
}
