import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, AppIcon, AppSpinner, showError, showSuccess } from "../../common";
import logo from "../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import { AppHeader } from '../../components';
import Axios from 'axios';
import backgroundImg from "../../assets/imgs/background1.png";
import { ImageBackground } from 'react-native';
import colors from '../../common/defaults/colors';

export default ForgetPassword = props => {
    const [loading, setLoading] = useState(false);

    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        Axios.post('driverforgetpassword', values)
            .then((res) => {
                showSuccess(res.data.message);
                setLoading(false);
                if (res.data.data !== 0) { AppNavigation.pop(); }
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
    }) => (
            <AppView flex stretch >
                <AppText color={colors.white} bold marginHorizontal={5} marginBottom={5} >{I18n.t("Add your email")}</AppText>
                <AppInput
                    {...injectFormProps("email")}
                    placeholder={I18n.t("email")}
                    email
                    height={7}
                    size={7}
                    borderRadius={7}
                    leftItems={<AppIcon name="email-open-outline" type="material-community" size={8} marginHorizontal={5} />}
                />
                <AppButton
                    title={I18n.t("Submit a new password")}
                    stretch
                    size={7}
                    height={7}
                    onPress={handleSubmit}
                    borderRadius={7}
                    center
                    paddingHorizontal={8}
                    marginBottom={3}
                    processing={loading}
                    color={colors.black}
                />
            </AppView>
        );
    return (
        <AppView flex stretch >
            <AppHeader title={I18n.t('forget-password1')} />
            <ImageBackground source={backgroundImg} style={{ flex: 1,width:'100%' }}>

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
            </ImageBackground>
        </AppView>
    );
}
