import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  progress: {}, // stores progress by book ID, e.g., { bookId: { pagesRead: 10, totalPages: 100, percentage: 10 } }
};

const readingProgressSlice = createSlice({
  name: 'readingProgress',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { bookId, pagesRead, totalPages } = action.payload;
      const percentage = (pagesRead / totalPages) * 100;

      state.progress[bookId] = {
        pagesRead,
        totalPages,
        percentage: percentage >= 100 ? 100 : percentage,
      };

      // Save to AsyncStorage for persistence
      AsyncStorage.setItem('readingProgress', JSON.stringify(state.progress));
    },
    initializeProgress: (state, action) => {
      state.progress = action.payload || {};
    },
  },
});

export const { setProgress, initializeProgress } = readingProgressSlice.actions;

export const initializeReadingProgress = () => async (dispatch) => {
  try {
    const progress = await AsyncStorage.getItem('readingProgress');
    if (progress) {
      dispatch(initializeProgress(JSON.parse(progress)));
    }
  } catch (error) {
    console.log('Error loading reading progress:', error);
  }
};

export default readingProgressSlice.reducer;
