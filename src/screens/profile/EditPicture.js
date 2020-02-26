import React, { useState, useEffect, useRef } from 'react';
import { AppNavigation, AppView, AppText, AppImage, AppList, AppIcon, moderateScale, AppScrollView, AppForm, showSuccess, showError, AppInput, AppButton, showInfo } from "../../common";
import { AppHeader } from "../../components";
import { ImageBackground } from "react-native";
import backgroundImg from '../../assets/imgs/background.png';
import I18n from "react-native-i18n";
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { setUserData } from '../../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const optionsAr = {
    title: 'إختار صورة من',
    takePhotoButtonTitle: "الكاميرا",
    chooseFromLibraryButtonTitle: "المعرض",
    cancelButtonTitle: "رفض",
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

export default EditPicture = props => {
    const user = useSelector(state => state.auth.userData ? state.auth.userData.data : null);
    const rtl = useSelector(state => state.lang.rtl);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(user ? { uri: user.img_url } : null);
    const [changed, setChanged] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        let formData = new FormData();
        formData.append('api_token', user.api_token)
        if (image)
            formData.append('photo', image)
        else {
            showInfo(I18n.t('selectImage'))
            setLoading(false)
            return
        }

        Axios.post('uploadimage', formData)
            .then(async (res) => {
                showSuccess(res.data.message)
                setLoading(false)
                await dispatch(setUserData(res.data));
                try {
                    await AsyncStorage.setItem("@UserData", JSON.stringify(res.data));
                } catch (error) {
                }
                AppNavigation.pop();
            })
            .catch((error) => {
                setLoading(false)
                if (!error.response) {
                    showError(I18n.t("ui-networkConnectionError"));
                } else {
                    showError(I18n.t("ui-error-happened"));
                }
            });
    }

    changeImage = () => {
        ImagePicker.showImagePicker(rtl ? optionsAr : options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };
                setChanged(true);
                setImage({
                    uri: response.uri,
                    type: response.type ? response.type : 'image/jpeg',
                    name: 'userImage',
                })
            }
        });
    }

    const renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue
    }) => {
        return (
            <AppView flex stretch center>
                <AppImage
                    circleRadius={25}
                    bw={1}
                    resizeMode='cover'
                    source={image ? { uri: image.uri } : require('../../assets/imgs/logo.png')}
                    onPress={() => { changeImage() }}
                />
                <AppButton
                    title={I18n.t("save")}
                    stretch
                    bottom
                    size={7}
                    borderRadius={25}
                    marginTop={10}
                    height={7}
                    onPress={changed ? handleSubmit : () => showInfo(I18n.t('noChanged'))}
                    center
                    processing={loading}
                />
            </AppView>
        );
    }
    return (
        <AppView flex stretch >
            <AppHeader title={`${I18n.t("edit")} ${I18n.t("personal picture")}`} hideCart />
            <ImageBackground source={backgroundImg} style={{ flex: 1, alignSelf: "stretch" }} >
                <AppScrollView flex stretch paddingHorizontal={8} paddingTop={5} >
                    <AppForm
                        schema={{
                            api_token: user ? user.api_token : "",
                        }}
                        // validationSchema={validationSchema}
                        render={renderForm}
                        onSubmit={onSubmit}
                    />
                </AppScrollView>
            </ImageBackground>
        </AppView>
    );
}
