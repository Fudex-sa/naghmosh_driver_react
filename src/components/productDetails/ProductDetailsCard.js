import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, moderateScale, AppIcon, showSuccess, showInfo, showError } from "../../../src/common";
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import Axios from 'axios';
import { refreshList } from '../../actions/list';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';

export default ProductDetailsCard = props => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
    const dispatch = useDispatch();
    const data = props.data;
    const from = data.productUnits !== '-1' && data.productUnits.length > 1 ? (data.minUnitPrice).toFixed(2) : 0;
    const to = data.productUnits !== '-1' && data.productUnits.length > 1 ? (data.maxUnitPrice).toFixed(2) : 0;
    const priceFromProductUnits = data.productUnits !== '-1' && data.productUnits.length === 1 ? (data.finalUnitPrice).toFixed(2) : 0;
    const price = data.productUnits === '-1' ? (data.price).toFixed(2) : 0;
    const unitName = data.productUnits !== '-1' ? data.productUnits[0].unitDetails.unit_name : null;
    const rtl = useSelector(state => state.lang.rtl)
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
            style={{
                transform:
                    rtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }]
            }}
            width={85} row borderColor={colors.grey} borderWidth={.5} borderRadius={15} margin={3} touchableOpacity>
            {loading &&
                <AppView style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} flex stretch center >
                    <ActivityIndicator />
                </AppView>
            }
            <AppImage
                source={{ uri: data.main_photo_url }}
                width={30} height={18}
                resizeMode="cover" borderRadius={15} marginHorizontal={2}
                onPress={() => AppNavigation.push({
                    name: "productDetails",
                    passProps: {
                        product: data,
                    }
                })}
            />
            <AppView stretch flex marginVertical={3}  >
                <AppView flex stretch >
                    <AppText size={7} color="#676767" marginHorizontal={2} numberOfLines={3} marginRight={15} >
                        {data.product_name}
                    </AppText>
                </AppView>
                <AppView stretch flex row>
                    <AppText marginRight={5}>
                        {unitName && unitName}
                    </AppText>
                    <AppText color={colors.primary} >
                        {/* ${I18n.t('to')} ${to} */}
                        {from > 0 ? `${I18n.t('from')} ${from} ${I18n.t('to')} ${to}` : (priceFromProductUnits > 0 ? priceFromProductUnits : price)}
                    </AppText>
                    <AppText color={colors.primary} marginHorizontal={1} >
                        {I18n.t("sar")}
                    </AppText>
                </AppView>
                <AppView stretch flex row bottom marginRight={3}>
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
                                props.ifNoToken(false)
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
                            setCount(count - 1)
                            updateItemConut('updatecart', count - 1)
                        }}
                        name="minus-circle"
                        type="feather"
                        size={12}
                        color={colors.darkgrey}
                    />
                </AppView>
            </AppView>
            <AppIcon
                onPress={() => { props.removeItemFromList(props.data.product_id) }}
                name="closecircleo"
                type="ant"
                size={12}
                color={colors.darkgrey}
                style={{
                    position: "absolute",
                    top: moderateScale(2),
                    right: moderateScale(5),
                }}
            />

        </AppView>
    );
}
