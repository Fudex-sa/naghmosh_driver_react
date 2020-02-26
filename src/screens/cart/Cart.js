import React, { useState, useEffect } from 'react';
import { View } from "react-native";
import { AppNavigation, AppView, AppText, AppImage, moderateScale, showInfo } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import CartCard from '../../components/cart/CartCard';
import StepIndicator from '../../components/cart/StepIndicator';
import Shopping from '../../components/cart/Shopping';
import CartAddresses from '../../components/cart/CartAddresses';
import CartPayment from '../../components/cart/CartPayment';
import OrderFinished from '../../components/cart/OrderFinished';

export default Cart = props => {
  const [price, setPrice] = useState({ price: 0, subPrice: 0, extraPrice: 0 });
  const [currentPosition, setCurrentPosition] = useState(0);
  const [addressID, setAddressID] = useState();

  return (
    <AppView flex stretch >
      <AppHeader title={I18n.t("cart")} hideBack hideCart />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        <View style={{ marginTop: moderateScale(10) }}>
          <StepIndicator
            onPress={(position) => { currentPosition > position ? setCurrentPosition(position) : null }}
            currentPosition={currentPosition}
          />
        </View>
        {currentPosition === 0 ?
          <Shopping onContinue={(price, sub, ex) => {
            setCurrentPosition(1)
            setPrice({ price: price, subPrice: sub, extraPrice: ex })
          }} />
          : currentPosition === 1 ?
            <CartAddresses
              price={price}
              onContinue={(deliveryValue) => {
                setPrice({ ...price, delivery: deliveryValue })
                setCurrentPosition(2)
              }}
              onSelectAddress={(id) => {
                setAddressID(id)
              }} />
            : currentPosition === 2 ?
              <CartPayment onContinue={() => { setCurrentPosition(3) }} price={price} addressID={addressID} />
              :
              <OrderFinished onContinue={() => { setCurrentPosition(0) }} />
        }

      </ImageBackground>
    </AppView>
  );
}
