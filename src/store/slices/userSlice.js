import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (user) {
        return {
          photoURL: user.photoURL,
          displayName: user.displayName,
          email: user.email,
        };
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (updates, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile(updates);
        return updates;
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    photoURL: '',
    displayName: '',
    email: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photoURL = action.payload.photoURL;
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photoURL = action.payload.photoURL;
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
