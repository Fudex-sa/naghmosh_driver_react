import React from "react";
import { StyleSheet } from "react-native";
import OtpInput from "@twotalltotems/react-native-otp-input";
import { AppView } from ".";

export default props => {

  return (
    <AppView borderRadius={5} {...props}>
      <OtpInput
        code={props.code}
        onCodeChanged = {props.handleChange}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          props.onSumbit(code);
        }}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#1DAEE3"
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1
  },

  underlineStyleHighLighted: {
    borderColor: "#1DAEE3"
  }
});
