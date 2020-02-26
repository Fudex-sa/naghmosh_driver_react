import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    mobile: yup.string().required(I18n.t("field-required")).min(9,`${I18n.t("must-be-greater-than")} 9 ${I18n.t("nums")}`).max(12,`${I18n.t("must-be-smaller-than")} 12 ${I18n.t("nums")}`),
    password: yup.string().required(I18n.t("field-required")),
  });
