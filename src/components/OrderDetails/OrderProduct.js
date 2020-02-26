import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
export default OrderProduct = props => {
    // const from = props.data.product_details.productUnits !== '-1' && props.data.product_details.productUnits.length > 1 ? (props.data.product_details.minUnitPrice).toFixed(2) : 0;
    // const to = props.data.product_details.productUnits !== '-1' && props.data.product_details.productUnits.length > 1 ? (props.data.product_details.maxUnitPrice).toFixed(2) : 0;
    // const priceFromProductUnits = props.data.product_details.productUnits !== '-1' && props.data.product_details.productUnits.length === 1 ? (props.data.product_details.finalUnitPrice).toFixed(2) : 0;
    // const price = props.data.product_details.productUnits === '-1' ? (props.data.product_details.price).toFixed(2) : 0;
    // const unitName = props.data.product_details.productUnits !== '-1' ? props.data.product_details.productUnits[0].unitDetails.unit_name : null;

    return (
        <AppView stretch row borderColor={colors.grey} borderBottomWidth={.5} paddingBottom={5} marginTop={5} >
            <AppImage
                source={{ uri: props.data.product_details.main_photo_url }}
                width={30} height={16}
                resizeMode="cover" borderRadius={15} marginHorizontal={4}
            />
            <AppView stretch flex paddingVertical={8} paddingRight={5} >
                <AppView flex stretch >
                    <AppText size={7} color="#676767" marginHorizontal={2} numberOfLines={3} >
                        {props.data.product_details.product_name}
                    </AppText>
                </AppView>
                <AppView stretch row spaceBetween  >
                    {/* <AppView stretch row> */}
                        <AppText stretch >
                            {`${I18n.t('Quantity')} : ${props.data.det_product_quantity}`}
                        </AppText>
                        <AppText color={colors.primary} stretch >
                            {`${props.data.det_product_cost * props.data.det_product_quantity}  ${I18n.t("sar")}`}
                        </AppText>
                    {/* </AppView> */}
                </AppView>
            </AppView>
        </AppView>
    );
}
