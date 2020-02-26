import React, { useState, useEffect, useRef } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, AppForm, showSuccess, showError, AppInput, AppButton, showInfo } from "../../common";
import { AppHeader } from "..";
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { validationSchema } from './validation';
import { setCoupon } from '../../actions/auth';

export default AddCopon = props => {
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        Axios.post('isvalidcoupon', values)
            .then(async (res) => {
                showSuccess(res.data.message)
                setLoading(false)
                dispatch(setCoupon(res.data.coupon))
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
            <AppView flex stretch center>
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("Add a discount coupon")}</AppText>
                <AppInput
                    {...injectFormProps("couponName")}
                    placeholder={I18n.t("Add a discount coupon")}
                    height={7}
                    size={7}
                    paddingHorizontal={10}
                    borderRadius={70}
                />
                <AppButton
                    title={I18n.t("save")}
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
            <AppHeader title={`${I18n.t("Add a discount coupon")}`} hideCart />
            <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
                <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} >
                    <AppForm
                        schema={{
                            api_token: user ? user.api_token : "",
                            couponName: ""
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
