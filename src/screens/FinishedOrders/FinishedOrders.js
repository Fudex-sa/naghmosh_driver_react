import React, { Component } from "react";

import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  AppInput,
  AppButton,
  AppIcon
} from "../../common";

import { AppHeader } from "../../components";
import OrderCard from "./OrderCard";
import finished from "../../assets/imgs/finished.png";

class FinishedOrders extends Component {
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('Completed requests')} transparent />
        <AppScrollView stretch>
          <AppView
            stretch
            row
            height={12}
            margin={10}
            borderRadius={5}
          >
            <AppView
              stretch flex={2} center
              backgroundColor={'#E95B06'}
              paddingHorizontal={5}
            >
              <AppText color='white' size={8} >{`${'5'}`}</AppText>
              <AppText color='white' size={7} >{`${I18n.t('Total completed requests')}`}</AppText>

            </AppView>
            <AppView
              stretch flex={1} center row spaceBetween
              linearBackgroundGradient={{ colors: ['#E3000F', '#E95B06'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }}
            >
              <AppView stretch flex>
                <AppImage source={require('../../assets/imgs/finishedorders.png')} flex stretch resizeMode={'contain'} />
              </AppView>
            </AppView>
          </AppView>

          <OrderCard
            name="محمد عبد السلام"
            status="تم التسلسم"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={12}
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم الاسترجاع"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={7}
            notDeliver
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم التسلسم"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={8}
          />
          <OrderCard
            name="محمد عبد السلام"
            status="تم التسلسم"
            hint="تم الاستلام في 4 اكتوبر"
            orderNum={6}
          />
        </AppScrollView>
      </AppView>
    );
  }
}

export default FinishedOrders;
