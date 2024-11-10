import React, {createContext, useEffect, useState} from 'react';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {Provider} from 'react-redux';
import {store} from './store/store';
import Navigation from './navigation/Navigation';
import {DownloadProvider} from './context/DownloadContext';
import DownloadProgress from './components/DownloadProgress';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppState, PermissionsAndroid, BackHandler, Alert, Platform, Linking} from 'react-native'; // Ensure Platform is imported
import {
  startBackgroundService,
  stopBackgroundService,
} from './services/backgroundTask';
import NotificationService from './services/notificationService';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';

// Create Player Context
export const PlayerContext = createContext();

NotificationService.configure();

const requestPermissions = async () => {
  try {
    // Request Location Permissions First
    const fineLocationPermission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    const coarseLocationPermission = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

    if (fineLocationPermission === RESULTS.GRANTED && coarseLocationPermission === RESULTS.GRANTED) {
      console.log('Location permissions granted.');
    } else {
      console.log('Location permissions denied.');
    }

    // Then request Storage Permissions
    if (Platform.Version >= 30) {
      // For Android 11 and above
      const manageExternalStoragePermission = await check(PERMISSIONS.ANDROID.MANAGE_EXTERNAL_STORAGE);
      if (manageExternalStoragePermission !== RESULTS.GRANTED) {
        Alert.alert(
          'Manage External Storage Permission Required',
          'Please enable "Manage External Storage" permission for full access to storage.',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    } else {
      // For Android versions below 11
      const writeStoragePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (writeStoragePermission !== RESULTS.GRANTED) {
        Alert.alert('Storage Permission Required', 'Please grant storage permissions.');
      }
    }
  } catch (error) {
    console.error('Error requesting permissions:', error);
  }
};

const App = () => {
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

  useEffect(() => {
    // OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize('24ed26fe-138c-4f73-829f-cf155056141c');

    // Request notification permission
    OneSignal.Notifications.requestPermission(true);

    // Listening for notification clicks
    const notificationClickListener = event => {
      console.log('OneSignal: notification clicked:', event);
    };
    OneSignal.Notifications.addEventListener('click', notificationClickListener);

    // Cleanup event listener on unmount
    return () => {
      OneSignal.Notifications.removeEventListener('click', notificationClickListener);
    };
  }, []);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          stopWithApp: false,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
          compactCapabilities: [Capability.Play, Capability.Pause],
        });
        setIsPlayerInitialized(true);
      } catch (error) {
        console.error('Error initializing TrackPlayer:', error);
      }
    };

    initializePlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    const startService = async () => {
      try {
        await startBackgroundService();
      } catch (error) {
        console.error('Error starting background service:', error);
      }
    };

    startService();

    const handleAppStateChange = async nextAppState => {
      try {
        if (nextAppState === 'active') {
          await stopBackgroundService();
        } else if (nextAppState.match(/inactive|background/)) {
          await startBackgroundService();
        }
      } catch (error) {
        console.error('Error handling app state change:', error);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  // Call the permission request function when the app launches
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51Pupd5013REreoNPL8PFGejOnUv3ajnx6TaKOtUxI1GqeJ49P7WDG1WEty1TXinkTzWA7ryejYgS1rHEx3uCh6zH00UMTSzBXX">
      <GestureHandlerRootView style={{flex: 1}}>
        <PlayerContext.Provider value={{isPlayerInitialized}}>
          <DownloadProvider>
            <Provider store={store}>
              <DownloadProgress />
              <Navigation />
            </Provider>
          </DownloadProvider>
        </PlayerContext.Provider>
      </GestureHandlerRootView>
    </StripeProvider>
  );
};

export default App;
