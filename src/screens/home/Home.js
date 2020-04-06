import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon, showError } from "../../common";
import I18n from "react-native-i18n";
import splashScreen from "react-native-splash-screen";
import HomeCard from './HomeCard'
import { AppHeader } from '../../components';
import PushNotification from 'react-native-push-notification';
// import RNPaytabsLibrary from '@paytabscom/react-native-paytabs-library';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { refreshList } from '../../actions/list';

export default Home = props => {
  const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
  const lang = useSelector(state => state.lang.lang);
  const refresh = useSelector(state => state.list.homeNotifCount);
  const [notifCount, setNotifCount] = useState(0);
  const dispatch = useDispatch();
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("noti", notification);
      if (notification.userInteraction === true) {
        readNotifications(notification.notificationId)
        AppNavigation.push({ name: "OrderDetails", passProps: { orderID: notification.click_action } });
      }
      else if (notification.foreground === false) {
        readNotifications(notification.notificationId)
        AppNavigation.push({ name: "OrderDetails", passProps: { orderID: notification.click_action } });
      }
    },
    // ANDROID: GCM or FCM Sender ID
    senderID: '56743868961',
    popInitialNotification: true,
    requestPermissions: true,
  });
  const readNotifications = (id) => {
    Axios.post('driver/notifications/single/to_read',
      {
        api_token: user.api_token, notificationId: id,
      })
      .then((res) => {
        dispatch(refreshList('homeNotifCount'))
      })
      .catch((error) => {
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
      });
  }

  useEffect(() => {
    Axios.get(`driver/notifications/unread?api_token=${user.api_token}`)
      .then((res) => {
        setNotifCount(res.data.unread_notifications)
      }).catch((error) => {
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
        return I18n.t("ui-networkConnectionError");
      })
  }
    , [refresh]);

  // const onPressPay = () => {
  //   RNPaytabsLibrary.start({
  //     [RNPaytabsLibrary.merchant_email]: "a.hassan19995@gmail.com",
  //     [RNPaytabsLibrary.secret_key]: "J8dghyy0GR6KKs5WMxYfUifsfBgaPiKyqYPIwnIdfPXZh3V3AUjvdyXsadDZwnyXmnFTLo60d40u7WyIRRd4qbxAoaAVy8SUvyNg",// Add your Secret Key Here
  //     [RNPaytabsLibrary.transaction_title]: I18n.t('payToNaghmosh'),
  //     [RNPaytabsLibrary.amount]: "2.0",
  //     [RNPaytabsLibrary.currency_code]: "USD",
  //     [RNPaytabsLibrary.customer_email]: user.email,
  //     [RNPaytabsLibrary.customer_phone_number]: user.mobile,
  //     [RNPaytabsLibrary.order_id]: "1234567",
  //     [RNPaytabsLibrary.product_name]: "Tomato",
  //     [RNPaytabsLibrary.timeout_in_seconds]: "300", //Optional
  //     [RNPaytabsLibrary.address_billing]: "test test",
  //     [RNPaytabsLibrary.city_billing]: "Juffair",
  //     [RNPaytabsLibrary.state_billing]: "Manama",
  //     [RNPaytabsLibrary.country_billing]: "BHR",
  //     [RNPaytabsLibrary.postal_code_billing]: "00973", //Put Country Phone code if Postal code not available '00973'//
  //     [RNPaytabsLibrary.address_shipping]: "test test",
  //     [RNPaytabsLibrary.city_shipping]: "Juffair",
  //     [RNPaytabsLibrary.state_shipping]: "Manama",
  //     [RNPaytabsLibrary.country_shipping]: "BHR",
  //     [RNPaytabsLibrary.postal_code_shipping]: "00973", //Put Country Phone code if Postal
  //     [RNPaytabsLibrary.color]: colors.primary,
  //     [RNPaytabsLibrary.language]: lang, // 'en', 'ar'
  //     [RNPaytabsLibrary.tokenization]: true,
  //     [RNPaytabsLibrary.preauth]: false
  //   }, (response) => {
  //     // Callback for success & fail.

  //     // { pt_token_customer_email: '',pt_token: '',pt_token_customer_password: '', pt_transaction_id: '123456',pt_response_code: '100' }

  //     RNPaytabsLibrary.log("on Response Payment");
  //     console.log(response);
  //     // Response Code: 100 successful otherwise fail
  //     if (response.pt_response_code == '100')
  //       RNPaytabsLibrary.log("Transaction Id: " + response.pt_transaction_id);
  //     else
  //       RNPaytabsLibrary.log("Otherwise Response: " + response.pt_response_code);

  //     this.state = { message: response.pt_transaction_id };

  //     // Tokenization
  //     //RNPaytabs.log(response.pt_token_customer_email);
  //     //RNPaytabs.log(response.pt_token_customer_password);
  //     //RNPaytabs.log(response.pt_token);

  //   });
  // }

  return (
    <AppView flex stretch>
      <AppHeader title={I18n.t('home')} transparent hideBack />
      <AppScrollView paddingTop={10} stretch>
        <HomeCard
          source={require('../../assets/imgs/person.png')}
          label={I18n.t('personalPage')}
          hint={I18n.t('personalPageDetalis')}
          onPress={() => {
            AppNavigation.push("Profile");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/service.png')}
          label={I18n.t('notifications')}
          hint={I18n.t('notificationsDetalis')}
          notification
          notifCount={notifCount}
          onPress={() => {
            AppNavigation.push("Notifications");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/current.png')}
          label={I18n.t('Delivery requests')}
          hint={I18n.t('DeliveryDetails')}
          onPress={() => {
            AppNavigation.push("DeliverOrder");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/finished.png')}
          label={I18n.t('Completed requests')}
          hint={I18n.t('CompletedDetails')}
          onPress={() => {
            AppNavigation.push("FinishedOrders");
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/settings.png')}
          label={I18n.t('Settings')}
          hint={I18n.t('SettingsDetalis')}
          onPress={() => {
            AppNavigation.push("Settings")
          }}
        />
        <HomeCard
          source={require('../../assets/imgs/information.png')}
          label={I18n.t('informations')}
          hint={I18n.t('informationsDetails')}
          onPress={() => {
            AppNavigation.push("Informations");
          }}
        />
        {/* <HomeCard
          source={require('../../assets/imgs/information.png')}
          label={'pay now'}
          hint={'pay now'}
          onPress={() => {
            onPressPay()
          }}
        /> */}
      </AppScrollView>
    </AppView>

  );
}
