import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, screenWidth } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";

import Swipeout from 'react-native-swipeout';

export default PaymentCard = props => {
    const screenWidth = Dimensions.get('window').width;
    const { data, allData } = props

    return (
        <AppView
            backgroundColor={data.selected ? colors.primaryAccent : "#fff"}
            stretch width={100} row spaceBetween paddingVertical={10} >
            <AppView
                stretch row centerX >
                <AppIcon
                    name={data.iconName}
                    type="custom"
                    size={15}
                    color={data.selected ? "#fff" : colors.darkgrey}
                    marginHorizontal={5}
                />
                <AppText color={data.selected ? "#fff" : colors.darkgrey} bold size={7}>
                    {I18n.t(data.name)}
                </AppText>
            </AppView>
            <AppView
                onPress={() => {
                    // TODO FIX SELECTION
                    const x = allData.map((item) => {
                        props.updateItemInList(item.id, { selected: item.id === data.id ? true : false });
                        return { ...item, selected: item.id === data.id ? true : false }
                    });
                    props.onSelectItem(data.id)
                }}
                padding={3}
                stretch circleRadius={8} center backgroundColor="#fff" elevation={5} marginHorizontal={10} >
                {data.selected && <AppIcon
                    name="check"
                    type="feather"
                    color={colors.primaryAccent}
                />
                }
            </AppView>
        </AppView>
    );
}
