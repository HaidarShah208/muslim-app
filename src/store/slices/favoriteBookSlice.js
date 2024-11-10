
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const initialState = {
  favorites: [],
};

// Function to load favorites from AsyncStorage
const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('bookFavorites');
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
    await AsyncStorage.setItem('bookFavorites', jsonValue);
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const favoriteBookSlice= createSlice({
  name: 'favoriteBook',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const existingBook = state.favorites.find(
        (book) => book.id === action.payload.id
      );

      if (!existingBook) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites); 
        Alert.alert('Success', 'Book added to your favorites list');
      } else {
        Alert.alert('Info', 'Book already in your favorites list');
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (book) => book.id !== action.payload.id
      );
      saveFavorites(state.favorites); 
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =favoriteBookSlice.actions;

export const initializeFavorites = () => async (dispatch) => {
  const favorites = await loadFavorites();
  dispatch(setFavorites(favorites));
};

export default favoriteBookSlice.reducer;
