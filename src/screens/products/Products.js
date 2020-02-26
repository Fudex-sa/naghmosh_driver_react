import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppSpinner, showError } from "../../../src/common";
import { AppHeader, CategoriesFilterOptions } from "../../../src/components";
import Images from '../../assets/imgs/index';
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import ProductCard from '../../components/products/ProductCard';
import CategoriesRepo from "../../repo/categories";
import { ApiErrorTypes } from "../../api/errors";
import { useSelector, useDispatch } from "react-redux";


export default Products = props => {
  const [selectedCategory, setSelectedCategory] = useState(props.category ? props.category : null)
  const [isLodaingData, setIsLodaingData] = useState(true);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const categoriesRepo = new CategoriesRepo();
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
  const refreshProductList = useSelector(state => state.list.refreshProductList)
  const _getCategories = async () => {
    if (!isLodaingData) setIsLodaingData(true);
    try {
      const allCategories = await categoriesRepo.getAllCategories();
      setCategories(allCategories);
      // setSelectedCategory(props.category ? props.category : allCategories[0])
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
    if (!categories.length) _getCategories();

    return () => {
      categoriesRepo.cancelGetAllCategories();
    };
  }, []);

  const ApiRequest = {
    url: props.url ? props.url : `productsfilter?api_token=${token}&categoriesIds=|${selectedCategory.id}|`,
    responseResolver: res => {
      if (res.data.products.length === 0) {
        return {
          data: res.data.products,
        }
      }
      else {
        return {
          data: res.data.products.data,
          pageCount: res.data.products.last_page,
          nextPage: res.data.products.current_page,
        }
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
      <AppHeader title={selectedCategory ? selectedCategory.name : I18n.t("products")} />
      <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
        {isLodaingData ?
          <AppView center stretch marginVertical={20} >
            <AppSpinner size={12} />
          </AppView>
          :
          <CategoriesFilterOptions
            categories={categories}
            initialValue={selectedCategory.id}
            selected={selectedCategory}
            onSelect={(item) => {
              const filtered = categories.filter(i => i.id === item)[0]
              setSelectedCategory(filtered)
            }
            }
          />
        }
        <AppList
          stretch
          flex
          paddingTop={10}
          rowHeight={90}
          flatlist
          apiRequest={ApiRequest}
          refreshControl={refreshProductList}
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
