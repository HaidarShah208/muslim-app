import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    hadiths: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Async thunk to fetch Hadith data
export const fetchHadiths = createAsyncThunk('hadith/fetchHadiths', async () => {
    const response = await axios.get('https://hadithapi.com/public/api/hadiths?apiKey=$2y$10$1Q3JOXpJYIUJeAZFVYxMBeGoQv9z9ICTiTq3DKIPKrleRHzoRM5S');
    return response.data.hadiths.data; // Return the hadiths array
});

const hadithSlice = createSlice({
    name: 'hadith',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(fetchHadiths.pending, (state) => {
            //     state.status = 'loading';
            // })
            .addCase(fetchHadiths.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hadiths = action.payload;
            })
            .addCase(fetchHadiths.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default hadithSlice.reducer;
