import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { AppHeader } from "../../components";
import {
  AppView,
  AppIcon,
  AppText,
  AppScrollView,
  AppForm,
  AppButton,
  AppInput,
  AppTextArea,
  moderateScale,
  AppImage,
  showError,
  AppNavigation
} from "../../common";
import styles from "./styles";
import Api, {
  API_ENDPOINT,
  ACCESS_DATA,
  validateRequst
} from "../../utils/Network";

import { validationSchema } from "./validation";

const paypal = require("../../assets/imgs/paypal.png");

const ContactItem = props => {
  const { name, type, value, bold } = props;
  return (
    <AppView stretch row>
      <AppIcon color="darkgrey" {...{ name }} {...{ type }} />
      <AppText color="darkgrey" bold={bold} marginHorizontal={5}>
        {value}
      </AppText>
    </AppView>
  );
};
class ContactUs extends Component {
  onSubmit = async (values, { setSubmitting }) => {
    const val = { ...values };
    val.contactMobile = parseInt(values.contactMobile);
    console.log("**", val);

    try {
      const res = await Api.post(`addmessage`, val);
      const response = validateRequst(res);
      console.log("response -->>", response);

      if (response.isError) {
        setSubmitting(false);
        showError(response.data.message);
        return;
      }
      setSubmitting(false);

      AppNavigation.setStackRoot({
        rtl: this.props.rtl,
        sideMenu: "menu",
        name: "home"
      });
    } catch (error) {
      console.log("error", JSON.parse(JSON.stringify(error)));
      setSubmitting(false);
      if (!this.props.isConnected) {
        showError(I18n.t("no-internet-connection"));
      }
    }
  };

  renderForm = ({ injectFormProps, handleSubmit, isSubmitting }) => {
    const border = 5;
    const margin = 5;
    nameRef = React.createRef();
    emailRef = React.createRef();
    phoneRef = React.createRef();
    msgRef = React.createRef();

    return (
      <>
        <AppInput
          leftItems={
            <AppIcon name="user" type="font-awesome" color="darkgrey" />
          }
          marginTop={margin}
          ref={this.nameRef}
          nextInput={this.emailRef}
          {...injectFormProps("contactName")}
          placeholder={I18n.t("ur-name")}
          borderRadius={border}
          borderColor="inputBorderColor"
        />

        <AppInput
          marginTop={margin}
          ref={this.emailRef}
          nextInput={this.phoneRef}
          {...injectFormProps("contactEmail")}
          placeholder={I18n.t("email")}
          borderRadius={border}
          borderColor="inputBorderColor"
          leftItems={<AppIcon name="email" type="zocial" color="darkgrey" />}
        />

        <AppInput
          borderColor="inputBorderColor"
          marginTop={margin}
          ref={this.phoneRef}
          nextInput={this.msgRef}
          borderRadius={border}
          phone
          {...injectFormProps("contactMobile")}
          placeholder={I18n.t("phone")}
          leftItems={
            <AppIcon name="telephone" type="foundation" color="darkgrey" />
          }
        />
        <AppView stretch>
          <AppTextArea
            {...injectFormProps("contactMessage")}
            paddingHorizontal={8}
            placeholder={I18n.t("ur-msg")}
            borderRadius={border}
            marginTop={margin}
            borderWidth={0.5}
            ref={this.msgRef}
          />
          <AppIcon
            name="edit-3"
            type="feather"
            color="darkgrey"
            style={{
              position: "absolute",
              ...(!this.props.rtl
                ? { left: moderateScale(4) }
                : { right: moderateScale(4) }),
              top: moderateScale(10)
            }}
          />
        </AppView>
        <AppButton
          stretch
          marginVertical={5}
          title={I18n.t("send")}
          processing={isSubmitting}
          onPress={handleSubmit}
        />
      </>
    );
  };

  renderVisas = () => {
    const size = 3;
    const margin = 1;
    return (
      <AppView stretch row marginVertical={10}>
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={3}
        />
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={margin}
        />
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={margin}
        />
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={margin}
        />
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={margin}
        />
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={margin}
        />
        <AppImage
          height={size}
          width={2.5 * size}
          source={paypal}
          marginHorizontal={margin}
        />
      </AppView>
    );
  };

  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("contact-us")} />

        <AppScrollView stretch showsVerticalScrollIndicator={false}>
          <AppView stretch height={28}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.007016387588862472,
                longitudeDelta: 0.004741139709949493
              }}
            />
          </AppView>
          <AppView marginTop={5} stretch marginHorizontal={5}>
            <ContactItem
              name="home"
              type="font-awesome"
              value="السعوديه المنطقه الشرقيه"
            />
            <ContactItem
              bold
              name="telephone"
              type="foundation"
              value="+966 138241000"
            />
            <ContactItem
              name="clockcircleo"
              type="ant"
              value="الاحد - للجمعه | 8 صباحا - 8 مساء"
            />
            {this.renderVisas()}
            <AppForm
              schema={{
                ...ACCESS_DATA,
                clientId: this.props.currentUser.id,
                contactEmail: "",
                contactMessage: "",
                contactName: "",
                contactMobile: ""
              }}
              validationSchema={validationSchema}
              render={this.renderForm}
              onSubmit={this.onSubmit}
            />
          </AppView>
        </AppScrollView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(ContactUs);
