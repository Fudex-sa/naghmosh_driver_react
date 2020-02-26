import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    first_name: yup.string().required(I18n.t("field-required")).min(3,`${I18n.t("must-be-greater-than")} 3 ${I18n.t("chars")}`),
    last_name: yup.string().required(I18n.t("field-required")).min(3,`${I18n.t("must-be-greater-than")} 3 ${I18n.t("chars")}`),
    mobile: yup.string().required(I18n.t("field-required")).min(9,`${I18n.t("must-be-greater-than")} 9 ${I18n.t("nums")}`).max(12,`${I18n.t("must-be-smaller-than")} 12 ${I18n.t("nums")}`),
    email: yup.string().required(I18n.t("field-required")).email(I18n.t("email-invalid")),
    password: yup.string().required(I18n.t("field-required")).min(6,`${I18n.t("must-be-greater-than")} 6 ${I18n.t("chars")}`),
    password_confirmation: yup.string().required(I18n.t("field-required")).oneOf([values.password], I18n.t('confirmPassword-invalid')).min(6,`${I18n.t("must-be-greater-than")} 6 ${I18n.t("chars")}`),
  });
