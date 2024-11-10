import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

// Define an initial state
const initialState = {
  pdfs: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Define an async thunk to fetch PDF data from Firestore
export const fetchPdfs = createAsyncThunk('pdf/fetchPdfs', async () => {
  try {
    const pdfCollection = await firestore().collection('pdf').get();
    const pdfs = pdfCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return pdfs;
  } catch (error) {
    throw Error('Failed to fetch PDFs data: ' + error.message);
  }
});

// Create the pdf slice
const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPdfs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPdfs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pdfs = action.payload;
      })
      .addCase(fetchPdfs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default pdfSlice.reducer;
