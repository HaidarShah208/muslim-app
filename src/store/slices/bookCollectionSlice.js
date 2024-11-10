import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

// Define an initial state
const initialState = {
  pdfs: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Define an async thunk to fetch PDF data by category from Firestore
export const fetchPdfsByCategory = createAsyncThunk(
  'pdf/fetchPdfsByCategory',
  async (collection) => {
    try {
      // Fetch PDFs where the 'collection' field matches the given category
      const pdfCollection = await firestore()
        .collection('pdf')
        .where('collection', '===', collection)
        .get();
      
      console.log('Fetched PDF collection:', pdfCollection.docs.map(doc => doc.data())); // Debugging line

      const pdfs = pdfCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return pdfs;
    } catch (error) {
      console.error('Error fetching PDFs:', error.message); // More detailed logging
      throw Error('Failed to fetch PDFs data: ' + error.message);
    }
  }
);

// Create the pdf slice
const pdfCollection = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPdfsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPdfsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pdfs = action.payload;
      })
      .addCase(fetchPdfsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and the reducer
export default pdfCollection.reducer;
