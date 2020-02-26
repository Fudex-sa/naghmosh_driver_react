import React, { useState, useEffect } from 'react';
import { AppView, AppText, AppIcon, moderateScale, AppScrollView, AppForm, AppInput, AppButton, AppTextArea, showSuccess, AppNavigation, showError } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import { ImageBackground, ActivityIndicator } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import Map from '../../components/contactUs/Map';
import { validationSchema } from './validation';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

export default ContactUs = props => {
  const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
  const [loading, setLoading] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [company, setCompany] = useState(null);
  const [coordinates, setCoordinates] = useState(null)

  const onSubmit = (values, { setSubmitting }) => {
    setLoading(true)
    Axios.post('addmessage', values)
      .then(async (res) => {
        showSuccess(res.data.message)
        setLoading(false)
        AppNavigation.pop();
      })
      .catch((error) => {
        setLoading(false)
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
      });
  }

  const renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue
  }) => {
    return (
      <AppView flex stretch marginTop={5} >
        <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("contactName")}</AppText>
        <AppInput
          {...injectFormProps("contactName")}
          placeholder={I18n.t("contactName")}
          height={7}
          size={7}
          paddingHorizontal={10}
          borderRadius={70}
        />
        <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("contactEmail")}</AppText>
        <AppInput
          {...injectFormProps("contactEmail")}
          placeholder={I18n.t("contactEmail")}
          height={7}
          size={7}
          email
          paddingHorizontal={10}
          borderRadius={70}
        />
        <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("contactMobile")}</AppText>
        <AppInput
          {...injectFormProps("contactMobile")}
          placeholder={I18n.t("contactMobile")}
          height={7}
          size={7}
          phone
          paddingHorizontal={10}
          borderRadius={70}
        />
        <AppText color="#000" bold marginHorizontal={5} marginBottom={5} >{I18n.t("contactMessage")}</AppText>
        <AppTextArea
          {...injectFormProps("contactMessage")}
          placeholder={I18n.t("contactMessage")}
          // height={7}
          // maxLength={50000}
          size={7}
          paddingHorizontal={10}
          bw={0}
          borderRadius={30}
        />
        <AppButton
          title={I18n.t("send")}
          stretch
          bottom
          size={7}
          borderRadius={25}
          marginTop={10}
          height={7}
          onPress={handleSubmit}
          center
          processing={loading}
        />
      </AppView>
    );
  }
  const renderRow = (iconName, iconType, title) => {
    return (
      <AppView row stretch marginBottom={3} >
        <AppIcon
          name={iconName}
          type={iconType}
          color={colors.darkgrey}
          size={8}
        />
        <AppText size={7} color={colors.darkgrey} marginHorizontal={5} >
          {title}
        </AppText>
      </AppView>
    )
  }

  useEffect(() => {
    setLoadingCompany(true)
    Axios.get(`getsettings`)
      .then((res) => {
        setCompany(res.data.data)
        let coordinate = res.data.data.site_map_coordinates.split(',')
        setCoordinates({ latitude: parseFloat(coordinate[0]), longitude: parseFloat(coordinate[1]) })
        setLoadingCompany(false)
      }).catch((error) => {
        setLoadingCompany(false)
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
        return I18n.t("ui-networkConnectionError");
      })
  }
    , []);

  return (
    <AppView flex stretch >
      <AppHeader title={I18n.t("contact-us")} hideCart/>
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        {!company || loadingCompany ?
          <AppView flex stretch center>
            <ActivityIndicator />
          </AppView>
          :
          <AppScrollView flex stretch paddingBottom={20} paddingHorizontal={8} >
            <Map coordinates={coordinates} />
            <AppView stretch marginBottom={5}>
              <AppText bold >
                {I18n.t("contact-us")}
              </AppText>
            </AppView>
            <AppText color="#000" stretch bold marginHorizontal={5} size={7} marginBottom={5} >{company.site_name}</AppText>
            {renderRow("maps", "custom", company.site_address)}
            {renderRow("ios-call", "ion", company.site_mobile)}
            {renderRow("ios-call", "ion", company.site_mobile2)}
            {renderRow("md-mail", "ion", company.site_email)}
            <AppForm
              schema={{
                contactName: user ? user.user_name : "",
                contactEmail: user ? user.email : "",
                contactMobile: user ? user.mobile : "",
                contactMessage: "",
              }}
              validationSchema={validationSchema}
              render={renderForm}
              onSubmit={onSubmit}
            />
          </AppScrollView>
        }
      </ImageBackground>
    </AppView>
  );
}
