import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon } from "../../common";
import I18n from "react-native-i18n";
import { AppHeader } from "../../components";
import MenuItem from '../../components/settings/MenuItem';
import { useSelector } from 'react-redux';

export default Informations = props => {
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t('informations')} hideCart />
            <AppScrollView showsVerticalScrollIndicator={false} flex stretch>
                <MenuItem name={I18n.t("AboutUS")} iconName="info-circle" iconType='font-awesome5' screenName="HowToUse" url={'aboutus'} />
                <MenuItem name={I18n.t("HowToUse")} iconName="info-circle" iconType='font-awesome5' screenName="HowToUse" url={'howtouse'} />
                <MenuItem name={I18n.t("PrivacyPolicy")} iconName="info-circle" iconType='font-awesome5' screenName="HowToUse"url={'privacy'} />
                <MenuItem name={I18n.t("TermsConditions")} iconName="info-circle" iconType='font-awesome5' screenName="HowToUse"url={'terms'} />
                <MenuItem name={I18n.t("FAQ")} iconName="info-circle" iconType='font-awesome5' screenName="HowToUse" url={'faq'}/>
            </AppScrollView>
        </AppView>
    );
}
