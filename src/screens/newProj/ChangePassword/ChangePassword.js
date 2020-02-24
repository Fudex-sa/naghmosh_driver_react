import React, { useState, useEffect, useRef } from 'react';
import {
    AppNavigation, AppView, AppText, AppScrollView, AppForm,
    showSuccess, showError, AppInput, AppButton, AppIcon
} from "../../../common";
import { AppHeader } from "../../../components";
import I18n from "react-native-i18n";
import { useSelector, useDispatch, connect } from 'react-redux';
import Axios from 'axios';
import { validationSchema } from './validation';
import { setUserData } from '../../../actions/AuthActions';
import AsyncStorage from '@react-native-community/async-storage';


ChangePassword = props => {
    // const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const { user } = props
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();

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
                // await dispatch(setUserData(res.data));
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
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("password")}</AppText>
                <AppInput
                    {...injectFormProps("password")}
                    placeholder={I18n.t("password")}
                    secure
                    showSecureEye
                    paddingHorizontal={10}
                    borderRadius={5}
                    leftItems={<AppIcon name="lock" type="simple-line" />}
                />
                <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("confirm-password")}</AppText>
                <AppInput
                    {...injectFormProps("password_confirmation")}
                    placeholder={I18n.t("confirm-password")}
                    showSecureEye
                    secure
                    paddingHorizontal={10}
                    borderRadius={5}
                    leftItems={<AppIcon name="lock" type="simple-line" />}
                />
                <AppButton
                    title={I18n.t("save")}
                    stretch
                    borderRadius={5}
                    marginTop={10}
                    onPress={handleSubmit}
                    center
                    processing={loading}
                />
            </AppView>
        );
    }
    return (
        <AppView flex stretch >
            <AppHeader title={I18n.t("editPassword")} />
            <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} >
                <AppForm
                    schema={{
                        api_token: user ? user.api_token : "",
                        firstName: user ? user.first_name : "",
                        lastName: user ? user.last_name : "",
                        password: "",
                        password_confirmation: "",
                    }}
                    validationSchema={validationSchema}
                    render={renderForm}
                    onSubmit={onSubmit}
                />
            </AppScrollView>
        </AppView>
    );
}
const mapStateToProps = state => ({
    connected: state.network.isConnected
    // loadingOverlay: state.loadingOverlay.socialSignin
});

const mapDispatchToProps = dispatch => ({
    // signUp: bindActionCreators(signUp, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);