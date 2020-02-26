import React, { useState, useEffect } from 'react';
import Images from '../../assets/imgs/index';
import { AppNavigation, AppView, AppText, AppImage, AppScrollView, AppIcon, showError, AppSpinner, AppList } from "../../../src/common";
import I18n from "react-native-i18n";
import CategoriesRepo from "../../repo/categories";
import { ApiErrorTypes } from "../../api/errors";
import { useSelector, useDispatch } from "react-redux";
import CategoryItem from './CategoryItem';

export default categories = props => {
    const [isLodaingData, setIsLodaingData] = useState(true);
    const [categories, setCategories] = useState([]);
    const categoriesRepo = new CategoriesRepo();
    const _getCategories = async () => {
        if (!isLodaingData) setIsLodaingData(true);
        try {
            const categories = await categoriesRepo.getAllCategories();
            setCategories(categories);
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

    return (
        <AppView stretch height={17} center>
            {isLodaingData ?
                <AppSpinner />
                :
                <AppList
                    flex
                    stretch
                    horizontal
                    staticData
                    data={categories}
                    marginTop={8}
                    rowRenderer={c =>
                        <CategoryItem
                            key={c.id}
                            category={c}
                        />
                    }
                />
            }
        </AppView>
    );
}
