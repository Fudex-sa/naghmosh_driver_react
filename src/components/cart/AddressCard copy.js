import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, screenWidth } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";

import Swipeout from 'react-native-swipeout';

export default AddressCard = props => {
    const screenWidth = Dimensions.get('window').width;
    const [bgColor, setBGColor] = useState("#fff")
    const [addressColor, setAddressColor] = useState(colors.darkgrey)
    const { data, allData } = props;
    const [selected, setSelected] = useState(false);

    const swipeoutBtns = [
        {
            component: (
                <AppView center flex stretch row  >
                    <AppIcon
                        name="edit"
                        type="ant"
                        color="#fff"
                        size={15}
                        marginHorizontal={5}
                        onPress={() => alert("edit")}
                    />
                    <AppView
                        onPress={() => alert("delete")}
                        backgroundColor="#fff" circleRadius={10} center marginHorizontal={5}
                    >
                        <AppIcon
                            name="ios-close"
                            type="ion"
                            color={colors.primaryAccent}
                            size={12}
                        />
                    </AppView>
                </AppView>
            ),
            backgroundColor: '#87B73C',
            // onPress: () => {
            //     return
            //     (autoClose = true), alert("S")
            // },
        },
    ];

    const onOpen = () => {
        setBGColor("#91C441")
        setAddressColor("#fff")
    }

    const onClose = () => {
        setBGColor("#fff")
        setAddressColor(colors.darkgrey)
    }
    return (
        <Swipeout
            sensitivity={200}
            // autoClose
            right={swipeoutBtns}
            buttonWidth={screenWidth / 2}
            backgroundColor={props.selected === data.id ? "#E54300" : bgColor} onOpen={onOpen} onClose={onClose} >
            <AppView
                backgroundColor={props.selected === data.id ? "#E54300" : bgColor}
                borderColor={colors.grey} borderBottomWidth={.5}
                stretch width={100} row spaceBetween paddingVertical={10} >
                <AppView
                    stretch row centerX >
                    <AppIcon
                        name="maps"
                        type="custom"
                        size={15}
                        color={addressColor}
                        marginHorizontal={5}
                    />
                    <AppText color={addressColor} bold size={7}>
                        {data.country_name}
                    </AppText>
                </AppView>
                <AppView
                    onPress={() => {
                        // TODO FIX SELECTION
                        const x = allData.map((item) => {
                            props.updateItemInList(item.id, { selected: item.id === data.id ? true : false });
                            return { ...item, selected: item.id === data.id ? true : false }
                        });
                        setSelected(true)
                        props.onSelectItem(data.id)
                    }}
                    padding={3}
                    stretch circleRadius={8} center backgroundColor="#fff" elevation={5} marginHorizontal={10} >
                    {props.selected === data.id && <AppIcon
                        name="check"
                        type="feather"
                        color={colors.primaryAccent}
                    />
                    }
                </AppView>
            </AppView>
        </Swipeout>
    );
}
