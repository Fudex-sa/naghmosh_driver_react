import React, { useState, useEffect } from 'react';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon, moderateScale, AppSpinner, showError } from "../../../src/common";
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import ProductsRepo from "../../repo/products";
import { ApiErrorTypes } from "../../api/errors";
import { useSelector, useDispatch } from "react-redux";

export default Products = props => {

    const [isLodaingData, setIsLodaingData] = useState(true);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const productsRepo = new ProductsRepo();
    const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
    const _getProducts = async () => {
        if (!isLodaingData) setIsLodaingData(true);
        try {
            const products = await productsRepo.getProducts(props.orderBy, token);
            setProducts(products);
            if (isLodaingData) setIsLodaingData(false);
        } catch (apiErrorException) {
            if (apiErrorException.type === ApiErrorTypes.CONNECTION_ERROR) {
                showError(I18n.t(apiErrorException.msg));
            } else if (apiErrorException.type !== ApiErrorTypes.CANCEL) {
                showError(I18n.t(apiErrorException.msg));
            }
        }
    };
    const refreshProductList = useSelector(state => state.list.refreshProductList)
    useEffect(() => {
        if (!products.length) _getProducts();

        return () => {
            productsRepo.cancelGetProducts();
        };
    }, []);

    const renderProduct = (item) => {
        return (
            <AppView
                key={item.product_id}
                onPress={() => AppNavigation.push({
                    name: 'productDetails',
                    passProps: { product: item }
                })}
                height={25}
                width={40}
                marginLeft={5}
                borderRadius={10}
                elevation={3}
                marginVertical={3}
            >
                <AppImage
                    height={25}
                    width={40}
                    source={{ uri: item.main_photo_url }} resizeMode="cover"
                    borderRadius={10} bottom centerX
                >
                    <AppText color={'white'} bold marginBottom={10}>{item.product_name}</AppText>
                </AppImage>
            </AppView>
        )
    }
    return (
        <AppView stretch  >
            <AppView stretch row spaceBetween marginHorizontal={5}>
                <AppText color="#5C5C5C" size={7}>
                    {props.orderBy == "recentlyArrived" ? I18n.t("most-recent-products") : I18n.t("most-seen-products")}
                </AppText>
                <AppView row stretch marginBottom={5}>
                    <AppText color={colors.primaryAccent} marginHorizontal={2} size={7}
                        onPress={() => {
                            AppNavigation.push({
                                name: 'SearchProducts',
                                passProps: { url: `productsfilter?api_token=${token}&orderBy=${props.orderBy}`, orderBy: props.orderBy }
                            })
                        }}>
                        {I18n.t("more")}
                    </AppText>
                    <AppIcon
                        name="left"
                        type="ant"
                        reverse
                        color={colors.primaryAccent}
                    />
                </AppView>
            </AppView>
            {isLodaingData ?
                <AppView stretch center marginVertical={10} >
                    <AppSpinner />
                </AppView>
                :
                <AppScrollView showsHorizontalScrollIndicator={false} horizontal={true} stretch paddingHorizontal={3}>
                    {products.map((item) => renderProduct(item))}
                </AppScrollView>
            }
        </AppView>
    );
}
