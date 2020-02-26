import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
export default OffersCard = props => {
    return (
        <AppView
            margin={2} stretch center>
            <AppImage
                onPress={() => {
                    AppNavigation.push({ name: "productDetails", passProps: { product: props.data.product } })
                }}
                source={{ uri: props.data.product.main_photo_url }}
                height={23} width={90} center
                resizeMode="cover" borderRadius={15} marginBottom={2}
            />
            <AppView stretch row spaceBetween paddingHorizontal={8} marginVertical={2} >
                <AppText size={6} color="#676767" marginHorizontal={2}>
                    {props.data.product.product_name}
                </AppText>
                <AppView stretch row >
                    <AppText color="#9E9E9E" marginHorizontal={3} >
                        {props.data.productUnit.unitDetails.unit_name}
                    </AppText>
                    <AppText color={colors.primary}>
                        {props.data.offer_price}
                    </AppText>
                    <AppText color={colors.primary}>
                        {I18n.t("sar")}
                    </AppText>

                </AppView>
            </AppView>

            <AppView
                backgroundColor={colors.primaryAccent}
                circleRadius={15}
                center
                style={{
                    position: "absolute",
                    top: moderateScale(5),
                    left: moderateScale(10),
                }}
            >
                <AppText bold color="#fff" size={8}>
                    {props.data.offer_price}
                </AppText>
                <AppText bold color="#fff"  >
                    {I18n.t("sar")}
                </AppText>
            </AppView>
        </AppView>
    );
}
