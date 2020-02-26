import React, { useState, useEffect } from 'react';
import { AppInput, AppIcon, AppNavigation } from "../../../src/common";
import I18n from "react-native-i18n";

export default SearchBarInput = props => {
    const [productName, setProductName] = useState(null)
    return (
        <AppInput
            placeholder={I18n.t("home-search")}
            onChange={(v) => {
                setProductName(v)
            }}
            onSubmitEditing={() => {
                if (productName) {
                    AppNavigation.push({
                        name: "SearchProducts",
                        passProps: {
                            url: `productsfilter?productName=${productName}`,
                            productName: productName,
                        }
                    })
                }
            }}
            height={7}
            size={7}
            paddingHorizontal={10}
            borderRadius={70}
            backgroundColor="#fff"
            elevation={5}
            marginTop={-10}
            marginHorizontal={5}
            noValidation
            rightItems={[
                <AppIcon
                    name="ios-search"
                    type="ion"
                    color="grey"
                    size={10}
                    marginHorizontal={7}
                    onPress={() => AppNavigation.push({
                        name: "SearchProducts",
                        passProps: {
                            url: `productsfilter?productName=${productName}`,
                            productName: productName,
                        }
                    })}
                />]}
        />
    );
}
