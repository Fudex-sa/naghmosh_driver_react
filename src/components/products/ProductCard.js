import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showError, AppButton, showSuccess, showInfo } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { refreshList } from '../../actions/list';
import { Modal, ActivityIndicator } from 'react-native';

export default ProductCard = props => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
    const [visibleModalLogin, setVisibleModalLogin] = useState(false);
    const [isFavourite, setFavourite] = useState(props.data.isFavorite === 1 ? true : false);
    const data = props.data;
    const [loading, setLoading] = useState(false);

    const from = data.productUnits !== '-1' && data.productUnits.length > 1 ? (data.minUnitPrice).toFixed(2) : 0;
    const to = data.productUnits !== '-1' && data.productUnits.length > 1 ? (data.maxUnitPrice).toFixed(2) : 0;
    const priceFromProductUnits = data.productUnits !== '-1' && data.productUnits.length === 1 ? (data.finalUnitPrice).toFixed(2) : 0;
    const price = data.productUnits === '-1' ? (data.price).toFixed(2) : 0;
    const unitName = data.productUnits !== '-1' ? data.productUnits[0].unitDetails.unit_name : null;

    const addToFavourite = () => {
        Axios.post('addtofav', { api_token: token, productId: props.data.product_id })
            .then((res) => {
                showSuccess(res.data.message)
                setFavourite(true)
                dispatch(refreshList('refreshFavList'))
            })
            .catch((error) => {
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }
    const removeFromFavourite = () => {
        Axios.post('removefromfav', { api_token: token, productId: props.data.product_id })
            .then((res) => {
                showSuccess(res.data.message)
                setFavourite(false)
                dispatch(refreshList('refreshFavList'))
            })
            .catch((error) => {
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }

    const updateItemConut = (url, newCount) => {
        setLoading(true);
        Axios.post(url, {
            api_token: token,
            productId: data.product_id,
            unitId: data.productUnits[0].unit_id,
            productQuantity: newCount,
        })
            .then((res) => {
                dispatch(refreshList(['refreshCartList']));
                showSuccess(res.data.message)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }

    return (
        <AppView
            key={props.data.product_id.toString()}
            stretch row borderColor={colors.grey} borderBottomWidth={.5} paddingVertical={5} >
            {loading &&
                <AppView style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} flex stretch center >
                    <ActivityIndicator />
                </AppView>
            }
            <AppImage
                source={{ uri: data.main_photo_url }}
                width={30} height={16}
                resizeMode="cover" borderRadius={15} marginHorizontal={4}
                onPress={() => AppNavigation.push({
                    name: "productDetails",
                    passProps: {
                        product: data
                    }
                })}
            />
            <AppView stretch spaceBetween margin={2} >
                <AppView flex width={50} >
                    <AppText size={7} color="#676767" marginHorizontal={2} numberOfLines={3} >
                        {data.product_name}
                    </AppText>
                </AppView>
                <AppView stretch row spaceBetween flex  >
                    {/*TODO Ask Osama to replace unit with desc or delete it because units is an array if units */}
                    <AppView stretch row marginTop={8} style={{ flexWrap: "wrap", }} flex={0.75}>
                        <AppText >
                            {unitName && unitName}
                        </AppText>
                        <AppText color={colors.primary} marginHorizontal={2} >
                            {from > 0 ? `${I18n.t('from')} ${from} ${I18n.t('to')} ${to}` : (priceFromProductUnits > 0 ? priceFromProductUnits : price)}
                        </AppText>
                        <AppText color={colors.primary} >
                            {I18n.t("sar")}
                        </AppText>
                    </AppView>
                    <AppView row stretch flex={0.25}>
                        <AppIcon
                            onPress={() => {
                                if (token) {
                                    // if (unitName) {
                                    setCount(count + 1)
                                    updateItemConut('addtocart', count + 1)
                                    // }
                                    // else {
                                    //     showInfo(I18n.t('cannotAddProduct'))
                                    // }
                                } else {
                                    setVisibleModalLogin(true)
                                }
                            }}
                            name="plus-circle"
                            type="feather"
                            size={12}
                            color={colors.darkgrey}
                        />
                        <AppText color="#000" bold marginHorizontal={5} >
                            {count}
                        </AppText>
                        <AppIcon
                            onPress={() => {
                                if (count === 0) return
                                if (count === 1) {
                                    showInfo(I18n.t('deleteFromCart'))
                                    return
                                }
                                updateItemConut('updatecart', count - 1)
                                setCount(count - 1)
                            }}

                            name="minus-circle"
                            type="feather"
                            size={12}
                            color={colors.darkgrey}
                        />
                    </AppView>
                </AppView>
            </AppView>
            <AppIcon
                onPress={() => {
                    if (token) {
                        if (isFavourite) { removeFromFavourite() }
                        else { addToFavourite() }
                    } else {
                        setVisibleModalLogin(true)
                    }
                }}
                name={isFavourite ? "heart" : "heart-o"}
                type="font-awesome"
                size={9}
                color={isFavourite ? colors.primaryAccent : colors.darkgrey}
                style={{
                    position: "absolute",
                    top: moderateScale(2),
                    right: moderateScale(5),
                }}
            />
            <Modal
                visible={visibleModalLogin}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setVisibleModalLogin(false)
                }}
            >
                <AppView flex stretch center backgroundColor='white' bottom style={{ opacity: 0.9, justifyContent: 'flex-end' }}>
                    <AppText size={10} bold >{I18n.t('loginFirst')}</AppText>
                    <AppView stretch row center>
                        <AppButton
                            title={I18n.t('login1')}
                            backgroundColor="primary"
                            width={30}
                            touchableOpacity
                            borderRadius={30}
                            size={7}
                            height={7}
                            m={5}
                            onPress={() => {
                                setVisibleModalLogin(false)
                                AppNavigation.push({ name: 'Login', passProps: { loginInApp: true } });
                            }}
                        />
                        <AppButton
                            title={I18n.t('cancel')}
                            backgroundColor="primary"
                            width={30}
                            touchableOpacity
                            borderRadius={30}
                            size={7}
                            height={7}
                            m={5}
                            onPress={() => {
                                setVisibleModalLogin(false)
                            }}
                        />
                    </AppView>
                </AppView>
            </Modal>
        </AppView>
    );
}
