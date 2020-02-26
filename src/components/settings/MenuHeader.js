import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../common";
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';

export default MenuHeader = props => {
    return (
        <AppView stretch centerY height={6.5} borderBottomWidth={.5} borderColor={colors.darkgrey} >
            <AppText color={colors.darkgrey} bold marginHorizontal={8} size={7} >
                {I18n.t(props.name)}
            </AppText>
        </AppView>

    )

}
