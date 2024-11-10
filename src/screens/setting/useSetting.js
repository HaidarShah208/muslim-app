import {useState, useEffect} from 'react';
import {
  setSetting,
  loadSettings,
  loadSettingsFromStorage,
} from '../../store/slices/userSettingsSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FONT_SIZE_OPTIONS,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
} from '../../constants/SettingOptions';

const useSetting = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state?.settings); // Getting global state from Redux

  const [notificationSetting, setNotificationSetting] = useState({
    enhancements: false,
    noiseReduction: false,
    loudnessNormalization: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentSetting, setCurrentSetting] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    dispatch(loadSettingsFromStorage());
  }, [dispatch]);

  const getOptions = currentSetting => {
    switch (currentSetting) {
      case 'language':
        return LANGUAGE_OPTIONS;
      case 'fontSize':
        return FONT_SIZE_OPTIONS;
      case 'theme':
        return THEME_OPTIONS;
      default:
        return [];
    }
  };

  const saveSetting = async (key, value, label) => {
    try {
      dispatch(setSetting({key, value, label}));

      const updatedSettings = {...settings, [key]: {label, value}};
      await AsyncStorage.setItem(
        'userSettings',
        JSON.stringify(updatedSettings),
      );
    } catch (error) {
      console.error('Failed to save setting:', error);
    }
  };

  const openModal = setting => {
    setCurrentSetting(setting);
    setModalVisible(true);
    setSelectedOption(settings[setting]);
  };

  const selectOption = value => {
    const options = getOptions(currentSetting);
    const selectedOption = options.find(option => option.value === value);

    if (selectedOption) {
      saveSetting(currentSetting, value, selectedOption.label);
    }
    setModalVisible(false);
  };

  const toggleNotificationSetting = key => {
    setNotificationSetting(prevSettings => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  return {
    notificationsOptions: [
      {
        label1: 'Push',
        label2: 'Notification',
        enabled: notificationSetting.enhancements,
        onToggle: () => toggleNotificationSetting('enhancements'),
      },
      {
        label1: 'Email',
        label2: 'Notification',
        enabled: notificationSetting.noiseReduction,
        onToggle: () => toggleNotificationSetting('noiseReduction'),
      },
      {
        label1: 'In App',
        label2: 'Notification',
        enabled: notificationSetting.loudnessNormalization,
        onToggle: () => toggleNotificationSetting('loudnessNormalization'),
      },
    ],
    toggleNotificationSetting,
    notificationSetting,
    settings,
    openModal,
    getOptions,
    saveSetting,
    currentSetting,
    selectedOption,
    modalVisible,
    selectOption,
    setModalVisible,
    setCurrentSetting,
  };
};

export default useSetting;
