import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useLocation from '../../services/useLocation';
import {fetchTimings} from '../../store/slices/prayerTimeSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {useDownload} from '../../context/DownloadContext';
import {loadSettingsFromStorage} from '../../store/slices/userSettingsSlice';

const useHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {setDownloadProgress, setIsDownloading, isDownloading} = useDownload();
  const [modalVisible, setModalVisible] = useState(false);

  const calculationMethod = useSelector(
    state => state?.userSetting.calculationMethod.value,
  );

  useEffect(() => {
    console.log('calculation', calculationMethod);
  }, [calculationMethod]);

  useEffect(() => {
    dispatch(loadSettingsFromStorage());
  }, [dispatch]);

  const date = new Date();

  useEffect(() => {
    const date = new Date();
    dispatch(
      fetchTimings({
        city: cityCountry?.city,
        country: cityCountry?.country,
        calculationMethod,
        date,
      }),
    );
  }, [calculationMethod, cityCountry, dispatch]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isDownloading) {
          setModalVisible(true);
          return true;
        }
        return false; // Allow navigation
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isDownloading]),
  );

  const handleConfirmExit = () => {
    setModalVisible(false);
    BackHandler.exitApp();
  };

  const handleCancelExit = () => {
    setModalVisible(false);
  };

  const {location, cityCountry} = useLocation();
  const prayersTiming = useSelector(state => state?.prayerTiming?.timings);

  const prevCityCountryRef = useRef(null);

  useEffect(() => {
    if (
      cityCountry &&
      JSON.stringify(cityCountry) !== JSON.stringify(prevCityCountryRef.current)
    ) {
      prevCityCountryRef.current = cityCountry;
      const date = new Date();
      dispatch(
        fetchTimings({
          city: cityCountry.city,
          country: cityCountry.country,
          calculationMethod: calculationMethod,
          date: date,
        }),
      );
    }
  }, [cityCountry, calculationMethod, dispatch]);

  return {
    prayersTiming,
    handleConfirmExit,
    handleCancelExit,
    modalVisible,
    navigation,
  };
};

export default useHome;
