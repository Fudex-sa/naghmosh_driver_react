import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import PaymentCard from './PaymentCard';
import PayNow from './PayNow';
const allData = [
    // { id: 1, name: "credit-card", iconName: "credit" },
    // { id: 2, name: "wallet", iconName: "wallet" },
    // { id: 3, name: "bank-transfer", iconName: "bank" },
    { id: 0, name: "cod", iconName: "cod" }
]

export default CartPayment = props => {
    // const [selectedMethod, setMethod] = useState("inBranch")
    const [paymentType, setPaymentType] = useState(null);
    return (
        <AppView flex stretch >
            {/* <AppView row stretch spaceArround marginVertical={5} >
                <AppView
                    onPress={() => setMethod("inBranch")} height={15}
                    borderWidth={1} stretch center flex paddingVertical={5} marginHorizontal={5}
                    borderColor={selectedMethod === "inBranch" ? colors.primaryAccent : colors.darkgrey}
                >

                    <AppIcon
                        name="company"
                        type="custom"
                        color={selectedMethod === "inBranch" ? colors.primaryAccent : colors.darkgrey}
                        size={18}
                    />
                    <AppText bold color={selectedMethod === "inBranch" ? colors.primaryAccent : colors.darkgrey} marginTop={5} >
                        {I18n.t("receive-in-branch")}
                    </AppText>
                </AppView>
                <AppView
                    onPress={() => setMethod("shipped")} height={15}
                    borderWidth={1} borderColor={selectedMethod !== "inBranch" ? colors.primaryAccent : colors.darkgrey}
                    center flex stretch paddingVertical={5} marginHorizontal={5}
                >
                    <AppIcon
                        name="shipped"
                        type="custom"
                        color={selectedMethod !== "inBranch" ? colors.primaryAccent : colors.darkgrey}
                        size={16}
                    />
                    <AppText bold color={selectedMethod !== "inBranch" ? colors.primaryAccent : colors.darkgrey} marginTop={5} >
                        {I18n.t("deliver-to-address")}
                    </AppText>
                </AppView>
            </AppView> */}
            <AppList
                stretch
                flex
                flatlist
                data={allData}
                staticData
                paddingBottom={30}
                rowHeight={50}
                rowRenderer={data => (
                    <PaymentCard
                        data={data}
                        allData={allData}
                        onSelectItem={(id) => { setPaymentType(id) }}
                    />
                )}
            />
            <PayNow
                onContinue={props.onContinue}
                price={props.price}
                addressID={props.addressID}
                paymentType={paymentType}
            />
        </AppView>
    );
}
