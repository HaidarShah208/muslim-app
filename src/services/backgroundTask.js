import BackgroundService from 'react-native-background-actions';
import NotificationService from './notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchDailyPrayerTimes} from './prayerTime';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const backgroundTask = async taskData => {
  const {city, country} = taskData;
  while (BackgroundService.isRunning()) {
    try {
      const prayerTimes = await fetchDailyPrayerTimes(city, country);
      await scheduleAllNotifications(prayerTimes);
    } catch (error) {
      console.error(
        'Error fetching prayer times or scheduling notifications:',
        error,
      );
    }

    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0,
    );
    const delay = nextDay - now;
    await sleep(delay);
  }
};

const options = {
  taskName: 'Prayer Notification',
  taskTitle: 'Prayer Notification Service',
  taskDesc: 'Scheduling prayer notifications in the background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourapp://notification',
  foreground: true,
  preventSuspend: true,
  forceAlarmManager: true,
  stopWithApp: false,
};

const scheduleAllNotifications = async prayerTimes => {
  try {
    const preferences =
      JSON.parse(await AsyncStorage.getItem('notificationPreferences')) || {};
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    for (let index = 0; index < prayers.length; index++) {
      const prayer = prayers[index];
      const time = prayerTimes[prayer];
      if (preferences[prayer]) {
        const date = calculateNotificationDate(time);
        console.log(`Scheduling ${prayer} at ${date.toLocaleString()}`);
        const notificationId = index + 1;
        NotificationService.scheduleNotification(
          notificationId,
          `Time for ${prayer}`,
          `It's time for ${prayer} prayer`,
          date,
        );
      }
    }
  } catch (error) {
    console.error('Error scheduling notifications:', error);
  }
};

const calculateNotificationDate = prayerTime => {
  const [hour, minute] = prayerTime.split(':').map(Number);
  const now = new Date();
  let notificationDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
  );

  if (notificationDate <= now) {
    notificationDate.setDate(notificationDate.getDate() + 1);
  }

  return notificationDate;
};

export const startBackgroundService = async () => {
  try {
    const locationJson = await AsyncStorage.getItem('cityCountry');
    const locationData = locationJson ? JSON.parse(locationJson) : null;

    if (locationData) {
      const {city, country} = locationData;
      await BackgroundService.start(backgroundTask, {
        ...options,
        parameters: {
          city,
          country,
        },
      });
    } else {
      console.error('City and country not found in AsyncStorage');
    }
  } catch (error) {
    console.error('Error starting background service:', error);
  }
};

export const stopBackgroundService = async () => {
  try {
    await BackgroundService.stop();
  } catch (error) {
    console.error('Error stopping background service:', error);
  }
};
