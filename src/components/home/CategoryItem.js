import React, { useState, useEffect } from 'react';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppIcon } from "../../../src/common";
import I18n from "react-native-i18n";
import { useSelector } from 'react-redux';

export default categoryItem = props => {
    const rtl = useSelector(state => state.lang.rtl)
    const category = props.category
    return (
        <AppView
            style={{
                transform:
                    rtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }]
            }}
            onPress={() =>
                AppNavigation.push({ name: 'products', passProps: { category } })
            }
            width={17} margin={2} height={12} borderRadius={20} backgroundColor="#fff" elevation={5} center
        >
            <AppImage resizeMode='contain' source={{ uri: category.img_url }} equalSize={12} />
            <AppText color="darkgrey" size={6.5} marginTop={1} center>
                {category.name}
            </AppText>
        </AppView>
    )
}
