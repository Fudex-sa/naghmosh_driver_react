import * as yup from "yup";
import I18n from "react-native-i18n";

export const validationSchema = values =>
  yup.object().shape({
    cityId: yup.string().required(I18n.t("field-required")),
    mapLocation: yup.string().required(I18n.t("field-required")),
    clientNeighborhood: yup.string().required(I18n.t("field-required")),
    clientStreetName: yup.string().required(I18n.t("field-required")),
    clientHouseNumber: yup.string().required(I18n.t("field-required")),
  });
