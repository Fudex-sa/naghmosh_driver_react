import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, responsiveWidth, moderateScale, AppIcon, showError, showSuccess, showInfo } from "../../../src/common";
import Images from '../../assets/imgs/index';
import colors from '../../common/defaults/colors';
import I18n from "react-native-i18n";
import Axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { refreshList } from '../../actions/list';
import { useDispatch } from 'react-redux';

export default TotalSection = props => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    return (
        <AppView
            stretch row borderRadius={35} height={7} marginHorizontal={10}
            style={{ position: "absolute", bottom: moderateScale(5), left: 0, right: 0 }}
        >
            <AppView flex row stretch backgroundColor={colors.thirdly} paddingHorizontal={5} >
                <AppText color="#fff" >
                    {/* {I18n.t("total")} */}
                    {`${props.count} ${I18n.t('from')} ${props.unit ? props.unit.unitDetails.unit_name : ''}`}
                </AppText>
                <AppText color="#fff" marginHorizontal={2} >
                    {`(${props.price * props.count} ${I18n.t("sar")})`}
                </AppText>
            </AppView>
            <AppView
                onPress={() => {
                    // if (!props.unit) {
                    //     showInfo(I18n.t('cannotAddProduct'))
                    //     return
                    // }
                    if (props.token) {
                        setLoading(true)
                        const values = {
                            api_token: props.token,
                            productId: props.productId,
                            unitId: props.unit ? props.unit.unit_id : 0,
                            productQuantity: props.count,
                        }
                        Axios.post('addtocart', values)
                            .then((res) => {
                                setLoading(false);
                                showSuccess(res.data.message)
                                dispatch(refreshList(['refreshCartList']))
                            })
                            .catch((error) => {
                                setLoading(false);
                                if (!error.response) {
                                    showError(I18n.t("ui-networkConnectionError"));
                                } else {
                                    showError(I18n.t("ui-error-happened"));
                                }
                            });
                    }
                    else {
                        props.ifNoToken(false)
                    }
                }}
                flex row spaceBetween stretch backgroundColor={colors.primary} paddingHorizontal={5}
            >
                {loading ?
                    <ActivityIndicator />
                    :
                    <>
                        <AppText color="#fff" >
                            {I18n.t("addToCart")}
                        </AppText>
                        <AppIcon
                            name="left"
                            type="ant"
                            color="#fff"
                            reverse
                        />
                    </>
                }
            </AppView>

        </AppView>
    );
}
