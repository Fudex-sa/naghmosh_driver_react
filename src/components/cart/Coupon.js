import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showInfo } from "../../common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import { useSelector } from 'react-redux';

export default Coupon = props => {
    const coupon = useSelector(state => state.auth.coupon ? state.auth.coupon.code_discount_percentage : null)
    return (
        <AppView
            circleRadius={15} marginHorizontal={10} backgroundColor={colors.thirdly}
            style={{ position: "absolute", bottom: moderateScale(25), right: 0 }} center
            onPress={() => {
                AppNavigation.push({
                    name: "AddCopon",
                })
            }}
        >
            {coupon && <AppIcon
                name='checkcircleo'
                type='ant'
                size={20}
                color={colors.primaryAccent}
                style={{ position: "absolute", bottom: 0, top: 0, right: 0, left: 0, zIndex: 1000 }}
            />}
            <AppText color="#fff" center>
                {coupon ? I18n.t('Discount applied') : I18n.t("Add a discount coupon")}
            </AppText>
        </AppView >
    );
}
