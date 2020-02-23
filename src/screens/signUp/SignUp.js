import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "react-native-i18n";
import Navigation from "react-native-navigation";
import {
  AppView,
  AppButton,
  AppScrollView,
  AppInput,
  AppText,
  AppForm,
  AppPicker,
  AppNavigation,
  AppFormLocation,
  AppImage
} from "../../common";
import { AppHeader } from "../../components";
import { validationSchemaSAUDIA, validationSchemaEGY } from "./validation";
import { showError } from "../../common/utils/localNotifications";
import { signUp } from "../../actions/AuthActions";
import colors from "../../common/defaults/colors";
import { ACCESS_DATA } from "../../utils/Network";
// import logo from "../../assets/imgs/logo.png";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  state = {
    dialCode: "",
    selectedCountryId: null
  };

  componentDidMount() {
    // AppNavigation.disableMenu();
  }

  onSubmit = async (values, { setSubmitting }) => {
    this.props.signUp(values, setSubmitting);
  };

  renderFirstNameRefInput = injectFormProps => (
    <AppInput
      {...injectFormProps("firstName")}
      ref={this.firstNameRef}
      nextInput={this.lastNameRef}
      borderBottomWidth={1}
      borderRadius={5}
      label={I18n.t("signup-firstName")}
      noBorder
    />
  );

  renderLastNameRefInput = injectFormProps => (
    <AppInput
      {...injectFormProps("lastName")}
      ref={this.lastNameRef}
      nextInput={this.emailRef}
      borderBottomWidth={1}
      borderRadius={5}
      label={I18n.t("signup-lastName")}
      noBorder
    />
  );

  renderEmailInput = injectFormProps => (
    <AppInput
      {...injectFormProps("email")}
      ref={this.emailRef}
      nextInput={this.passwordRef}
      email
      borderBottomWidth={1}
      borderRadius={5}
      label={I18n.t("signup-email")}
      noBorder
    />
  );

  renderPasswordInput = ({ injectFormProps, setFieldValue, validateField }) => (
    <AppInput
      {...injectFormProps("password")}
      onChange={(n, v) => {
        setFieldValue(n, v);
        validateField(n);
        if (
          this.confirmPasswordRef.current.getTouchedStatus() &&
          this.confirmPasswordRef.current.getText() !== ""
        )
          validateField("passwordConfirmation");
      }}
      secure
      showSecureEye
      ref={this.passwordRef}
      nextInput={this.confirmPasswordRef}
      borderBottomWidth={1}
      borderRadius={5}
      label={I18n.t("signup-password")}
      noBorder
    />
  );

  renderConfirmPassInput = injectFormProps => (
    <AppInput
      {...injectFormProps("passwordConfirmation")}
      secure
      showSecureEye
      ref={this.confirmPasswordRef}
      nextInput={this.phoneRef}
      borderBottomWidth={1}
      borderRadius={5}
      label={I18n.t("signup-confirmPassword")}
      noBorder
    />
  );

  renderPhoneInput = injectFormProps => (
    <AppView row spaceBetween>
      <AppView flex={2}>
        <AppInput
          {...injectFormProps("mobile")}
          ref={this.phoneRef}
          phone
          borderBottomWidth={1}
          borderRadius={5}
          label={I18n.t("signup-phone")}
          noBorder
        />
      </AppView>
    </AppView>
  );

  renderSubmitButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t("sign-up-create-account")}
      stretch
      height={7}
      onPress={handleSubmit}
      processing={isSubmitting}
      marginTop={15}
    />
  );

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    validateField
  }) => (
    <AppScrollView flex stretch paddingBottom={10}>
      {/* <AppView stretch centerX marginTop={20}>
        <AppImage source={logo} equalSize={50} />
      </AppView> */}
      <AppView
        flex
        center
        stretch
        paddingHorizontal={5}
        borderTopWidth={1}
        borderTopColor="grey"
      >
        <AppText marginTop={10} bold size={8} color="darkgrey">
          {I18n.t("sign-up-new-account")}
        </AppText>
        <AppText marginTop={1} color="darkgrey">
          {I18n.t("sign-up-hint")}
        </AppText>

        {this.renderFirstNameRefInput(injectFormProps)}
        {this.renderLastNameRefInput(injectFormProps)}
        {this.renderEmailInput(injectFormProps)}
        {this.renderPasswordInput({
          injectFormProps,
          setFieldValue,
          validateField
        })}
        {this.renderConfirmPassInput(injectFormProps, validateField)}

        {this.renderPhoneInput(injectFormProps)}
        {this.renderSubmitButton(isSubmitting, handleSubmit)}
      </AppView>
    </AppScrollView>
  );

  render() {
    const { connected } = this.props;
    if (!connected) {
      return (
        <AppView flex stretch>
          <AppHeader title={I18n.t("sign-up-new-account")} />
        </AppView>
      );
    }

    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("sign-up-new-account")} showCart={false} />

        <AppForm
          schema={{
            ...ACCESS_DATA,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",

            mobile: ""
          }}
          validationSchema={validationSchemaEGY}
          render={this.renderForm}
          onSubmit={this.onSubmit}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected
  // loadingOverlay: state.loadingOverlay.socialSignin
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
