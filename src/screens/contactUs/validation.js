import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = () =>
  yup.object().shape({
    contactEmail: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .email(I18n.t("signup-email-invalid")),

    contactMessage: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .min(3, I18n.t("contact-message")),
    contactName: yup
      .string()
      .required(I18n.t("signup-field-required"))
      .min(3, I18n.t("contact-name")),
    contactMobile: yup.string().required(I18n.t("signup-field-required"))
  });
