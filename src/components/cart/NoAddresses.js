import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList } from "../../../src/common";
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import noAddress from "../../assets/imgs/noAddress.png"
export default NoAddresses = props => {
    return (
        <AppView flex stretch center>
            <AppImage
                source={noAddress}
                width={100}
                height={20}
                resizeMode="contain"
                marginBottom={10}
                marginTop={40}
            />
            <AppText color={colors.primaryAccent} bold size={7}  >
                {I18n.t("where-address")}
            </AppText>
            <AppText color={colors.darkgrey} marginVertical={4} size={7}>
                {I18n.t("add-address")}
            </AppText>
            <AppView
                onPress={() => { AppNavigation.push("addNewAddress") }}
                row stretch center paddingVertical={2} >
                <AppIcon
                    name="pluscircleo"
                    type="ant"
                    color={colors.primary}
                />
                <AppText color={colors.primary} marginHorizontal={2} size={7} >
                    {I18n.t("add-new-address")}
                </AppText>
            </AppView>
        </AppView>
    );
}
