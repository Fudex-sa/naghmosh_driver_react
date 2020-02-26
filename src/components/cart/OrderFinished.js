import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList } from "../../../src/common";
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import noAddress from "../../assets/imgs/noAddress.png"
export default OrderFinished = props => {

    setTimeout(() => { props.onContinue() }, 2000)
    return (
        <AppView flex stretch center>

            <AppView
                circleRadius={28} center centerSelf backgroundColor={colors.primaryAccent} marginTop={20} marginBottom={5}
            >
                <AppIcon
                    name="check"
                    type="feather"
                    color="#fff"
                    size={30}
                />
            </AppView>
            <AppText color={colors.primaryAccent} bold size={9}  >
                {I18n.t("congratulations")}
            </AppText>
            <AppText marginVertical={4} size={7}>
                {I18n.t("your-order-is-accepted")}
            </AppText>

            <AppText color={colors.darkgrey} marginHorizontal={2} size={7} >
                {I18n.t("we-will-confirm-you-when-deliver")}
            </AppText>
        </AppView>
    );
}
