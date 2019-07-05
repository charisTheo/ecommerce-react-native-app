This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Table of Contents

* [Download the app](#download-the-app)
  * [Android](#android)
  * [iOS](#ios)
* [Download and install dependencies](#download-and-install-dependencies)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm run ios](#npm-run-ios)
  * [npm run android](#npm-run-android)
  * [npm run eject](#npm-run-eject)
* [Updating to New Releases](#updating-to-new-releases)
* [Troubleshooting](#troubleshooting)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [Build Errors](#build-errors)

## Download the app

### Android

* From your Android device download and install the debug APK [here](https://github.com/charisTheo/ecommerce-react-native-app/raw/master/android/app/build/outputs/apk/debug/app-debug.apk).
* When prompted on installation tap on "Install anyway".
* Grant overlay permissions for the app.

### iOS

* Run it on your local machine by using [`npm run ios`](#npm-run-ios)

> Instead If you wish to clone the repository and build the project yourself follow the following steps.

## Download and install dependencies

From within your terminal copy and paste the following command. This will make sure you download the repository and install all its dependencies.
```
git clone https://github.com/charisTheo/ecommerce-react-native-app.git && cd ecommerce-react-native-app && npm i -—save —-save-dev
```

## Available Scripts

### `npm start`

The you need to run your app in development mode.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
```

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

## Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

### Build Errors

1. Update Android Studio to 3.2.2
2. In `./android/local.properties` file change the Android Sdk directory: 
    * For Mac: `sdk.dir=/Users/<username>/Library/Android/sdk`
    * For linux: `sdk.dir=/home/<username>/Android/sdk`
3. Error: Could not get unknown property 'mergeResourcesProvider'
  * In `gradle-wrapper.properties` file change distributionUrl:
    * `distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.1-all.zip`
  * In root `build.gradle` file change gradle classpath: 
    * `classpath 'com.android.tools.build:gradle:3.3.1’`
  * Copy `metro.config.js` file from [0.59-stable/template](https://github.com/facebook/react-native/tree/0.59-stable/template) to your project.
  * Make sure the version of metro in package.json is:
    * `"metro-react-native-babel-preset": "0.54.1"`
  * Remove node_modules, and run-android again:
    * `rf -rf node_modules && npm i --save --save-dev && npm start`
