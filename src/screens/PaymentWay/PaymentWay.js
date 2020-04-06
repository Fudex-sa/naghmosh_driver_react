import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon, showInfo } from "../../common";
import I18n from "react-native-i18n";
import { AppHeader } from "../../components";
import colors from '../../common/defaults/colors';

export default PaymentWay = props => {
    const [PaymentWay, setPaymentWay] = useState(null);
    return (
        <AppView flex stretch>
            <AppHeader title={I18n.t('Receive money')} hideCart />
            <AppText stretch center size={8} bold marginTop={5} >{I18n.t('selectPaymentWay')}</AppText>
            <AppView
                linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
                stretch row height={6.5} spaceBetween borderWidth={1} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}
            >
                <AppText bold marginHorizontal={5} size={8} color='white' stretch>
                    {I18n.t('Cash')}
                 </AppText>
                <AppIcon
                    name={PaymentWay === 'cash' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={PaymentWay === 'cash' ? 'white' : colors.darkgrey}
                    size={10}
                    onPress={() => {
                        setPaymentWay('cash')
                    }}
                />
            </AppView>
            <AppView
                linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
                stretch row height={6.5} spaceBetween borderWidth={1} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}>
                <AppText bold marginHorizontal={5} size={8} color='white' stretch>
                    {I18n.t('Mada card')}
                </AppText>
                <AppIcon
                    name={PaymentWay === 'mada' ? "check-box" : 'check-box-outline-blank'}
                    type="material"
                    color={PaymentWay === 'mada' ? 'white' : colors.darkgrey}
                    size={10}
                    onPress={() => {
                        setPaymentWay('mada')
                    }}
                />
            </AppView>
            <AppView style={{ position: 'absolute', bottom: 15, left: 0, right: 0 }}
                linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
                stretch height={6.5} borderWidth={1} borderColor={colors.darkgrey}
                centerY paddingHorizontal={10} marginHorizontal={7} marginVertical={5} borderRadius={7}
                onPress={() => { if (PaymentWay) { props.onDone(PaymentWay), AppNavigation.pop() } else showInfo(I18n.t('choosePaymentWay')) }}
            >
                <AppText bold center size={8} color='white' stretch>
                    {I18n.t('done')}
                </AppText>
            </AppView>
        </AppView >
    );
}
