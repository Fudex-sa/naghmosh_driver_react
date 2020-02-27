package com.naghmoshdriver;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
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
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.shell.MainReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;


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
    }
    
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }
    
    protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new GeolocationPackage(),
        new RNI18nPackage(),
        new RNGestureHandlerPackage(),
        new SplashScreenReactPackage(),
        new VectorIconsPackage(),
        new LinearGradientPackage(),
        new SnackbarPackage(),
        new AsyncStoragePackage(),
        new FastImageViewPackage(),
        new ImagePickerPackage(),
        new MapsPackage()
    );
    }
           
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}