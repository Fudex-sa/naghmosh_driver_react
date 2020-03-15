import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Linking, Alert } from 'react-native';
import {
    AppView, AppText, showError, AppIcon,
} from '../../common';
import Geolocation from '@react-native-community/geolocation';
import Permissions from 'react-native-permissions';
import I18n from "react-native-i18n";
// import MapViewDirections from 'react-native-maps-directions';
import RNSettings from 'react-native-settings';
import { useSelector } from 'react-redux';

export default MapComponent = props => {
    const [loc, setLoc] = useState(null)
    const [initialRegion, setInitialRegion] = useState(null)
    const rtl = useSelector(state => state.lang.rtl);

    const userLoc = (props.destination).split(',')
    useEffect(() => {
        RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
            if (result === RNSettings.ENABLED) {
                _requestPermission();
            } else {
                Alert.alert(
                    I18n.t('Alert'),
                    I18n.t('enableGPS'),
                    [{
                        text: I18n.t('Settings'),
                        onPress: () => {
                            RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
                                result => {
                                    if (result === RNSettings.ENABLED) {
                                        _requestPermission()
                                    }
                                    else {
                                    }
                                },
                            );
                        }
                    },
                    ],
                    { cancelable: false },
                );
            }
        });

    }, [])

    const _requestPermission = () => {
        Permissions.request('location').then(response => {
            if (
                response === 'denied' ||
                response === 'undetermined' ||
                response === 'restricted'
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
            },
            error => {
                getLatLng();
            }, { timeout: 10000 }
        );
    }

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${loc.latitude},${loc.longitude}&destination=${userLoc[0]},${userLoc[1]}`;
        Linking.openURL(url).catch((err) => { showError(I18n.t('error')) });
    }

    const renderMap = () => {
        return (
            <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
                provider="google"
                initialRegion={initialRegion}
            >
                {loc && <Marker coordinate={loc} />}
                {userLoc && <Marker
                    coordinate={{
                        latitude: parseFloat(userLoc[0]),
                        longitude: parseFloat(userLoc[1]),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />}
                {/* <MapViewDirections
                    origin={loc}
                    destination={{ latitude: (userLoc[0]), longitude: (userLoc[1]) }}
                    apikey={'AIzaSyCay9xEcxxoHTh8Qpm1DridNz3YJxQNtAY'}
                    strokeWidth={4}
                    strokeColor="#000"
                /> */}
            </MapView >
        )
    };
    return (
        <AppView flex stretch >
            <AppView flex stretch>
                {props.order.status === 'Shipped' || props.order.status === 'تم الشحن' ?
                    <AppView backgroundColor='#000' stretch center row borderRadius={25} paddingHorizontal={5}
                        style={{
                            position: 'absolute', bottom: 10, left: rtl ? 10 : undefined,
                            right: rtl ? undefined : 10, zIndex: 10000, opacity: 0.7
                        }}
                        onPress={() => { openGoogleMaps() }}
                    >
                        <AppText color="white" bold marginVertical={5} stretch center size={7} backgroundColor='transparent'
                        >{I18n.t('directions')}</AppText>
                        <AppIcon name={'directions'} marginLeft={5} type='font-awesome5' size={12} color='white' />
                    </AppView>
                    : null
                }
                {renderMap()}
            </AppView>
        </AppView >
    );
}