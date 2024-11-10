import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore'; // Assuming you're using Firebase Firestore

// Async thunk to fetch books by discipline
export const fetchBooksByDiscipline = createAsyncThunk(
  'pdfBooks/fetchBooksByDiscipline',
  async (discipline, { rejectWithValue }) => {
    if (!discipline) {
      return rejectWithValue('Discipline value is required');
    }

    try {
      const books = [];
      const querySnapshot = await firestore()
        .collection('pdf')
        .where('collection', '==', discipline)
        .get();

      querySnapshot.forEach(doc => {
        books.push({ id: doc.id, ...doc.data(), collection: discipline }); // Attach the discipline to each book
      });

      return books;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pdfCollectionReducer = createSlice({
  name: 'pdfBooks',
  initialState: {
    books: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooksByDiscipline.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooksByDiscipline.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = [...state.books, ...action.payload]; // Append the new books to the existing array
      })
      .addCase(fetchBooksByDiscipline.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default pdfCollectionReducer.reducer;
