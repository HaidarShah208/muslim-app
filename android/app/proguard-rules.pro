# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

# Retain annotations for reflection
-keepattributes *Annotation*

# Keep public classes with @Keep annotation
-keep @androidx.annotation.Keep class * { *; }

# Retain all native method names
-keepclasseswithmembers class * {
    native <methods>;
}

# Ensure that any class with a main method is not obfuscated
-keepclassmembers class * {
    public static void main(java.lang.String[]);
}

# Preserve Parcelable class implementations
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

# Keep Stripe classes for push provisioning
-keep class com.stripe.** { *; }
-dontwarn com.stripe.**

# Keep React Native Stripe SDK classes
-keep class com.reactnativestripesdk.** { *; }
-dontwarn com.reactnativestripesdk.**

# Keep classes related to React Native libraries
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep OkHttp classes (if you are using OkHttp)
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# Keep Retrofit classes (if you are using Retrofit)
-keep class retrofit2.** { *; }
-dontwarn retrofit2.**

# Keep Gson classes (if you are using Gson)
-keep class com.google.gson.** { *; }
-dontwarn com.google.gson.**

# Keep Fresco classes (if you are using Fresco for image loading)
-keep class com.facebook.imagepipeline.** { *; }
-dontwarn com.facebook.imagepipeline.**

# Keep Firebase classes (if you are using Firebase services)
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Keep React Native Navigation classes (if you are using React Native Navigation)
-keep class com.reactnativenavigation.** { *; }
-dontwarn com.reactnativenavigation.**

# Keep ButterKnife classes (if you are using ButterKnife)
-keep class butterknife.** { *; }
-dontwarn butterknife.**

# Keep Realm classes (if you are using Realm for local database)
-keep class io.realm.** { *; }
-dontwarn io.realm.**

# Keep Lottie classes (if you are using Lottie for animations)
-keep class com.airbnb.lottie.** { *; }
-dontwarn com.airbnb.lottie.**

# Keep classes related to EventBus (if you are using EventBus)
-keep class org.greenrobot.eventbus.** { *; }
-dontwarn org.greenrobot.eventbus.**

# React Native WebView classes (if you are using WebView)
-keep class com.reactnativecommunity.webview.** { *; }
-dontwarn com.reactnativecommunity.webview.**

# Keep R8 from stripping specific classes or warnings
-keep class com.myapp.** { *; }
-dontwarn com.myapp.**
