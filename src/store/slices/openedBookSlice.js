// store/slices/openedBooksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk to load books from AsyncStorage
export const loadOpenedBooks = createAsyncThunk('openedBooks/loadOpenedBooks', async () => {
  try {
    const openedBooks = await AsyncStorage.getItem('openedBooks');
    return openedBooks ? JSON.parse(openedBooks) : [];
  } catch (error) {
    console.error('Error loading opened books from AsyncStorage:', error);
    return [];
  }
});

// Async thunk to save books to AsyncStorage
export const saveOpenedBooks = createAsyncThunk('openedBooks/saveOpenedBooks', async (books) => {
  try {
    await AsyncStorage.setItem('openedBooks', JSON.stringify(books));
  } catch (error) {
    console.error('Error saving opened books to AsyncStorage:', error);
  }
});

const openedBooksSlice = createSlice({
  name: 'openedBooks',
  initialState: {
    books: [],
  },
  reducers: {
    addOpenedBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOpenedBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      });
  },
});

export const { addOpenedBook } = openedBooksSlice.actions;
export default openedBooksSlice.reducer;
