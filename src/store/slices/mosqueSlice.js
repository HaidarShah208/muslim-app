import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  mosque: null,
  status: 'idle',
  error: null,
};

export const fetchMasjid = createAsyncThunk(
  'mosque/fetchMasjid',
  async ({latitude, longitude}) => {
    try {
      const res = await axios.get(`https://overpass-api.de/api/interpreter`, {
        params: {
          data: `[out:json];node["amenity"="place_of_worship"]["religion"="muslim"](around:3000,${latitude},${longitude});out body;`,
        },
      });

      return res.data.elements; // Adjust based on the response structure
    } catch (error) {
      console.error(error);
    }
  },
);

const mosqueSlice = createSlice({
  name: 'mosque',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMasjid.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMasjid.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mosque = action.payload;
      })
      .addCase(fetchMasjid.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mosqueSlice.reducer;
