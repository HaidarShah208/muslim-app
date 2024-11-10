import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Async thunk to load bookmarks from AsyncStorage
export const loadBookmarks = createAsyncThunk(
  'bookmarks/loadBookmarks',
  async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarkedPages');
      const storedHadiths = await AsyncStorage.getItem('bookmarkedHadiths');
      return {
        bookmarkedPages: storedBookmarks ? JSON.parse(storedBookmarks) : [],
        bookmarkedHadiths: storedHadiths ? JSON.parse(storedHadiths) : [],
      };
    } catch (error) {
      console.error('Error loading bookmarks', error);
      return {bookmarkedPages: [], bookmarkedHadiths: []};
    }
  },
);

// Async thunk to save Quran bookmarks to AsyncStorage
const saveQuranBookmarksToStorage = async bookmarkedPages => {
  try {
    await AsyncStorage.setItem(
      'bookmarkedPages',
      JSON.stringify(bookmarkedPages),
    );
  } catch (error) {
    console.error('Error saving Quran bookmarked pages', error);
  }
};

// Async thunk to save Hadith bookmarks to AsyncStorage
const saveHadithBookmarksToStorage = async bookmarkedHadiths => {
  try {
    await AsyncStorage.setItem(
      'bookmarkedHadiths',
      JSON.stringify(bookmarkedHadiths),
    console.log('asyncStorage slice data:',bookmarkedHadiths)
    );
  } catch (error) {
    console.error('Error saving bookmarked Hadiths', error);
  }
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarkedPages: [],
    bookmarkedHadiths: [],
    status: 'idle',
  },
  reducers: {
    addQuranBookmark: (state, action) => {
      state.bookmarkedPages.push(action.payload);
      saveQuranBookmarksToStorage(state.bookmarkedPages); // Save Quran bookmarks after adding
    },
    removeQuranBookmark: (state, action) => {
      state.bookmarkedPages = state.bookmarkedPages.filter(
        page => page !== action.payload,
      );
      saveQuranBookmarksToStorage(state.bookmarkedPages); // Save Quran bookmarks after removing
    },
    addHadithBookmark: (state, action) => {
      const hadithExists = state.bookmarkedHadiths.some(
        hadith => hadith.hadithNumber === action.payload.hadithNumber && hadith.bookName === action.payload.bookName
      );
      if (!hadithExists) {
        state.bookmarkedHadiths.push(action.payload);
        saveHadithBookmarksToStorage(state.bookmarkedHadiths); // Save Hadith bookmarks after adding
      }
    },
    removeHadithBookmark: (state, action) => {
      state.bookmarkedHadiths = state.bookmarkedHadiths.filter(
        hadith => hadith.hadithNumber !== action.payload.hadithNumber 
      );
      saveHadithBookmarksToStorage(state.bookmarkedHadiths); // Save Hadith bookmarks after removing
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadBookmarks.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadBookmarks.fulfilled, (state, action) => {
        state.bookmarkedPages = action.payload.bookmarkedPages;
        state.bookmarkedHadiths = action.payload.bookmarkedHadiths;
        state.status = 'succeeded';
      })
      .addCase(loadBookmarks.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {
  addQuranBookmark,
  removeQuranBookmark,
  addHadithBookmark,
  removeHadithBookmark,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
