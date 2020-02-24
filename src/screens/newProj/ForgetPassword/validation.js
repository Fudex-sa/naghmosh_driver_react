import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    email: yup.string().required(I18n.t("field-required")).email(I18n.t("email-invalid")),
  });
