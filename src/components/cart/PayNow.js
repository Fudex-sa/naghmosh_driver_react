import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showSuccess, showError, showInfo } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { setCoupon } from '../../actions/auth';

export default PayNow = props => {
    console.log("props ", props)
    const [loading, setLoading] = useState(false);
    const coupon = useSelector(state => state.auth.coupon ? state.auth.coupon : null);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
    const checkout = () => {
        setLoading(true)
        const values = {
            api_token: token,
            addressId: props.addressID,
            paymentType: props.paymentType,
            couponName: coupon ? coupon.code_name : null,
        }
        if (values.couponName === null) {
            delete values.couponName
        }
        Axios.post('checkout', values)
            .then((res) => {
                setLoading(false)
                showSuccess(res.data.message);
                props.onContinue()
                dispatch(setCoupon(null))
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

    return (
        <AppView
            stretch borderRadius={15} height={12} marginHorizontal={10}
            style={{ position: "absolute", bottom: moderateScale(5), left: 0, right: 0 }}
        >
            <AppView flex stretch row>
                <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                    <AppText color="#fff" >
                        {I18n.t("total")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${props.price.subPrice} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
                <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                    <AppText color="#fff" >
                        {I18n.t("Value Added")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${props.price.extraPrice} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
            </AppView>
            <AppView flex stretch row>
                <AppView flex row stretch backgroundColor={colors.thirdly} paddingLeft={5}>
                    <AppText color="#fff" >
                        {I18n.t("delivry")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${props.price.delivery} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
                <AppView flex row stretch backgroundColor={colors.thirdly} paddingLeft={5}>
                    <AppText color="#fff" >
                        {I18n.t("totalPrice")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${parseFloat(props.price.price) + parseFloat(props.price.delivery)} ${I18n.t("sar")})`}
                    </AppText>
                    {coupon && <AppText color={colors.primaryAccent} stretch center>
                        {`${coupon.code_discount_percentage} %\n ${I18n.t('discount')} `}
                    </AppText>
                    }
                </AppView>
            </AppView>
            <AppView
                onPress={() => { props.paymentType !== null ? checkout() : showInfo(I18n.t('selectPaymentMethod')) }}
                flex row spaceBetween stretch backgroundColor={colors.primary} paddingHorizontal={5} center
            >
                {loading ?
                    <AppView flex stretch center>
                        <ActivityIndicator />
                    </AppView>
                    :
                    <>
                        <AppText color="#fff" >
                            {I18n.t("pay-now")}
                        </AppText>
                        <AppIcon
                            name="left"
                            type="ant"
                            color="#fff"
                            reverse
                        />
                    </>
                }
            </AppView>
        </AppView>
    );
}
