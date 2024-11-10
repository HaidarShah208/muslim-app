import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore'; // Assuming you're using Firebase Firestore

// Async thunk to fetch books by discipline
export const fetchImagesByCategory = createAsyncThunk(
  'pdfBooks/fetchImagesByCategory',
  async (discipline, { rejectWithValue }) => {
    if (!discipline) {
      return rejectWithValue('Discipline value is required');
    }

    try {
      const Images = [];
      const querySnapshot = await firestore()
        .collection('gallery_image')
        .where('category', '==', discipline)
        .get();

      querySnapshot.forEach(doc => {
        Images.push({ id: doc.id, ...doc.data(), collection: discipline }); // Attach the discipline to each book
      });

      return Images;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const galleryReducer = createSlice({
  name: 'gallery',
  initialState: {
    Images: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchImagesByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchImagesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Images = [...state.Images, ...action.payload]; // Append the new books to the existing array
      })
      .addCase(fetchImagesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default galleryReducer.reducer;
