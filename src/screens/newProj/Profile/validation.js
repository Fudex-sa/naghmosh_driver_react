import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    name: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .min(3, I18n.t("field-must-be-larger-than-one-chars")),
    email: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .email(I18n.t("signup-email-invalid")),

    mobile: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .matches(
        /^^0?1([0-2]|5){1}[0-9]{8}$/,
        I18n.t("signup-invalid-phone-error")
      )
  });

