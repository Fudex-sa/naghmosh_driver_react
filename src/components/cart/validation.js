import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    couponName: yup.string().required(I18n.t("field-required")),
  });
