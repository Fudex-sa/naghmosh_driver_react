import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, showError, AppSpinner, AppButton, showSuccess } from "../../../src/common";
import { AppHeader } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground, Modal } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import CartCard from '../../components/cart/CartCard';
import TotalSection from '../../components/productDetails/TotalSection'
import ProductInfo from '../../components/productDetails/ProductInfo';
import colors from '../../common/defaults/colors';
import ProductDetailsCard from '../../components/productDetails/ProductDetailsCard';
import ProductDetailsRepo from "../../repo/productDetails";
import { ApiErrorTypes } from "../../api/errors";
import { useSelector, useDispatch } from "react-redux";
import Axios from 'axios';
import { refreshList } from '../../actions/list';

export default ProductDetails = props => {
  const [isLodaingData, setIsLodaingData] = useState(true);
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const productRepo = new ProductDetailsRepo();
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
  const [isFavourite, setFavourite] = useState(props.product.isFavorite === 1 ? true : false);
  const [count, setcount] = useState();
  const [unit, setUnit] = useState();
  const [price, setPrice] = useState();

  const addToFavourite = (id) => {
    Axios.post('addtofav', { api_token: token, productId: id })
      .then((res) => {
        showSuccess(res.data.message)
        setFavourite(true)
        dispatch(refreshList(['refreshFavList', 'refreshProductList']))
      })
      .catch((error) => {
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
      });
  }
  const removeFromFavourite = (id) => {
    Axios.post('removefromfav', { api_token: token, productId: id })
      .then((res) => {
        showSuccess(res.data.message)
        setFavourite(false)
        dispatch(refreshList(['refreshFavList', 'refreshProductList']))
      })
      .catch((error) => {
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
      });
  }

  const _getProduct = async () => {
    if (!isLodaingData) setIsLodaingData(true);
    try {
      const productDetails = await productRepo.getProduct(props.product.product_id, token);
      setProduct(productDetails);
      setFavourite(productDetails.isFavorite)
      if (isLodaingData) setIsLodaingData(false);
    } catch (apiErrorException) {
      if (apiErrorException.type === ApiErrorTypes.CONNECTION_ERROR) {
        showError(I18n.t(apiErrorException.msg));
      } else if (apiErrorException.type !== ApiErrorTypes.CANCEL) {
        showError(I18n.t(apiErrorException.msg));
      }
    }
  };

  useEffect(() => {
    _getProduct();

    return () => {
      productRepo.cancelGetProducts();
    };
  }, []);

  const ApiRequest = {
    url: `relatedproducts?api_token=${token}&productId=${product.product_id}`,
    responseResolver: res => {
      return {
        data: res.data.data,
        // pageCount: res.data.products.last_page,
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
      <AppHeader title={isLodaingData ? "" : product.product_name} />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        {isLodaingData ?
          <AppView stretch center flex>
            <AppSpinner />
          </AppView>
          :
          <>
            <AppScrollView flex stretch paddingBottom={20} >
              <AppImage
                source={{ uri: product.main_photo_url }} borderRadius={15} stretch height={30} resizeMode="contain"
                marginTop={10} marginHorizontal={5} padding={2}
              >
                <AppIcon
                  onPress={() => {
                    if (token) {
                      if (isFavourite) { removeFromFavourite(product.product_id) }
                      else { addToFavourite(product.product_id) }
                    } else {
                      setVisibleModalLogin(true)
                    }
                  }}
                  name="Heart"
                  type="custom"
                  color={isFavourite ? colors.primaryAccent : "#fff"}
                  size={12}
                  style={{
                    position: "absolute",
                    top: moderateScale(5),
                    left: moderateScale(10),
                  }}
                />
              </AppImage>
              <ProductInfo product={product}
                onDoneCount={(count) => {
                  setcount(count)
                }}
                onDoneUnit={(price, unit) => {
                  setUnit(unit);
                  setPrice(price)
                }}
              />
              <AppView row stretch marginHorizontal={8} marginTop={5} >
                <AppIcon
                  name="md-cart"
                  type="ion"
                  color={colors.darkgrey}
                  size={8}
                />
                <AppText bold size={8} marginHorizontal={5} color={colors.darkgrey} >
                  {I18n.t("related-products")}
                </AppText>
              </AppView>
              <AppList
                stretch
                flex
                horizontal
                idPathInData={'product_id'}
                flatlist
                apiRequest={ApiRequest}
                rowRenderer={data => (
                  <ProductDetailsCard
                    data={data}
                    ifNoToken={(showModal) => { setVisibleModalLogin(true) }}
                  />
                )}
              />
            </AppScrollView>
            <TotalSection price={price} unit={unit} count={count} productId={product.product_id} token={token}
              ifNoToken={(showModal) => { setVisibleModalLogin(true) }} />
          </>
        }
        <Modal
          visible={visibleModalLogin}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setVisibleModalLogin(false)
          }}
        >
          <AppView flex stretch center backgroundColor='white' bottom style={{ opacity: 0.9, justifyContent: 'flex-end' }}>
            <AppText size={10} bold >{I18n.t('loginFirst')}</AppText>
            <AppView stretch row center>
              <AppButton
                title={I18n.t('login1')}
                backgroundColor="primary"
                width={30}
                touchableOpacity
                borderRadius={30}
                size={7}
                height={7}
                m={5}
                onPress={() => {
                  setVisibleModalLogin(false)
                  AppNavigation.push({ name: 'Login', passProps: { loginInApp: true } });
                }}
              />
              <AppButton
                title={I18n.t('cancel')}
                backgroundColor="primary"
                width={30}
                touchableOpacity
                borderRadius={30}
                size={7}
                height={7}
                m={5}
                onPress={() => {
                  setVisibleModalLogin(false)
                }}
              />
            </AppView>
          </AppView>
        </Modal>
      </ImageBackground>

    </AppView>
  );
}
