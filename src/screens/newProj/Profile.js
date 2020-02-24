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
  AppNavigation
} from "../../common";
import { AppHeader } from "../../components";

class Profile extends Component {
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
                <AppImage source={require('../../assets/imgs/cc.png')} flex stretch resizeMode={'contain'} />
              </AppView>
            </AppView>
          </AppView>
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
              stretch
              paddingHorizontal={0}
            />
          </AppView>
          <AppInput
            placeholder={I18n.t('The driver name')}
            marginBottom={5}
            marginHorizontal={7}
            borderRadius={7}
            leftItems={<AppIcon name="user-o" type="font-awesome" />}
          />
          <AppInput
            placeholder={I18n.t('signup-phone')}
            marginBottom={5}
            marginHorizontal={7}
            borderRadius={7}
            leftItems={<AppIcon name="phone" type="ant" flip size={8} />}
          />
          <AppInput
            placeholder={I18n.t("signup-email")}
            marginBottom={5}
            marginHorizontal={7}
            borderRadius={7}
            leftItems={
              <AppIcon name="email-open-outline" type="material-community" />
            }
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
        </AppScrollView>
      </AppView>
    );
  }
}

export default Profile;
