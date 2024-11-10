import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const initialState = {
  favorites: [],
};

// Function to load favorites from AsyncStorage
const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favorites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

// Function to save favorites to AsyncStorage
const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem('favorites', jsonValue);
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const favoriteImagesSlice = createSlice({
  name: 'favoritesImages',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const existingImage = state.favorites.find(
        (image) => image.id === action.payload.id
      );

      if (!existingImage) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites); 
        Alert.alert('Success', 'Image added to favorites');
      } else {
        Alert.alert('Info', 'Image already in your favorites');
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (image) => image.id !== action.payload.id
      );
      saveFavorites(state.favorites); 
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoriteImagesSlice.actions;

export const initializeFavorites = () => async (dispatch) => {
  const favorites = await loadFavorites();
  dispatch(setFavorites(favorites));
};

export default favoriteImagesSlice.reducer;
