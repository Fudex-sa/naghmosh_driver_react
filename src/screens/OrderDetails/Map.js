import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, } from 'react-native';
import {
    AppView, AppText, AppButton, showInfo, AppNavigation,
} from '../../common';
import Geolocation from '@react-native-community/geolocation';
import Permissions from 'react-native-permissions';
import I18n from "react-native-i18n";

export default MapComponent = props => {
    const [loc, setLoc] = useState(null)
    const [initialRegion, setInitialRegion] = useState(null)

    useEffect(() => {
        _requestPermission();
    }, [])

    const _requestPermission = () => {
        Permissions.request('location').then(response => {
            if (
                response === 'denied' ||
                response === 'undetermined' ||
                response === 'denied'
            ) {
                _requestPermission();
            } else {
                getLatLng();
            }
        });
    }

    const getLatLng = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setInitialRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                setLoc(
                    {
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                )
                // props.onLocationChange(latitude, longitude);
            },
            error => {
                getLatLng();
            },
        );
    }

    const longPress = (e) => {
        setLoc(
            {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        )
    }

    const renderMap = () => (
        <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            provider="google"
            initialRegion={initialRegion}
        // onLongPress={event => longPress(event)}
        >
            {loc && <Marker coordinate={loc} />}
        </MapView >
    );
    return (
        <AppView flex stretch >
            <AppView flex stretch>
                {/* <AppView backgroundColor='transparent' stretch center
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10000 }}>
                    <AppText color="#000" bold marginVertical={5} stretch center size={7} backgroundColor='transparent'
                    >{I18n.t('Long press to locate the map')}</AppText>
                </AppView> */}
                {renderMap()}
                {/* <AppView stretch backgroundColor='transparent' center
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
                    <AppButton
                        title={I18n.t('select')}
                        borderRadius={10}
                        height={6} width={25}
                        marginBottom={5}
                        backgroundColor="primary"
                        onPress={() => {
                            if (loc) {
                                props.onLocationChange(loc.latitude, loc.longitude);
                                AppNavigation.pop();
                            } else {
                                showInfo(I18n.t('The location must be located on the map'))
                            }
                        }}
                    />
                </AppView> */}

            </AppView>
        </AppView>
    );
}