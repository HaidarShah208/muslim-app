

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (query) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return response.data.items;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
      
  },
});

export default booksSlice.reducer;
