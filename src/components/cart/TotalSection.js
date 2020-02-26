import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showInfo } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import { useSelector } from 'react-redux';

export default TotalSection = props => {
    const coupon = useSelector(state => state.auth.coupon ? state.auth.coupon.code_discount_percentage : null)
    return (
        <AppView
            stretch row borderRadius={15} marginHorizontal={10}
            style={{ position: "absolute", bottom: moderateScale(5), left: 0, right: 0 }}
        >
            {/* <AppView flex stretch>
                <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                    <AppText color="#fff" >
                        {I18n.t("total")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${props.subTotalPrice} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
                <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                    <AppText color="#fff" >
                        {I18n.t("Value Added")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${props.extraPrice} ${I18n.t("sar")})`}
                    </AppText>
                </AppView>
            </AppView> */}
            <AppView flex stretch>
                <AppView
                    onPress={() => props.totalPrice > 0 ? props.onContinue(props.totalPrice, props.subTotalPrice, props.extraPrice) : showInfo(props.noItems)}
                    flex row spaceBetween stretch backgroundColor={colors.primary} padding={5}
                >
                    <AppText color="#fff" size={7} >
                        {I18n.t("continue-shopping")}
                    </AppText>
                    <AppIcon
                        name="left"
                        type="ant"
                        color="#fff"
                        reverse
                        size={7}
                    />
                </AppView>

                {/* <AppView flex row stretch backgroundColor={colors.thirdly} >
                    <AppText color="#fff" >
                        {I18n.t("totalPrice")}
                    </AppText>
                    <AppText color="#fff" marginHorizontal={2} >
                        {`(${props.totalPrice} ${I18n.t("sar")})`}
                    </AppText>
                    {coupon && <AppText color={colors.primaryAccent}>
                        {`${coupon} ${I18n.t('discount')} `}
                    </AppText>
                    }
                </AppView> */}

            </AppView>
        </AppView>
    );
}
