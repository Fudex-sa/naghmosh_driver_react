import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../common";
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export default HeaderSettings = props => {
    const rtl = useSelector(state => state.lang.rtl);

    const renderItem = (name, iconName, screenName, noBorder) => {
        return (
            <AppView
                onPress={() => {
                    if (screenName === "fav") {
                        // TODO Fix It
                        Navigation.mergeOptions('bottomTabs', {
                            bottomTabs: {
                                currentTabIndex: rtl ? 1 : 3,
                            }
                        });
                    } else {
                        if (screenName !== "wallet") AppNavigation.push(screenName)
                    }
                }}
                flex borderRightWidth={noBorder ? 0 : .7} borderRightColor="grey" center paddingHorizontal={2} >
                <AppIcon
                    name={iconName}
                    type="custom"
                    color={colors.primaryAccent}
                    size={12}
                />
                <AppText bold marginTop={2} >
                    {name}
                </AppText>
            </AppView>
        )
    }
    return (
        <AppView row stretch spaceBetween paddingVertical={10} paddingHorizontal={3} backgroundColor="#fff" elevation={4}>
            {renderItem(I18n.t("profile"), "avatar", "profile")}
            {renderItem(I18n.t("orders"), "list", "orders")}
            {renderItem(I18n.t("favs"), "fav", "fav")}
            {/* {renderItem(I18n.t("wallet"), "wallet", "wallet", true)} */}
        </AppView>
    );
}
