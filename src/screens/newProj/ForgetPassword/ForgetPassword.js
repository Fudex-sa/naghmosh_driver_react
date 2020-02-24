import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, showError, showSuccess, AppIcon } from "../../../common";
import logo from "../../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import { AppHeader } from '../../../components';
import Axios from 'axios';

export default ForgetPassword = props => {
    const [loading, setLoading] = useState(false);

    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        Axios.post('forgetpassword', values)
            .then((res) => {
                showSuccess(res.data.message)
                setLoading(false)
                AppNavigation.pop();
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response)
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
    }) => (
            <AppView flex stretch >
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("Add your email")}</AppText>
                <AppInput
                    {...injectFormProps("email")}
                    placeholder={I18n.t("email")}
                    height={7}
                    size={7}
                    email
                    paddingHorizontal={10}
                    borderRadius={5}
                    leftItems={<AppIcon name="email-open-outline" type="material-community" />}
                />
                <AppButton
                    title={I18n.t("Submit a new password")}
                    stretch
                    size={7}
                    height={7}
                    onPress={handleSubmit}
                    borderRadius={35}
                    center
                    paddingHorizontal={8}
                    marginBottom={3}
                    processing={loading}
                />
            </AppView>
        );
    return (
        <AppView flex stretch >
            <AppHeader title={I18n.t('forget-password1')} />
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
                        email: "",
                    }}
                    validationSchema={validationSchema}
                    render={renderForm}
                    onSubmit={onSubmit}
                />
            </AppScrollView>
        </AppView>
    );
}
