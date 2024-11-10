import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadSettingsFromStorage} from '../../../store/slices/userSettingsSlice';

const useGallerySetting = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state?.settings); // Getting global state from Redux

  useEffect(() => {
    dispatch(loadSettingsFromStorage());
  }, [dispatch]);

  return {};
};

export default useGallerySetting;
