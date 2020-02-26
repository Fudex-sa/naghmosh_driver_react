import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList, showError } from "../../common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import { useSelector } from 'react-redux';
import AddressCard from '../../components/cart/AddressCard';
import NoAddresses from '../../components/cart/NoAddresses';
import { AppHeader } from '../../components';

export default Addresses = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
    const refresh = useSelector(state => state.list.refreshAddressesList);
    const [allData, setAllData] = useState();
    const [addressID, setAddressID] = useState();

    const ApiRequest = {
        url: `clientaddresses?api_token=${token}`,
        responseResolver: response => {
            setAllData(response.data.data)
            return {
                data: response.data.data,
            }
        },
        onError: error => {
            if (!error.response) {
                showError(I18n.t("ui-networkConnectionError"));
            } else {
                showError(I18n.t("ui-error-happened"));
            }
            return I18n.t("ui-networkConnectionError");
        }
    };

    return (
        <AppView flex stretch >
            <AppHeader title={I18n.t('addresses')} hideCart />
            <AppList
                stretch
                flex
                flatlist
                apiRequest={ApiRequest}
                refreshControl={refresh}
                paddingTop={5}
                paddingBottom={30}
                rowHeight={50}
                rowRenderer={data => (
                    <AddressCard
                        data={data}
                        view={true}
                    />
                )}
                noResultsComponent={<NoAddresses />}
            />
            <AppView
                onPress={() => { AppNavigation.push("addNewAddress") }}
                paddingHorizontal={10} spaceBetween
                stretch row borderRadius={35} height={7} marginHorizontal={10} backgroundColor={colors.primary}
                style={{ position: "absolute", bottom: moderateScale(5), left: 0, right: 0 }}
            >
                <AppText color="#fff" >
                    {I18n.t("add-new-address")}
                </AppText>
                <AppIcon
                    name="left"
                    type="ant"
                    color="#fff"
                    reverse
                />
            </AppView>
            {/* <ChooseAddress onContinue={props.onContinue} price={props.price} addressID={addressID} /> */}
        </AppView>
    );
}
