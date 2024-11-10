import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Load the target from Firestore
export const loadTarget = createAsyncThunk('tasbih/loadTarget', async () => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const targetRef = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('targets')
      .doc('userTarget');

    const targetDoc = await targetRef.get();
    if (targetDoc.exists) {
      const targetData = targetDoc.data();
      return targetData;
    } else {
      throw new Error('Target document not found');
    }
  } catch (error) {
    console.error('Error loading target:', error);
    throw error;
  }
});

// Load tasbihs from Firestore
export const loadTasbihs = createAsyncThunk('tasbih/loadTasbihs', async () => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not authenticated');

    const tasbihsCollection = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('tasbihs');

    const snapshot = await tasbihsCollection.get();
    const tasbihs = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    return tasbihs;
  } catch (error) {
    console.error('Error loading tasbihs:', error);
    throw error;
  }
});

// Save or Update a specific tasbih in Firestore
export const saveOrUpdateTasbih = createAsyncThunk(
  'tasbih/saveOrUpdateTasbih',
  async ({tasbihId, tasbihData}) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      const tasbihRef = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('tasbihs')
        .doc(tasbihId);

      // Merge the new data with the existing document or create a new one
      await tasbihRef.set(tasbihData, {merge: true});

      return {id: tasbihId, ...tasbihData};
    } catch (error) {
      console.error('Error saving/updating tasbih:', error);
      throw error;
    }
  },
);

// Delete a tasbih from Firestore
export const deleteTasbih = createAsyncThunk(
  'tasbih/deleteTasbih',
  async tasbihId => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      const tasbihRef = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('tasbihs')
        .doc(tasbihId);

      await tasbihRef.delete();

      return tasbihId;
    } catch (error) {
      console.error('Error deleting tasbih:', error);
      throw error;
    }
  },
);

// Save or Update the target in Firestore
export const saveOrUpdateTarget = createAsyncThunk(
  'tasbih/saveOrUpdateTarget',
  async ({targetData}) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      const targetRef = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('targets')
        .doc('userTarget'); // Single target document

      // Merge the new data with the existing document or create a new one
      await targetRef.set(targetData, {merge: true});

      return targetData;
    } catch (error) {
      console.error('Error saving/updating target:', error);
      throw error;
    }
  },
);

// Tasbih slice
const tasbihSlice = createSlice({
  name: 'tasbih',
  initialState: {
    tasbihs: [],
    totalCount: 0,
    tasbihTargets: {daily: '', weekly: '', monthly: ''},
    error: null,
    isLoading: false,
  },
  reducers: {
    addTasbih(state, action) {
      state.tasbihs.push(action.payload);
    },
    updateTasbih(state, action) {
      const index = state.tasbihs.findIndex(
        tasbih => tasbih.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasbihs[index] = action.payload;
      }
    },
    deleteTasbihLocally(state, action) {
      state.tasbihs = state.tasbihs.filter(
        tasbih => tasbih.id !== action.payload,
      );
    },
    incrementTasbihCount(state, action) {
      const {tasbihId, incrementBy} = action.payload;
      const tasbih = state.tasbihs.find(t => t.id === tasbihId);
      if (tasbih) {
        tasbih.count += incrementBy;
        state.totalCount += incrementBy;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTasbihs.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadTasbihs.fulfilled, (state, action) => {
        state.tasbihs = action.payload;
        state.totalCount = action.payload.reduce(
          (sum, tasbih) => sum + tasbih.count,
          0,
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadTasbihs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(saveOrUpdateTasbih.pending, state => {
        state.isLoading = true;
      })
      .addCase(saveOrUpdateTasbih.fulfilled, (state, action) => {
        const {id, ...tasbihData} = action.payload;
        const index = state.tasbihs.findIndex(tasbih => tasbih.id === id);

        if (index !== -1) {
          state.tasbihs[index] = {id, ...tasbihData};
        } else {
          state.tasbihs.push({id, ...tasbihData});
        }

        state.isLoading = false;
      })
      .addCase(saveOrUpdateTasbih.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTasbih.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTasbih.fulfilled, (state, action) => {
        state.tasbihs = state.tasbihs.filter(
          tasbih => tasbih.id !== action.payload,
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteTasbih.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(saveOrUpdateTarget.pending, state => {
        state.isLoading = true;
      })
      .addCase(saveOrUpdateTarget.fulfilled, (state, action) => {
        state.tasbihTargets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(saveOrUpdateTarget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loadTarget.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadTarget.fulfilled, (state, action) => {
        state.tasbihTargets = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadTarget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addTasbih,
  updateTasbih,
  deleteTasbihLocally,
  incrementTasbihCount,
} = tasbihSlice.actions;

export default tasbihSlice.reducer;
