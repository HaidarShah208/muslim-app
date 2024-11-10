import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import prayerTimingsReducer from '../store/slices/prayerTimeSlice';
import notificationsReducer from '../store/slices/notificationSlice';
import mosqueReducer from '../store/slices/mosqueSlice';
import tasbihReducer from '../store/slices/tasbihSlice';

import holidaysReducer from '../store/slices/muslimHolidaySlice';
import eventReducer from '../store/slices/eventSlice';
import userReducer from '../store/slices/userSlice';
import hadithReducer from '../store/slices/hadithSlice';
import settingsReducer from '../store/slices/userSettingsSlice';

import booksReducer from '../store/slices/bookSlice';

import pdfReducer from '../store/slices/pdfSlice';
import favoritesReducer from '../store/slices/favouriteMosquesSlice';
import userSettingReducer from '../store/slices/userSettingsSlice';
import favoriteBookReducer from '../store/slices/favoriteBookSlice';
import pdfCollectionReducer from '../store/slices/pdfCollection';
import galleryReducer from '../store/slices/gallerySlice';
import favoriteImagesReducer from '../store/slices/favoriteImages';

import pdfProgressSliceReducer from '../store/slices/pdfProgressSlic';
import timeReducer from '../store/slices/TimeSlice';
import bookmarkReducer from '../store/slices/bookmarkSlice';

import openedBooksReducer from '../store/slices/openedBookSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    prayerTiming: prayerTimingsReducer,
    notifications: notificationsReducer,
    mosque: mosqueReducer,
    tasbih: tasbihReducer,
    holidays: holidaysReducer,
    events: eventReducer,
    user: userReducer,
    hadith: hadithReducer,
    settings: settingsReducer,
    books: booksReducer,
    favorites: favoritesReducer,
    userSetting: userSettingReducer,
    pdf: pdfReducer,
    favoriteBook: favoriteBookReducer,
    pdfBooks: pdfCollectionReducer,
    gallery: galleryReducer,
    favoritesImages: favoriteImagesReducer,
    pdfProgress: pdfProgressSliceReducer,
    favorites: favoritesReducer,
    time: timeReducer,
    bookmarks: bookmarkReducer,
    openedBooks: openedBooksReducer,
  },
});
