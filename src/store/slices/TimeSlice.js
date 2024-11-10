import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  time: null,
  status: 'idle',
  error: null,
};

export const fetchTime = createAsyncThunk('time/fetchTime', async () => {
  try {
    const res = await axios.get(`https://muslim-app-admin.vercel.app/api/time`);
    return res.data.time;
  } catch (error) {
    console.error(error);
  }
});

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTime.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.time = action.payload;
      })
      .addCase(fetchTime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default timeSlice.reducer;
