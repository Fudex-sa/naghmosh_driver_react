import React, { } from 'react';
import { AppView, AppScrollView, } from "../../common";
import I18n from "react-native-i18n";
import { AppHeader } from "../../components";
import MenuItem from '../../components/settings/MenuItem';
import { useSelector } from 'react-redux';

export default Settings = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t('settings')} hideCart />
            <AppScrollView showsVerticalScrollIndicator={false} flex stretch>
                <MenuItem name={I18n.t("lang")} iconName="language" iconType='material' screenName="Language" />
                {token && <>
                    <MenuItem name={I18n.t("notifications")} iconName='notifications-none' iconType='material' noti />
                    <MenuItem name={I18n.t("log-out")} iconName="logout" iconType='material-community' screenName="Logout" />
                </>}
            </AppScrollView>
        </AppView>
    );
}
