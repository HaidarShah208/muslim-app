
import axios from 'axios';

const API_KEY = 'AIzaSyCeGp4U_o8y8aFbwr7sq0v78yNlk5iwTzI'; 
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&key=${API_KEY}`);
    return response.data.items; 
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};
