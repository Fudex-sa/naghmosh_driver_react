import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
export default OrderCard = props => {
    let bg = ""
    let statusColor;
    const { status } = props.data;
    console.log("sta tus ", status)
    if (status === "الطلب قيد الانتظار" || status === 'Pending'
        || status === 'تم استلام الطلب' || status === 'Received'
        || status === 'تمت مراجعة الطلب' || status === 'Processed'
        || status === 'تم تغليف الطلب' || status === 'Packaged') {
        bg = "#D3F5CA";
        statusColor = "#5B8052"
    }
    if (status === "تم توصيل الطلب" || status === 'Delivered'
        || status === 'تم تسليم الطلب' || status === 'Done'
        || status === 'تم شحن الطلب' || status === 'Shipped') {
        bg = "#B4E3FF"
        statusColor = "#047AC0"
    }
    if (status === "تم إلغاء الطلب" || status === 'Cancelled'
        || status === 'تم رفض الطلب' || status === 'Refused'
        || status === 'تم إرجاع الطلب' || status === 'Returned'
        || status === 'تم تأجيل الطلب' || status === 'Postponed') {
        bg = "#FE9E9E"
        statusColor = "#A91919"
    }
    return (
        <AppView
            onPress={() => AppNavigation.push({ name: "orderDetails", passProps: { id: props.data.order_id } })}
            stretch row spaceBetween paddingVertical={3} marginVertical={5}
            borderColor={colors.grey} borderBottomWidth={.5}
        >
            <AppView stretch flex center>
                <AppText bold>
                    {I18n.t("order-num")}
                </AppText>
                <AppText center marginTop={3} marginHorizontal={3} bold color={colors.darkgrey}>
                    {props.data.order_encrypted_id}
                </AppText>
            </AppView>
            <AppView stretch flex center>
                <AppText bold>
                    {I18n.t("order-date")}
                </AppText>
                <AppText marginTop={3} bold color={colors.darkgrey}>
                    {props.data.created_since}
                </AppText>
            </AppView>
            <AppView stretch flex center>
                <AppText bold>
                    {I18n.t("order-status")}
                </AppText>
                <AppText marginTop={3} bold color={statusColor} backgroundColor={bg} padding={2} borderRadius={5} >
                    {props.data.status}
                </AppText>
            </AppView>
        </AppView>
    );
}
