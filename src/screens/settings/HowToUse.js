import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, AppList, showError, AppScrollView, AppSpinner } from "../../common";
import I18n from "react-native-i18n";
import { AppHeader } from '../../components';
import Axios from 'axios';
import { BASE_URLV1 } from '../../api/urls';

export default HowToUse = props => {
    const [loading, setLoading] = useState(false);
    const [use, setUse] = useState(null);
    useEffect(() => {
        setLoading(true)
        Axios.get(`${BASE_URLV1}${props.url}`)
            .then((res) => {
                setUse(res.data.data)
                setLoading(false)
            }).catch((error) => {
                setLoading(false)
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
                return I18n.t("ui-networkConnectionError");
            })
    }
        , [])

    return (
        <AppView flex stretch >
            <AppHeader title={use ? use.name : ''} hideCart />
            {!use || loading ?
                <AppView flex stretch center>
                    <AppSpinner />
                </AppView>
                :
                <AppScrollView flex stretch>
                    <AppText margin={8} size={7} >{use.description}</AppText>
                </AppScrollView>}

        </AppView>
    );
}
