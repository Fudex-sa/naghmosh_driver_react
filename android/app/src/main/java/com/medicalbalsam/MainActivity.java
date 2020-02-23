package com.medicalbalsam;

import com.facebook.react.ReactActivity;

import com.reactnativenavigation.NavigationActivity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.view.WindowManager;
import android.view.Display;
import android.view.View;
import android.support.v4.content.ContextCompat;
import android.widget.ImageView.ScaleType;
// AIzaSyCtDkxW5xxkQnpyN3tTPOjRPKXPhhxYTi4
public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setSplashLayout();
    // setContentView(R.layout.activity_main);

    }

    private void setSplashLayout() {
    ImageView img = new ImageView(this);
    img.setLayoutParams(new
    LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
    LinearLayout.LayoutParams.MATCH_PARENT));
    img.setScaleType(ScaleType.FIT_XY);
    img.setImageDrawable(getDrawable(R.mipmap.splash));
    setContentView(img);
    }

    // @Override
    // public void onNewIntent(Intent intent) {
    // super.onNewIntent(intent);
    // setIntent(intent);
    // }

    // @Override
    // public void onActivityResult(int requestCode, int resultCode, Intent data) {
    // super.onActivityResult(requestCode, resultCode, data);
    // MainApplication.getCallbackManager().onActivityResult(requestCode,
    // resultCode, data);
    // }
}
