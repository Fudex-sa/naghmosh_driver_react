package com.naghmoshdriver;

import com.reactnativenavigation.NavigationActivity;
import android.content.Intent;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
    
    // @Override
    // public void onActivityResult(int requestCode, int resultCode, Intent data) {
    //     super.onActivityResult(requestCode, resultCode, data);
    //     MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    // }
}
