import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, showError, AppForm, AppButton, AppInput, showSuccess } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import { Alert, ActivityIndicator } from 'react-native';
import I18n from "react-native-i18n";
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { validationSchema } from './validation';
import MenuItem from '../../components/settings/MenuItem';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserData } from '../../actions/auth';

export default Profile = props => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [CollectedOrders, setCollectedOrders] = useState(null);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    useEffect(() => {
        setLoading(true)
        Axios.get(`driverprofile?api_token=${user.api_token}`)
            .then((res) => {
                setCollectedOrders(res.data.profile_data.collected_orders)
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
                return I18n.t("ui-networkConnectionError");
            })
    }
        , []);

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(true)
        let formData = new FormData();
        Object.keys(values).forEach((value, index) => {
            formData.append(value, values[value]);
        });
        Axios.post('driverprofileupdate', formData)
            .then(async (res) => {
                showSuccess(res.data.message)
                setSubmitting(false)
                await dispatch(setUserData(res.data));
                try {
                    await AsyncStorage.setItem("@UserData", JSON.stringify(res.data));
                } catch (error) {
                }
            })
            .catch((error) => {
                setSubmitting(false)
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
            <AppView flex stretch marginHorizontal={7} >
                <AppView
                    row
                    stretch
                    spaceBetween
                    paddingHorizontal={7}
                    marginBottom={10}
                >
                    <AppText>{I18n.t('Personal account information')}</AppText>

                    <AppButton
                        title={I18n.t('save')}
                        color="primary"
                        transparent
                        processing={isSubmitting}
                        onPress={handleSubmit}
                        stretch
                        paddingHorizontal={0}
                    />
                </AppView>
                <AppInput
                    {...injectFormProps("firstName")}
                    placeholder={I18n.t("first-name")}
                    height={7}
                    size={7}
                    borderRadius={7}
                    leftItems={<AppIcon name="user-o" type="font-awesome" size={8} marginHorizontal={5} />}
                />
                <AppInput
                    {...injectFormProps("lastName")}
                    placeholder={I18n.t("last-name")}
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
                <AppView
                    stretch borderWidth={1.5} borderColor={'#E95B06'} padding={5}
                    row
                    spaceBetween borderRadius={7}
                    marginTop={5}
                    onPress={() => { AppNavigation.push('ChangePassword') }}
                >
                    <AppText>{I18n.t('editPassword')}</AppText>
                    <AppIcon name="ios-arrow-forward" type="ion" flip color="grey" />
                </AppView>
            </AppView>
        )
    }

    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t('personalPage')} transparent />
            {loading ?
                <AppView flex stretch center >
                    <ActivityIndicator />
                </AppView>
                :
                <AppScrollView stretch>
                    <AppView
                        stretch
                        row
                        height={12}
                        margin={10}
                        borderRadius={5}
                    >
                        <AppView
                            stretch flex={1} center
                            backgroundColor={'#E95B06'}
                            paddingHorizontal={5}
                        >
                            <AppText color='white' size={7} >
                                {`${CollectedOrders}`}
                                <AppText size={6} color='white'>{`  ${I18n.t('sar')}`}</AppText>
                            </AppText>
                            <AppText color='white' size={5} >{`${I18n.t('Applications received')}`}</AppText>

                        </AppView>
                        <AppView
                            stretch flex={2} center row spaceBetween
                            linearBackgroundGradient={{ colors: ['#E3000F', '#E95B06'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }}
                        >
                            <AppView stretch flex center>
                                {/* <AppText color='white' size={7} >
                                    {`${'1,235'}`}
                                    <AppText size={6} color='white'>{`  ${I18n.t('sar')}`}</AppText>
                                </AppText>
                                <AppText color='white' size={5} >{`${I18n.t('Driver credit')}`}</AppText> */}
                            </AppView>
                            <AppView stretch flex>
                                <AppImage source={require('../../assets/imgs/cc.png')} flex stretch resizeMode={'contain'} />
                            </AppView>
                        </AppView>
                    </AppView>
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
            }
        </AppView>
    );
}
