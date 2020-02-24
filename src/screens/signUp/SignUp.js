import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "react-native-i18n";
import {
  AppView,
  AppButton,
  AppScrollView,
  AppInput,
  AppText,
  AppForm,
  AppIcon
} from "../../common";
import { AppHeader } from "../../components";
import { validationSchemaEGY } from "./validation";
import { signUp } from "../../actions/AuthActions";

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


  onSubmit = async (values, { setSubmitting }) => {
    this.props.signUp(values, setSubmitting);
  };

  renderFirstNameRefInput = injectFormProps => (
    <AppInput
      {...injectFormProps("firstName")}
      placeholder={I18n.t('The driver name')}
      marginBottom={5}
      borderRadius={7}
      ref={this.firstNameRef}
      nextInput={this.phoneRef}
      leftItems={<AppIcon name="user-o" type="font-awesome" />}
    />
  );

  renderEmailInput = injectFormProps => (
    <AppInput
      {...injectFormProps("email")}
      ref={this.emailRef}
      nextInput={this.passwordRef}
      email
      leftItems={<AppIcon name="email-open-outline" type="material-community" />}
      borderWidth={1}
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
      leftItems={<AppIcon name="lock" type="simple-line" />}
      ref={this.passwordRef}
      nextInput={this.confirmPasswordRef}
      borderWidth={1}
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
      borderWidth={1}
      leftItems={<AppIcon name="lock" type="simple-line" />}
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
          nextInput={this.emailRef}
          phone
          leftItems={<AppIcon name="phone" type="ant" flip size={8} />}
          borderWidth={1}
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
            {I18n.t("dont-have-an-account")}
          </AppText>
          <AppText marginTop={1} color="darkgrey" size={7} marginBottom={15}>
            {I18n.t("sign-up-hint")}
          </AppText>

          {this.renderFirstNameRefInput(injectFormProps)}
          {this.renderPhoneInput(injectFormProps)}
          {this.renderEmailInput(injectFormProps)}

          {this.renderPasswordInput({
            injectFormProps,
            setFieldValue,
            validateField
          })}
          {this.renderConfirmPassInput(injectFormProps, validateField)}

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
