import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  language: {label: 'English US', value: 'en'},
  theme: {label: 'Light', value: 'light'},
  fontSize: {label: '100%', value: 24},
  juristicMethod: {label: 'Hanafi', value: 'hanafi'},
  calculationMethod: {label: 'Gulf Region', value: '8'},
  calendarType: {label: 'Hijri', value: 'hijri'},
  showImages: {label: 'Show Images', value: true},
  imageQuality: {label: 'High', value: 'high'},
  quranScript: {label: 'Amiri Quran', value: 'AmiriQuran'},
  reciter: {label: 'audio_alafasy', value: 'audio_arabic'},
  translation: {label: 'English', value: 'enTranslation'},
  playPrefrence: {label: 'play Online', value: 'online'},

  // bolean settings
  notificationPreference: {label: 'Notification Prefrence', value: true},
  prayerReminder: {label: 'Prayer Reminder', value: true},
  customNotificationSound: {label: 'Custom Notification', value: true},
  customNotificationSoundFile: {label: 'Notification Sound', value: 'default'},
  automaticBackup: {label: 'Automatic Backup', value: true},
  imageSorting: {label: 'Image Sorting', value: true},
  slideShow: {label: 'Slide Show', value: true},
  faceRecognition: {label: 'Face Recognition', value: true},
  hidePrivateAlbums: {label: 'Hide Private Albums', value: true},

  // Add more settings as needed
};

// Thunk to load settings from AsyncStorage
export const loadSettingsFromStorage = createAsyncThunk(
  'settings/loadFromStorage',
  async (_, {dispatch}) => {
    try {
      const storedSettings = await AsyncStorage.getItem('userSettings');
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        dispatch(loadSettings(parsedSettings));
      }
    } catch (error) {
      console.error('Failed to load settings from AsyncStorage:', error);
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSetting: (state, action) => {
      const {key, label, value} = action.payload;
      state[key] = {label, value};
    },
    loadSettings: (state, action) => {
      return {...state, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(loadSettingsFromStorage.fulfilled, (state, action) => {
      // Settings are already loaded via loadSettings action
    });
  },
});

export const {setSetting, loadSettings} = settingsSlice.actions;
export default settingsSlice.reducer;
