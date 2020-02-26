import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, AppIcon, AppSpinner, showError } from "../../../src/common";
import logo from "../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import { setUserData } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { ApiErrorTypes } from "../../api/errors";
import AuthRepo from "../../repo/auth";

export default SignUp = props => {
    const rtl = useSelector(state => state.lang.rtl);
    const dispatch = useDispatch();

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const authRepo = new AuthRepo();
            const userData = await authRepo.signUp(values);
            await dispatch(setUserData(userData));
            await authRepo.setPrincipalUser(userData);
            if (rtl)
                AppNavigation.navigateToHomeAr();
            else
                AppNavigation.navigateToHome();
        }
        catch (apiErrorException) {
            if (apiErrorException.type === ApiErrorTypes.CONNECTION_ERROR) {
                showError(I18n.t(apiErrorException.msg));
            } else {
                showError(apiErrorException.msg);
            }
        } finally {
            setSubmitting(false);
        }

    }

    const renderFooter = () => {
        return (
            <AppView row stretch spaceBetween marginVertical={5}>
                <AppView stretch center onPress={() => AppNavigation.push("welcome")}>
                    <AppText
                        color={colors.primaryAccent} size={7} >
                        {I18n.t("did-you-have-acount")}
                    </AppText>
                </AppView>
                <AppView stretch center
                    onPress={() => {
                        if (rtl)
                            AppNavigation.navigateToHomeAr();
                        else
                            AppNavigation.navigateToHome();
                    }}>
                    <AppText
                        color={colors.primaryAccent} size={7} >
                        {I18n.t("skip")}
                    </AppText>
                </AppView>
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
                <AppView flex stretch>
                    <AppInput
                        {...injectFormProps("first_name")}
                        placeholder={I18n.t("first-name")}
                        height={7}
                        size={7}
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
                    <AppInput
                        {...injectFormProps("last_name")}
                        placeholder={I18n.t("last-name")}
                        height={7}
                        size={7}
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
                    <AppInput
                        {...injectFormProps("email")}
                        placeholder={I18n.t("email")}
                        email
                        height={7}
                        size={7}
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
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
                        placeholder={I18n.t("password")}
                        height={7}
                        size={7}
                        borderRadius={70}
                        paddingHorizontal={10}
                    />
                    <AppInput
                        {...injectFormProps("password_confirmation")}
                        secure
                        showSecureEye
                        placeholder={I18n.t("confirm-password")}
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
                                {I18n.t("signUp")}
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
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    password_confirmation: ""
                }}
                validationSchema={validationSchema}
                render={renderForm}
                onSubmit={onSubmit}
            />
            {renderFooter()}
        </AppScrollView>
    );
}
