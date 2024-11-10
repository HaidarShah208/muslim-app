// notificationsSlice.js
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  notifications: {
    Fajr: false,
    Dhuhr: false,
    Asr: false,
    Maghrib: false,
    Isha: false,
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotification: (state, action) => {
      const {prayerName} = action.payload;
      state.notifications[prayerName] = !state.notifications[prayerName];
      AsyncStorage.setItem(
        'notificationPreferences',
        JSON.stringify(state.notifications),
      );
    },
    setNotificationPreferences: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {toggleNotification, setNotificationPreferences} =
  notificationsSlice.actions;

export const loadNotificationPreferences = () => async dispatch => {
  const preferences = await AsyncStorage.getItem('notificationPreferences');
  if (preferences) {
    dispatch(setNotificationPreferences(JSON.parse(preferences)));
  }
};

export default notificationsSlice.reducer;
