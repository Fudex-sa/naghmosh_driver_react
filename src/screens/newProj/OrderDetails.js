import React, { Component } from "react";

import I18n from "react-native-i18n";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon,
  AppTabs,
  AppNavigation
} from "../../common";

import { AppHeader } from "../../components";
import HomeCard from "./HomeCard";
import profile from "../../assets/imgs/profile.png";
import styles from "./styles";

class Home extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title="تفاصيل الطلب" transparent />
        <AppScrollView stretch>
          <AppView stretch height={35}>
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
          <AppView stretch flex paddingTop={10}>
            <Row label="رقم الطلب" value={34} marginBottom={10} />
            <RowDetails
              labelHeader="بيانات الطلب"
              data={[
                { label: "الاسم", value: "محمد امير" },
                { label: "العنوان", value: "الدمام - شارع الخيزارن" },
                { label: "رقم الهاتف", value: "01212002733" },
                { label: "طريقه الدفع", value: "كاش" }
              ]}
            />
            <Row label="المبلغ المطلوب" value={111} real />
          </AppView>
          <AppView spaceBetween stretch row paddingHorizontal={7}>
            <AppButton
              title="تسليم الطلب"
              flex
              stretch
              height={7}
              backgroundColor="#23A636"
              onPress={() => {
                AppNavigation.push("FollowOrder");
              }}
            />
            <AppView width={5} />
            <AppButton
              title="رفض الطلب"
              flex
              stretch
              height={7}
              backgroundColor="#E3000F"
            />
          </AppView>
        </AppScrollView>
      </AppView>
    );
  }
}

const Row = props => (
  <AppView
    stretch
    height={7}
    elevation={1}
    marginHorizontal={7}
    row
    spaceBetween
    centerY
    borderRadius={7}
    marginBottom={10}
    paddingHorizontal={7}
    {...props.rest}
  >
    <AppText bold> {props.label}</AppText>
    <AppView stretch row>
      <AppText color="foreground">{props.value}</AppText>
      {props.real && <AppText>ريال </AppText>}
    </AppView>
  </AppView>
);

const RowDetails = props => (
  <AppView
    stretch
    elevation={1}
    marginHorizontal={7}
    spaceBetween
    centerY
    borderRadius={7}
    paddingHorizontal={7}
    marginBottom={10}
    {...props.rest}
  >
    <AppText bold marginVertical={5} color="#4C4C4C">
      {props.labelHeader}
    </AppText>
    {props.data.map(item => (
      <AppView stretch row spaceBetween paddingBottom={5}>
        <AppText color="#C9C9C9"> {item.label}</AppText>

        <AppText color="#C9C9C9"> {item.value}</AppText>
      </AppView>
    ))}
  </AppView>
);

export default Home;
