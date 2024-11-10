import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to format the date as DD-MM-YYYY
const formatDate = date => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

// Define the initial state
const initialState = {
  timings: null,
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching timings
export const fetchTimings = createAsyncThunk(
  'timings/fetchTimings',
  async ({city, country, date, calculationMethod}) => {
    console.log('fetchTimings slice', city, country, date, calculationMethod);
    const formattedDate = formatDate(date || new Date());
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=${country}&method=${calculationMethod}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// Create the timings slice
const timingsSlice = createSlice({
  name: 'timings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTimings.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTimings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.timings = action.payload;
      })
      .addCase(fetchTimings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default timingsSlice.reducer;
