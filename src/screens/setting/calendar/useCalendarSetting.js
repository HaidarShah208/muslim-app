import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSetting,
  loadSettings,
  loadSettingsFromStorage,
} from '../../../store/slices/userSettingsSlice';

const useCalendarSetting = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state?.settings); // Getting global state from Redux

  useEffect(() => {
    dispatch(loadSettingsFromStorage());
  }, [dispatch]);
  return {
    settings,
  };
};

export default useCalendarSetting;
