import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showSuccess, showError, showInfo } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { ActivityIndicator } from 'react-native';

export default ChooseAddress = props => {
    console.log("price in coo add ", props)
    const [loading, setLoading] = useState(false);
    const [deliveryValue, setDeliveryValue] = useState(0);
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)

    const getDeliveryvalue = () => {
        setLoading(true)
        Axios.get(`deliveryvalue?api_token=${token}&addressId=${props.addressID}`)
            .then((res) => {
                setLoading(false)
                setDeliveryValue(res.data.delivery_value);
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
            stretch row borderRadius={15} marginHorizontal={10}
            style={{ position: "absolute", bottom: moderateScale(5), left: 0, right: 0 }}
        >
            {/* <AppView stretch flex>
                {deliveryValue > 0 && <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                    <AppText color="#fff" >
                        {I18n.t("delivry")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${deliveryValue} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
                }

                <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                    <AppText color="#fff" >
                        {deliveryValue > 0 ? I18n.t("totalPrice") : I18n.t("total")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${deliveryValue > 0 ? (parseFloat(props.price) + deliveryValue) : props.price} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
            </AppView> */}
            <AppView
                onPress={() => {
                    console.log("props.price.price", props.price.price, "deliveryValue", deliveryValue)
                    props.addressID ?
                        deliveryValue > 0 ? props.onContinue((deliveryValue).toFixed(2))
                            : getDeliveryvalue() : showInfo(I18n.t('selectAddress'))
                }}
                flex row spaceBetween stretch backgroundColor={colors.primary} padding={5}
            >
                {loading ?
                    <AppView flex stretch center>
                        <ActivityIndicator />
                    </AppView>
                    :
                    <>
                        <AppText color="#fff" size={7}>
                            {deliveryValue > 0 ? I18n.t("selectPayment") : I18n.t("choose-address")}
                        </AppText>
                        <AppIcon
                            name="left"
                            type="ant"
                            color="#fff"
                            reverse
                            size={7}
                        />
                    </>
                }
            </AppView>

        </AppView >
    );
}
