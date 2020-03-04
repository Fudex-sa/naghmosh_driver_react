import React, { useState, useEffect } from 'react';
import I18n from 'react-native-i18n';
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
    AppView,
    AppText,
    AppIcon,
    AppImage,
    responsiveWidth,
    moderateScale,
} from '../../common';
import { connect } from "react-redux";
import colors from '../../common/defaults/colors';
import { AppHeader } from "../../components"
import styles from "./styles";

export default MapComponent = props => {
    const [initialRegion, setInitialRegion] = useState({
        latitude: props.coordinates.latitude,
        longitude: props.coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const renderMap = () => (
        <MapView
            provider="google"
            style={styles.container}
            rotateEnabled={false}
            initialRegion={initialRegion}
        >
            {props.coordinates && <Marker coordinate={props.coordinates} />}
        </MapView >
    );
    return (
        <AppView height={35} stretch backgroundColor="#fff" borderRadius={15} marginVertical={10} elevation={5}>
            {renderMap()}
        </AppView>
    );
}