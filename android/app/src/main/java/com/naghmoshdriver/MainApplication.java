package com.naghmoshdriver;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
// import com.reactlibrary.RNPaytabsLibraryPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage; // <--- This!
import com.dylanvann.fastimage.FastImageViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.shell.MainReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line

import io.rumors.reactnativesettings.RNSettingsPackage;
import android.content.IntentFilter;
import io.rumors.reactnativesettings.RNSettingsPackage;
import io.rumors.reactnativesettings.receivers.GpsLocationReceiver;
import io.rumors.reactnativesettings.receivers.AirplaneModeReceiver;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        registerReceiver(new GpsLocationReceiver(), new IntentFilter("android.location.PROVIDERS_CHANGED"));
        registerReceiver(new AirplaneModeReceiver(), new IntentFilter("android.intent.action.AIRPLANE_MODE"));
    }
    
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }
    
    protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        // new RNPaytabsLibraryPackage(),
        new RNFirebasePackage(),
        new ReactNativePushNotificationPackage(),
        new RNFirebaseMessagingPackage(),
        new GeolocationPackage(),
        new RNI18nPackage(),
        new RNGestureHandlerPackage(),
        new SplashScreenReactPackage(),
        new VectorIconsPackage(),
        new LinearGradientPackage(),
        new SnackbarPackage(),
        new AsyncStoragePackage(),
        new FastImageViewPackage(),
        new MapsPackage(),
        new RNSettingsPackage()
    );
    }
           
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
