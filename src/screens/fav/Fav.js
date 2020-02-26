import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, showError, AppButton } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import FavCard from '../../components/fav/FavCard';
import I18n from "react-native-i18n";
import { useSelector } from 'react-redux';

export default Fav = props => {
  const [noFavourite, setNoFavourite] = useState();
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
  const refresh = useSelector(state => state.list.refreshFavList)
  const ApiRequest = {
    url: `favorites?api_token=${token}`,
    responseResolver: response => {
      if (response.data.wishlist_count === 0) {
        setNoFavourite(response.data.message)
      }
      return {
        data: response.data.wishlist_count > 0 ? response.data.wishlist.data : [],
        pageCount: response.data.wishlist.last_page,
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
      <AppHeader title={I18n.t("fav")} hideBack hideCart />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        {token ? <AppList
          stretch
          flex
          flatlist
          columns={3}
          noResultsLabel={noFavourite}
          apiRequest={ApiRequest}
          refreshControl={refresh}
          idPathInData={'fav_product_id'}
          paddingTop={10}
          rowRenderer={data => (
            <FavCard
              data={data}
            />
          )}
        />
          :
          <AppView flex stretch center>
            <AppText size={8} >{I18n.t('loginFirst')}</AppText>
            <AppButton
              title={I18n.t('login1')}
              backgroundColor="primary"
              width={30}
              touchableOpacity
              borderRadius={30}
              size={7}
              height={7}
              mv={5}
              onPress={() => {
                AppNavigation.push({ name: 'Login', passProps: { loginInApp: true } });
              }}
            />
          </AppView>
        }
      </ImageBackground>
    </AppView>
  );
}
