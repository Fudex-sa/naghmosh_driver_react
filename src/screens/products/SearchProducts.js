import React, { useState } from 'react';
import { AppView, AppText, AppImage, AppList, AppSpinner, showError } from "../../common";
import { AppHeader, } from "../../components";
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import ProductCard from '../../components/products/ProductCard';

export default Products = props => {
  const [total, setTotal] = useState(0);
  const ApiRequest = {
    url: props.url,//`productsfilter?productName=${props.productName}`,
    responseResolver: res => {
      setTotal(res.data.products.total)
      return {
        data: res.data.products.data,
        pageCount: res.data.products.last_page,
      }
    },
    onError: error => {

      if (!error.response) {
        showError(I18n.t("ui-networkConnectionError"));
      } else {
        showError(I18n.t("ui-error-happened"));
      }

      return I18n.t("ui-networkConnectionError");
    }
  };


  return (
    <AppView flex stretch >
      <AppHeader title={props.productName ? props.productName : (props.orderBy == "recentlyArrived" ? I18n.t("most-recent-products") : I18n.t("most-seen-products"))} />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        {props.productName &&
          <AppText size={9} stretch center marginTop={5}>{`${I18n.t('searchResult')} : ${total}`}</AppText>}
        <AppList
          stretch
          flex
          paddingTop={10}
          rowHeight={90}
          flatlist
          apiRequest={ApiRequest}
          rowRenderer={data => (
            <ProductCard
              key={data.product_id}
              data={data}
            />
          )}
        />
      </ImageBackground>
    </AppView>
  );
}
