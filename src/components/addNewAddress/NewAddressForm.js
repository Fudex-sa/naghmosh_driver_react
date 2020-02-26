import React, { useState, useEffect } from 'react';
import { AppPicker, AppNavigation, AppView, AppText, AppImage, AppScrollView, AppForm, AppInput, AppButton, AppIcon, AppSpinner, showError, showSuccess, AppInputError } from "../../../src/common";
import logo from "../../assets/imgs/logo.png";
import { validationSchema } from './validation';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import Map from './Map';
import { useSelector, useDispatch } from 'react-redux';
import { refreshList } from '../../actions/list';
import Axios from 'axios';

export default NewAddressForm = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
    const [loading, setLoading] = useState(false);
    const [loc, setLoc] = useState(null);
    const dispatch = useDispatch();
    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        const newValues = { ...values, api_token: token }
        Axios.post('addaddress', newValues)
            .then((res) => {
                showSuccess(res.data.message)
                dispatch(refreshList('refreshAddressesList'))
                setLoading(false)
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

        // AppNavigation.pop()
    }

    const renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue,
        validateField,
        errors
    }) => {
        return (
            <AppView flex stretch >
                <AppView flex stretch>
                    <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("city")}</AppText>
                    <AppPicker
                        height={7}
                        title={I18n.t('city')}
                        {...injectFormProps("cityId")}
                        searchTitle={I18n.t('city')}
                        placeholder={I18n.t("city")}
                        color={colors.darkgrey}
                        borderRadius={30}
                        stretch
                        size={7}
                        apiRequest={{
                            url: `cities`,
                            responseResolver: response => {
                                return {
                                    data: response.data.data,
                                }
                            },
                            transformData: item => {
                                return ({
                                    label: item.name,
                                    value: item.id,
                                })
                            },
                            onError: error => {
                                if (!error.response) {
                                    showError(I18n.t("ui-networkConnectionError"));
                                } else {
                                    showError(I18n.t("ui-error-happened"));
                                }
                                return I18n.t("ui-networkConnectionError");
                            }
                        }}
                    />
                    <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("Neighborhood")}</AppText>
                    <AppInput
                        {...injectFormProps("clientNeighborhood")}
                        placeholder={I18n.t("Neighborhood")}
                        height={7}
                        size={7}
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
                    <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("Street name")}</AppText>
                    <AppInput
                        {...injectFormProps("clientStreetName")}
                        placeholder={I18n.t("Street name")}
                        height={7}
                        size={7}
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
                    <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("House number")}</AppText>
                    <AppInput
                        {...injectFormProps("clientHouseNumber")}
                        placeholder={I18n.t("House number")}
                        height={7}
                        size={7}
                        phone
                        paddingHorizontal={10}
                        borderRadius={70}
                    />
                </AppView>
                <AppButton
                    title={I18n.t("Locate the map")}
                    stretch
                    size={7}
                    borderRadius={25}
                    height={7}
                    onPress={() => {
                        AppNavigation.push({
                            name: 'MapLocation', passProps: {
                                onLocationChange: (latitude, longitude) => {
                                    setFieldValue("mapLocation", latitude + ',' + longitude);
                                }
                            }
                        })
                    }}
                    center
                />
                {errors.mapLocation && (
                    <AppInputError
                        error={I18n.t('The location must be located on the map')}
                        size={7}
                    />
                )}
                <AppButton
                    title={I18n.t("add-new-address")}
                    stretch
                    size={7}
                    borderRadius={25}
                    marginVertical={10}
                    height={7}
                    onPress={handleSubmit}
                    center
                    processing={loading}
                />
            </AppView>
        );
    }
    return (
        <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} >
            <AppForm
                schema={{
                    cityId: "",
                    clientNeighborhood: "",
                    clientStreetName: "",
                    clientHouseNumber: "",
                }}
                validationSchema={validationSchema}
                render={renderForm}
                onSubmit={onSubmit}
            />
        </AppScrollView>
    );
}
