import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  holiday: null,
  status: 'idle',
  error: null,
};

// Create an async thunk for fetching holidays
export const fetchHolidays = createAsyncThunk(
  'holidays/fetchHolidays',
  async (_, {rejectWithValue}) => {
    const country = 'ca';
    const year = '2024';
    const type = 'muslim';
    const apikey = 'DWgUNICvy+mdd1x7tE0nuw==qlULIAGEuAEIqyy4';

    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}&type=${type}`,
        {
          headers: {'X-Api-Key': apikey},
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Create the holidays slice
const holidaysSlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHolidays.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.holiday = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // More detailed error handling
      });
  },
});

export default holidaysSlice.reducer;
