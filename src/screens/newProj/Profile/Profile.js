import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon,
  AppNavigation,
  AppForm
} from "../../../common";
import { AppHeader } from "../../../components";
import { validationSchema } from "./validation";

class Profile extends Component {

  onSubmit = async (values, { setSubmitting }) => {
    // this.props.signIn(values, setSubmitting);
    // AppNavigation.setStackRoot("homeScreen");
  };

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue
  }) => {
    return (
      <AppView flex stretch >
        <AppView
          row
          stretch
          spaceBetween
          paddingHorizontal={7}
          marginBottom={10}
        >
          <AppText>{I18n.t('Personal account information')}</AppText>

          <AppButton
            title={I18n.t('save')}
            color="primary"
            transparent
            processing={isSubmitting}
            onPress={handleSubmit}
            stretch
            paddingHorizontal={0}
          />
        </AppView>
        <AppInput
          label={I18n.t('The driver name')}
          {...injectFormProps("name")}
          marginBottom={5}
          marginHorizontal={7}
          borderRadius={7}
          leftItems={<AppIcon name="user-o" type="font-awesome" />}
        />
        <AppInput
          label={I18n.t('signup-phone')}
          {...injectFormProps("mobile")}
          marginBottom={5}
          marginHorizontal={7}
          phone
          borderRadius={7}
          leftItems={<AppIcon name="phone" type="ant" flip size={8} />}
        />
        <AppInput
          label={I18n.t("signup-email")}
          {...injectFormProps("email")}
          email
          borderRadius={5}
          marginHorizontal={7}
          leftItems={<AppIcon name="email-open-outline" type="material-community" />}
        />
        <AppView
          stretch borderWidth={1.5} borderColor={'#E95B06'} padding={5}
          row
          spaceBetween borderRadius={7}
          marginHorizontal={7}
          marginTop={15}
          onPress={() => { AppNavigation.push('ChangePassword') }}
        >
          <AppText>{I18n.t('change-password')}</AppText>
          <AppIcon name="ios-arrow-forward" type="ion" flip color="grey" />
        </AppView>
      </AppView>)
  }
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('personalPage')} transparent />
        <AppScrollView stretch>
          <AppView
            stretch
            row
            height={12}
            margin={10}
            borderRadius={5}
          >
            <AppView
              stretch flex={1} center
              backgroundColor={'#E95B06'}
              paddingHorizontal={5}
            >
              <AppText color='white' size={7} >
                {`${'1,235'}`}
                <AppText size={6} color='white'>{`  ${I18n.t('sar')}`}</AppText>
              </AppText>
              <AppText color='white' size={5} >{`${I18n.t('Applications received')}`}</AppText>

            </AppView>
            <AppView
              stretch flex={2} center row spaceBetween
              linearBackgroundGradient={{ colors: ['#E3000F', '#E95B06'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }}
            >
              <AppView stretch flex center>
                <AppText color='white' size={7} >
                  {`${'1,235'}`}
                  <AppText size={6} color='white'>{`  ${I18n.t('sar')}`}</AppText>
                </AppText>
                <AppText color='white' size={5} >{`${I18n.t('Driver credit')}`}</AppText>
              </AppView>
              <AppView stretch flex>
                <AppImage source={require('../../../assets/imgs/cc.png')} flex stretch resizeMode={'contain'} />
              </AppView>
            </AppView>
          </AppView>
          <AppForm
            schema={{
              name: "",
              email: "",
              mobile: "",
            }}
            validationSchema={validationSchema}
            render={this.renderForm}
            onSubmit={this.onSubmit}
          />
        </AppScrollView>
      </AppView>
    );
  }
}

export default Profile;
