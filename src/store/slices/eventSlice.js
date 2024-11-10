import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';

const initialState = {
  events: [],
  error: null,
  loading: false,
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteEvent(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    updateEvent(state, action) {
      state.events = state.events.map(event =>
        event.id === action.payload.id ? action.payload : event,
      );
    },
  },
  extraReducers: builder => {},
});

export const {setEvents, setLoading, setError, deleteEvent, updateEvent} =
  eventSlice.actions;

export const addEvent = (newEvent, callback) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const storedEvents = await AsyncStorage.getItem('events');
    const eventsArray = storedEvents ? JSON.parse(storedEvents) : [];
    const newEve = [...eventsArray, newEvent];
    await AsyncStorage.setItem('events', JSON.stringify(newEve));
    dispatch(setEvents(newEve));
    ToastAndroid.show('Event Added Successfully!', ToastAndroid.SHORT);
    if (callback) callback();
  } catch (error) {
    console.error(error);
    dispatch(setError('Failed to save the event.'));
    Alert.alert('Error', 'Failed to save the event.');
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleUpdateEvent = (updatedEvent, callback) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const storedEvent = await AsyncStorage.getItem('events');
    if (storedEvent) {
      let eventArray = JSON.parse(storedEvent);
      eventArray = eventArray.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event,
      );
      await AsyncStorage.setItem('events', JSON.stringify(eventArray));
      dispatch(setEvents(eventArray));
      if (callback) callback();
      ToastAndroid.show('Event edit Successfully!', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('Error updating event:', error);
    dispatch(setError('Failed to update event.'));
    Alert.alert('Error', 'Failed to update event.');
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchEvents = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const storedEvents = await AsyncStorage.getItem('events');
    if (storedEvents) {
      const eventsArray = JSON.parse(storedEvents);
      dispatch(setEvents(eventsArray));
    }
  } catch (error) {
    console.error('Error getting events:', error);
    dispatch(setError('Failed to fetch events.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeEvent = eventId => async dispatch => {
  dispatch(setLoading(true));
  try {
    const storedEvents = await AsyncStorage.getItem('events');
    if (storedEvents) {
      let eventsArray = JSON.parse(storedEvents);
      eventsArray = eventsArray.filter(event => event.id !== eventId);
      await AsyncStorage.setItem('events', JSON.stringify(eventsArray));
      dispatch(setEvents(eventsArray));
      dispatch(deleteEvent(eventId));
      Alert.alert('Success', 'Event deleted successfully!');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    dispatch(setError('Failed to delete event.'));
    Alert.alert('Error', 'Failed to delete event.');
  } finally {
    dispatch(setLoading(false));
  }
};

// Export the reducer
export default eventSlice.reducer;
