import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, AppIcon, AppSpinner, showError } from "../../common";
import logo from "../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import { setUserData } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import AuthRepo from "../../repo/auth";
import firebase from 'react-native-firebase';

export default Login = props => {
    const [fcm, setFCM] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchToken() {
            const fcmToken = await firebase.messaging().getToken();
            if (fcmToken) { setFCM(fcmToken) }
        }
        fetchToken();
    }, []);
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
        AppNavigation.navigateToHome();
    }

    const renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue
    }) => (
            <AppView flex stretch marginTop={15}>
                <AppInput
                    label={I18n.t("signup-phone")}
                    {...injectFormProps("mobile")}
                    phone
                    borderRadius={5}
                    borderBottomWidth={1}
                    leftItems={<AppIcon name="phone" type="ant" flip size={9} marginHorizontal={5} />}
                />
                <AppInput
                    label={I18n.t("signup-password")}
                    secure
                    showSecureEye
                    {...injectFormProps("password")}
                    borderBottomWidth={1}
                    leftItems={<AppIcon name="lock" type="simple-line" size={8} marginHorizontal={5} />}
                />

                <AppButton
                    transparent
                    color={'gray'}
                    onPress={() => {
                        AppNavigation.push({
                            name: "ForgetPassword"
                        });
                    }}
                    title={I18n.t("forget-password")}
                    size={6}
                />
                <AppButton
                    marginTop={20}
                    stretch
                    borderRadius={7}
                    processing={isSubmitting}
                    onPress={handleSubmit}
                    title={I18n.t("login")}
                    backgroundColor="#23A636"
                />
                <AppView stretch marginTop={10} center>
                    <AppText> {I18n.t('Not a registered member?')}</AppText>
                    <AppButton
                        paddingVertical={1}
                        paddingHorizontal={0}
                        marginBottom={1}
                        transparent
                        color={'#E3000F'}
                        onPress={() => {
                            AppNavigation.push({
                                name: "signUp"
                            });
                        }}
                        title={I18n.t("dont-have-an-account")}
                        size={5}
                    />


                </AppView>

            </AppView>
        );
    return (
        <AppScrollView flex stretch paddingHorizontal={8} center >
            <AppImage
                equalSize={70}
                source={logo}
                resizeMode="contain"
            >
                <AppText
                    style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}
                    size={7} bold stretch center
                    color={'#000000'}
                >{I18n.t("welcome again")}</AppText>
            </AppImage>

            {!fcm ?
                <AppView flex stretch center>
                    <AppSpinner />
                </AppView>
                : <AppForm
                    schema={{
                        mobile: "",
                        password: "",
                        deviceToken: fcm,
                    }}
                    validationSchema={validationSchema}
                    render={renderForm}
                    onSubmit={onSubmit}
                />
            }
        </AppScrollView >
    );
}
