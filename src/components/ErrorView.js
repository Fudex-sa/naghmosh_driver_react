import React from "react";
import { AppView, AppText, AppButton } from "../common";
import I18n from "react-native-i18n";

export default props => {
  const { error, onRetry } = props;
  return (
    <AppView flex stretch center height={50}>
      <AppText size={6}>{error}</AppText>
      <AppButton
        margin={5}
        width={40}
        title={I18n.t("retry")}
        onPress={onRetry}
      />
    </AppView>
  );
};
