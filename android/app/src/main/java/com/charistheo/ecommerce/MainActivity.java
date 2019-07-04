package com.charistheo.ecommerce;

import android.widget.LinearLayout;
import android.view.Gravity;
import android.widget.TextView;
import android.util.TypedValue;
import android.graphics.Color;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override 
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#4e4e4e"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#76ff03"));
        textView.setText("Ecommerce Example App");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }
}
