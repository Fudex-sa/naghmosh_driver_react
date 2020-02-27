import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    password: yup.string().required(I18n.t("field-required")).min(6, `${I18n.t("must-be-greater-than")} 6 ${I18n.t("chars")}`),
    password_confirmation: yup.string().required(I18n.t("field-required")).oneOf([values.password], I18n.t('confirmPassword-invalid')).min(6, `${I18n.t("must-be-greater-than")} 6 ${I18n.t("chars")}`),
  });
