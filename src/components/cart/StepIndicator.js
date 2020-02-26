import React, { Component } from 'react';
import StepIndicator from 'react-native-step-indicator';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import store from '../../store/store';
const labelsAr = [
    "الطلب", "الدفع", "العنوان", "التسوق"
];
const labelsEn = [
    "Shopping", "Address", "Payment", "Order",
];


export default Stepper = props => {
    const rtl = store.getState().lang.rtl;
    const config = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#e54503',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#e54503',
        stepStrokeUnFinishedColor: '#f9c59c',
        separatorFinishedColor: '#e54503',
        separatorUnFinishedColor: '#e54503',
        stepIndicatorFinishedColor: '#e54503',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: '#e54503',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#f9c59c',
        labelColor: colors.primaryAccent,
        labelSize: 15,
        currentStepLabelColor: '#e54503',
    }

    return (
        <StepIndicator
            stepCount={4}
            customStyles={config}
            currentPosition={props.currentPosition}
            labels={rtl ? labelsAr : labelsEn}
            rtl={rtl}
            onPress={props.onPress}
        />
    )
}