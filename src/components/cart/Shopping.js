import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList, showError, AppButton } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import TotalSection from './TotalSection';
import { useSelector, useDispatch } from 'react-redux';
import CartCard from './CartCard';
import Coupon from './Coupon';
import { setCartCount } from '../../actions/auth';

export default Shopping = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
    const coupon = useSelector(state => state.auth.coupon ? state.auth.coupon.code_discount_percentage : null)
    const refresh = useSelector(state => state.list.refreshCartList);
    const [subTotalPrice, setsubTotalPrice] = useState(0);
    const [extraPrice, setExtraPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [noItemsInCard, setnoItemsInCard] = useState();
    const dispatch = useDispatch();

    const ApiRequest = {
        url: `cartitems?api_token=${token}`,
        responseResolver: response => {
            setTotalPrice((response.data.cart_total).toFixed(2))
            setExtraPrice((response.data.extra_value).toFixed(2))
            dispatch(setCartCount(response.data.cart_items.length === 0 ? 0 : response.data.cart_items.total))
            setsubTotalPrice((response.data.cart_sub_total.toFixed(2)))
            if (response.data.cart_items.length === 0) { setnoItemsInCard(response.data.message) }
            return {
                data: response.data.cart_items.length === 0 ? [] : response.data.cart_items.data,
                pageCount: response.data.cart_items.last_page,
            }
        },
        onError: error => {
            if (!error.response) {
                showError(I18n.t("ui-networkConnectionError"));
            } else {
                showError(I18n.t("ui-error-happened"));
            }
            return I18n.t("ui-networkConnectionError");
        }
    };

    return (
        <AppView flex stretch >
            {token ?
                <>
                    <AppList
                        stretch
                        flex
                        flatlist
                        apiRequest={ApiRequest}
                        refreshControl={refresh}
                        noResultsLabel={noItemsInCard}
                        paddingTop={10}
                        paddingBottom={30}
                        rowHeight={90}
                        idPathInData={'cart_id'}
                        rowRenderer={data => (
                            <CartCard
                                data={data}
                            />
                        )}
                    />

                    <Coupon />

                    <TotalSection
                        onContinue={props.onContinue}
                        noItems={noItemsInCard}
                        totalPrice={coupon ? (totalPrice - (totalPrice * (coupon / 100))) : totalPrice}
                        extraPrice={extraPrice}
                        subTotalPrice={subTotalPrice} />
                </>
                :
                <AppView flex stretch center>
                    <AppText size={8} >{I18n.t('loginFirst')}</AppText>
                    <AppButton
                        title={I18n.t('login1')}
                        backgroundColor="primary"
                        width={30}
                        touchableOpacity
                        borderRadius={30}
                        size={7}
                        height={7}
                        mv={5}
                        onPress={() => {
                            AppNavigation.push({ name: 'Login', passProps: { loginInApp: true } });
                        }}
                    />
                </AppView>
            }
        </AppView>
    );
}
