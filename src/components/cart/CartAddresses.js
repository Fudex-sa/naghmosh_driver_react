import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList, showError } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import TotalSection from './TotalSection';
import AddressCard from './AddressCard';
import ChooseAddress from './ChooseAddress';
import NoAddresses from './NoAddresses';
import { useSelector } from 'react-redux';

export default CartAddresses = props => {
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
                        allData={allData}
                        onSelectItem={(id) => {
                            setAddressID(id);
                            props.onSelectAddress(id)
                        }}
                    />
                )}
                noResultsComponent={<NoAddresses />}
            />
            <ChooseAddress onContinue={props.onContinue} price={props.price} addressID={addressID} />
        </AppView>
    );
}
