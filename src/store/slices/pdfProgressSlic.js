// store/slices/pdfProgressSliceReducer.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the initial state
const initialState = {
  progress: []
};

// Create the slice
const pdfProgressSlice = createSlice({
  name: 'pdfProgress',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { bookId, pagesRead, totalPages, pdf } = action.payload;
      state.progress[bookId ] = { pagesRead, totalPages , pdf };
      // Save progress to AsyncStorage
      AsyncStorage.setItem('readingProgress', JSON.stringify(state.progress));
    },
    initializeReadingProgress: (state, action) => {
      state.progress = action.payload;
    }
  }
});

// Actions
export const { setProgress, initializeReadingProgress } = pdfProgressSlice.actions;

// Asynchronous action to initialize reading progress from AsyncStorage
export const initializeReadingProgressAsync = () => async (dispatch) => {
  try {
    const storedProgress = await AsyncStorage.getItem('readingProgress');
    const parsedProgress = storedProgress ? JSON.parse(storedProgress) : {};
    dispatch(initializeReadingProgress(parsedProgress));
  } catch (error) {
    console.error('Failed to load reading progress:', error);
  }
};

// Reducer
export default pdfProgressSlice.reducer;
