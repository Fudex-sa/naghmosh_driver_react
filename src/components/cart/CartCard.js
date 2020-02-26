import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showError, showSuccess } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { refreshList } from '../../actions/list';
import { ActivityIndicator } from 'react-native';

export default CartCard = props => {
    const data = props.data;
    const [count, setCount] = useState(data.cart_quantity);
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
    const dispatch = useDispatch();
    const index = data.product_details.productUnits.findIndex(
        item => item.unit_id === data.unit_id
    );
    const [unit, setUnit] = useState(data.product_details.productUnits[index]);
    const [price, setPrice] = useState(unit.activeOffer !== '-1' ? unit.activeOffer.offer_price : unit.price);
    const [loading, setLoading] = useState(false);

    const updateItemConut = (newCount) => {
        setLoading(true);
        Axios.post('updatecart', {
            api_token: token,
            productId: data.cart_product_id,
            unitId: data.unit_id,
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
    const removeFromCart = (id) => {
        setLoading(true)
        Axios.post('removefromcart', { api_token: token, itemId: id })
            .then((res) => {
                showSuccess(res.data.message)
                setLoading(false);
                // props.removeItemFromList(id)
                dispatch(refreshList(['refreshCartList']));
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
        <AppView stretch row borderColor={colors.grey} borderBottomWidth={.5} paddingBottom={5} >
            {loading &&
                <AppView style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} flex stretch center >
                    <ActivityIndicator />
                </AppView>
            }
            <AppImage
                source={{ uri: data.product_details.main_photo_url }}
                width={30} height={16}
                resizeMode="cover" borderRadius={15} marginHorizontal={4}
            />
            <AppView stretch spaceBetween margin={2} >
                <AppView flex width={50} >
                    <AppText size={7} color="#676767" marginHorizontal={2} numberOfLines={3} >
                        {data.product_details.product_name}
                    </AppText>
                </AppView>
                <AppView stretch row spaceBetween width={60} >
                    <AppView stretch row>
                        <AppText marginRight={5}>
                            {unit.unitDetails.unit_name}
                        </AppText>
                        <AppText color={colors.primary} >
                            {price * count}
                        </AppText>
                        <AppText color={colors.primary}>
                            {I18n.t("sar")}
                        </AppText>
                    </AppView>
                    <AppView row stretch>
                        <AppIcon
                            onPress={() => {
                                setCount(count + 1)
                                updateItemConut(count + 1)
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
                                setCount(count - 1)
                                updateItemConut(count - 1)
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
                    removeFromCart(data.cart_id)
                }}
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
