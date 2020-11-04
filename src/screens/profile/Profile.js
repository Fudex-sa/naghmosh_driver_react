import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, showError, AppForm, AppButton, AppInput, showSuccess, AppSpinner } from "../../common";
import { AppHeader } from "../../components";
import { Alert, ActivityIndicator } from 'react-native';
import I18n from "react-native-i18n";
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { validationSchema } from './validation';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserData } from '../../actions/auth';
import colors from '../../common/defaults/colors';

export default Profile = props => {
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.lang);
    const [loading, setLoading] = useState(false);
    const [CollectedOrders, setCollectedOrders] = useState(null);
    const [totalCommission, setTotalCommission] = useState(null);
    const [credit_collected, set_credit_collected] = useState(null);
    const [cash_collected, set_cash_collected] = useState(null);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    useEffect(() => {
        setLoading(true)
        Axios.get(`driverprofile?api_token=${user.api_token}`)
            .then((res) => {
                console.log("res.data.profile_data", res.data.profile_data)
                setCollectedOrders(res.data.profile_data.collected_orders);
                setTotalCommission(res.data.profile_data.total_commission);
                set_credit_collected(res.data.profile_data.credit_collected);
                set_cash_collected(res.data.profile_data.cash_collected);
                setLoading(false);
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
                    marginBottom={10}
                >
                    <AppText color={colors.black}>{I18n.t('Personal account information')}</AppText>

                    <AppButton
                        title={I18n.t('save')}
                        color={colors.primary}
                        transparent
                        processing={isSubmitting}
                        onPress={handleSubmit}
                        stretch bold
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
                    stretch borderWidth={1.5} borderColor={colors.statusBar} padding={5}
                    row
                    spaceBetween borderRadius={7}
                    marginTop={5}
                    onPress={() => { AppNavigation.push('ChangePassword') }}
                >
                    <AppText>{I18n.t('editPassword')}</AppText>
                    <AppIcon name="ios-arrow-forward" type="ion" flip />
                </AppView>
            </AppView>
        )
    }

    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t('personalPage')} transparent />
            {loading ?
                <AppView flex stretch center >
                    <AppSpinner />
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
                            stretch flex={2} center row spaceBetween
                            linearBackgroundGradient={{
                                colors: [colors.black, colors.thirdly],
                                start: { x: lang === 'ar' ? 1 : 0, y: lang === 'ar' ? 1 : 0 },
                                end: { x: lang === 'ar' ? 0 : 1, y: lang === 'ar' ? 0 : 1 }
                            }}                        >
                            <AppView
                                stretch flex centerY
                                paddingHorizontal={5}
                            >

                                <AppText color={colors.secondary} size={7}>{`${I18n.t('Applications received')}`}</AppText>
                                <AppText color={colors.secondary} size={7} >{`${I18n.t('Cash')}`}</AppText>
                                <AppText color={colors.secondary} size={7} >{`${I18n.t('Mada card')}`}</AppText>

                            </AppView>
                            <AppView stretch flex center>
                                <AppText color={colors.secondary} size={7} numberOfLines={1}>
                                    {`${CollectedOrders}`}
                                    <AppText size={6} color={colors.secondary}>{`  ${I18n.t('sar')}`}</AppText>
                                </AppText>
                                <AppText color={colors.secondary} size={7} numberOfLines={1}>
                                    {`${cash_collected}`}
                                    <AppText size={6} color={colors.secondary}>{`  ${I18n.t('sar')}`}</AppText>
                                </AppText>
                                <AppText color={colors.secondary} size={7} numberOfLines={1}>
                                    {`${credit_collected}`}
                                    <AppText size={6} color={colors.secondary}>{`  ${I18n.t('sar')}`}</AppText>
                                </AppText>
                                {/* <AppText color={colors.secondary} size={7} numberOfLines={1}>
                                    {`${totalCommission}`}
                                    <AppText size={6} color={colors.secondary}>{`  ${I18n.t('sar')}`}</AppText>
                                </AppText>
                                <AppText color={colors.secondary} size={5} >{`${I18n.t('Driver credit')}`}</AppText> */}
                            </AppView>
                            <AppView stretch flex>
                                <AppImage source={require('../../assets/imgs/person.png')} flex stretch resizeMode={'contain'} />
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
