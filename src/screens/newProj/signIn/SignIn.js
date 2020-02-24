import React, { Component } from "react";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppText,
  AppInput,
  AppScrollView,
  AppButton,
  AppForm,
  AppNavigation,
  AppImage,
  AppIcon
} from "../../../common";
import Colors from "../../../common/defaults/colors";

import { validationSchema } from "./validation";
import { signIn } from "../../../actions/AuthActions";
import logo from "../../../assets/imgs/login.png";

class SiginIn extends Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
  }

  onSubmit = async (values, { setSubmitting }) => {
    this.props.signIn(values, setSubmitting);
    // AppNavigation.setStackRoot("homeScreen");
  };

  renderForm = ({ injectFormProps, handleSubmit, isSubmitting }) => (
    <AppView stretch marginTop={12} marginBottom={10}>
      <AppInput
        label={I18n.t("signup-email")}
        {...injectFormProps("email")}
        email
        ref={this.email}
        borderRadius={5}
        nextInput={this.password}
        borderBottomWidth={1}
        leftItems={<AppIcon name="email-open-outline" type="material-community" />}
      />
      <AppInput
        label={I18n.t("signup-password")}
        secure
        showSecureEye
        ref={this.password}
        {...injectFormProps("password")}
        borderBottomWidth={1}
        leftItems={<AppIcon name="lock" type="simple-line" />}
      />
      <AppButton
        paddingVertical={1}
        paddingHorizontal={0}
        marginBottom={1}
        transparent
        onPress={() => {
          AppNavigation.push({
            name: "ForgetPassword"
          });
        }}
        title={I18n.t("forget-password")}
        size={5}
      />

      <AppButton
        marginTop={20}
        stretch
        borderRadius={7}
        processing={isSubmitting}
        onPress={handleSubmit}
        title={I18n.t("login")}
        backgroundColor="#23A636"
      />
      <AppView stretch marginTop={10} center>
        <AppText> {I18n.t('Not a registered member?')}</AppText>
        <AppButton
          paddingVertical={1}
          paddingHorizontal={0}
          marginBottom={1}
          transparent
          color={'#E3000F'}
          onPress={() => {
            AppNavigation.push({
              name: "signUp"
            });
          }}
          title={I18n.t("dont-have-an-account")}
          size={5}
        />
      </AppView>
    </AppView>
  );

  render() {
    return (
      <SafeAreaView style={{ alignSelf: "stretch", flex: 1 }}>
        <AppScrollView
          flex
          stretch
          center
          paddingTop={10}
          paddingHorizontal={5}
          flexGrow
        >
          <AppView stretch centerX marginTop={20}>
            <AppImage source={logo} equalSize={50} />
          </AppView>

          <AppForm
            schema={{
              email: "",
              password: ""
            }}
            validationSchema={validationSchema}
            render={this.renderForm}
            onSubmit={this.onSubmit}
          />

          <AppView flex />
        </AppScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  // loadingOverlay: state.loadingOverlay.socialSignin
});

export default connect(mapStateToProps, { signIn })(SiginIn);
