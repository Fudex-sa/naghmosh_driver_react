import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showError } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import Axios from 'axios';
import { useSelector } from 'react-redux';

export default FavCard = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
    const removeFromFavourite = () => {
        Axios.post('removefromfav', { api_token: token, productId: props.data.product.product_id })
            .then((res) => {
                props.removeItemFromList(props.data.product.product_id)
            })
            .catch((error) => {
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }
    return (
        <AppView
            marginHorizontal={1.6} width={31}  >
            <AppImage
                onPress={() => {
                    AppNavigation.push({ name: "productDetails", passProps: { product: props.data.product } })
                }}
                source={{ uri: props.data.product.main_photo_url }}
                width={31} height={20}
                resizeMode="cover" borderRadius={15} marginBottom={2} marginTop={5}
            />
            <AppText size={6} color="#676767" marginHorizontal={2}>
                {props.data.product.product_name}
            </AppText>
            <AppIcon
                name="Heart"
                type="custom"
                color={colors.primaryAccent}
                size={10}
                style={{
                    position: "absolute",
                    top: moderateScale(10),
                    left: moderateScale(5),
                }}
                onPress={() => {
                    removeFromFavourite();
                }}
            />
        </AppView>
    );
}
