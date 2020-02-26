import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';

export default ProductInfo = props => {
  const product = props.product;
  const [count, setCount] = useState(1);
  const from = product.productUnits !== '-1' && product.productUnits.length > 1 ? (product.minUnitPrice).toFixed(2) : 0;
  const to = product.productUnits !== '-1' && product.productUnits.length > 1 ? (product.maxUnitPrice).toFixed(2) : 0;
  const priceFromProductUnits = product.productUnits !== '-1' && product.productUnits.length === 1 ? (product.finalUnitPrice).toFixed(2) : 0;
  const price = product.productUnits === '-1' ? (product.price).toFixed(2) : 0;
  const unitName = product.productUnits !== '-1' ? product.productUnits[0].unitDetails.unit_name : null;
  const maXUnitName = product.productUnits !== '-1' && product.productUnits.length > 1 ?
    product.productUnits[product.productUnits.length - 1].unitDetails.unit_name : null;
  const units = product.productUnits !== '-1' && product.productUnits.length > 1 ? product.productUnits : null;
  const offerPrice = product.productUnits !== '-1' ? product.productUnits[0].activeOffer.offer_price : null;
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(offerPrice ? offerPrice :
    (from ? from : (priceFromProductUnits > 0 ? priceFromProductUnits : price)));
  const [finalUnit, setFinalUnit] = useState(product.productUnits !== '-1' ? product.productUnits[0] : null);
  props.onDoneCount(count);
  props.onDoneUnit(finalPrice, finalUnit);

  const renderPrice = () => {
    return (
      <AppView stretch marginHorizontal={8} flex >
        <AppView stretch row flex style={{ flexWrap: "wrap", }}>
          <AppText bold size={7}>{`${I18n.t('price')} : `}</AppText>
          <AppText>
            {unitName && unitName}{maXUnitName && ' - ' + maXUnitName}
          </AppText>
          <AppText color={offerPrice ? null : colors.primary} marginHorizontal={5}
            style={{ textDecorationLine: offerPrice && 'line-through', textDecorationStyle: offerPrice && 'solid' }}
          >
            {from > 0 ? `${I18n.t('from')} ${from} ${I18n.t('to')} ${to} ${I18n.t("sar")}` : (priceFromProductUnits > 0 ? `${priceFromProductUnits} ${I18n.t("sar")}` : `${price} ${I18n.t("sar")}`)}
          </AppText>
          {offerPrice &&
            <AppText color={colors.primary} marginHorizontal={5}>{`${offerPrice} ${I18n.t("sar")}`}</AppText>
          }
          <AppText color={colors.primary}>
            - {product.product_status === "on" ? I18n.t("available") : I18n.t("not-available")}
          </AppText>
        </AppView>

        {units && <AppView stretch flex >
          <AppText size={7} bold>{`${I18n.t('unitPrice')} : `}</AppText>
          {units.map((item, index) => {
            const offer = item.activeOffer !== '-1' ? item.activeOffer : null;
            return (
              <AppView row stretch flex marginVertical={1}
                // borderWidth={selectedUnitPrice === index ? 2 : 0} borderColor={colors.primaryAccent}
                onPress={() => {
                  setSelectedUnitPrice(index)
                  setFinalPrice(offer ? offer.offer_price : item.price);
                  setFinalUnit(item);
                  props.onDoneUnit(offer ? offer.offer_price : item.price, item)
                }}
              >
                <AppText >{item.unitDetails.unit_name}</AppText>
                <AppText marginHorizontal={5} color={offer ? null : colors.primary}
                  style={{ textDecorationLine: offer && 'line-through', textDecorationStyle: offer && 'solid' }}
                >{`${item.price} ${I18n.t("sar")}  `}</AppText>
                {offer && <AppText color={colors.primary}>{`${offer.offer_price} ${I18n.t("sar")}`}</AppText>}
                {selectedUnitPrice === index &&
                  <AppIcon
                    name="check"
                    type="font-awesome5"
                    size={9}
                    color={colors.primaryAccent}
                  />
                }
              </AppView>
            )
          })}
        </AppView>}
      </AppView>
    )
  }
  const renderDescription = () => {
    return (
      <AppView stretch marginHorizontal={8}>
        <AppView row stretch marginVertical={5} >
          <AppIcon
            name="inf"
            type="custom"
          />
          <AppText bold size={8} marginHorizontal={5} >
            {I18n.t("product-desc")}
          </AppText>
        </AppView>
        <AppText marginBottom={5} >
          {product.product_description}
        </AppText>
      </AppView>
    )
  }
  const renderLocation = () => {
    return (
      <AppView stretch marginHorizontal={8}>
        <AppView row stretch marginVertical={3} >
          <AppIcon
            name="map-marker-alt"
            type="font-awesome5"
          />
          <AppText bold size={8} marginHorizontal={5} >
            {I18n.t("product-branches")}
          </AppText>
        </AppView>
        <AppView row stretch >
          <AppIcon
            name="map"
            type="material-community"
            color={colors.primaryAccent}
          />
          <AppText bold size={6} marginHorizontal={5} color={colors.primaryAccent} >
            عنوان الفرع هنا, المدينة , المملكة العربية السعودية
          </AppText>
        </AppView>
        <AppView row stretch >
          <AppIcon
            name="map"
            type="material-community"
            color={colors.grey}
          />
          <AppText bold size={6} marginHorizontal={5} color={colors.grey} >
            عنوان الفرع هنا, المدينة , المملكة العربية السعودية
          </AppText>
        </AppView>
      </AppView>
    )
  }
  return (
    <AppView flex stretch >
      <AppView width={95} stretch marginTop={8} marginBottom={2} >
        <AppView flex stretch spaceBetween row>
          <AppText bold size={8} numberOfLines={1}>{product.product_name}</AppText>
          <AppView row stretch >
            <AppIcon
              onPress={() => {
                setCount(count + 1)
                props.onDoneCount(count + 1)
              }}
              name="plus-circle"
              type="feather"
              size={12}
              color={colors.darkgrey}
            />
            <AppText color="#000" bold marginHorizontal={5} >
              {count}
            </AppText>
            <AppIcon
              onPress={() => {
                if (count === 0) return
                setCount(count - 1)
                props.onDoneCount(count + 1)
              }}

              name="minus-circle"
              type="feather"
              size={12}
              color={colors.darkgrey}
            />
          </AppView>
        </AppView>
      </AppView>
      {renderPrice()}
      {renderDescription()}
      {/* {renderLocation()} */}

    </AppView>
  );
}
