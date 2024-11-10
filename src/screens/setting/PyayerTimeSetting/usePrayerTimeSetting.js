import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSetting} from '../../../store/slices/userSettingsSlice';
import {
  CALCULATION_METHOD_OPTIONS,
  FONT_SIZE_OPTIONS,
  JURISTIC_OPTIONS,
  LANGUAGE_OPTIONS,
  QURAN_SCRIPT_OPTIONS,
  RECITER_OPTIONS,
  THEME_OPTIONS,
  TRANSLATION_OPTIONS,
} from '../../../constants/SettingOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePrayerTimeSetting = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state?.settings); // Accessing global state from Redux

  const [modalVisible, setModalVisible] = useState(false);
  const [currentSetting, setCurrentSetting] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const getOptions = currentSetting => {
    switch (currentSetting) {
      case 'juristicMethod':
        return JURISTIC_OPTIONS;
      case 'calculationMethod':
        return CALCULATION_METHOD_OPTIONS;
      default:
        return [];
    }
  };

  // State management for audio settings
  const [audioSettings, setAudioSettings] = useState({
    enhancements: false,
    noiseReduction: false,
    loudnessNormalization: false,
  });

  // Handler to toggle audio setting options
  const toggleAudioSetting = key => {
    setAudioSettings(prevSettings => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const notificationOptions = [
    {
      label1: 'Prayer',
      label2: 'Reminders',
      enabled: audioSettings.enhancements,
      onToggle: () => toggleAudioSetting('enhancements'),
    },
    {
      label1: 'Pre-Prayer',
      label2: 'Alert',
      enabled: audioSettings.noiseReduction,
      onToggle: () => toggleAudioSetting('noiseReduction'),
    },
    {
      label1: 'Custom',
      label2: 'Notification Sounds',
      enabled: audioSettings.loudnessNormalization,
      onToggle: () => toggleAudioSetting('loudnessNormalization'),
    },
  ];

  const saveSetting = async (key, value, label) => {
    try {
      dispatch(setSetting({key, value, label}));

      const updatedSettings = {...settings, [key]: {label, value}};
      await AsyncStorage.setItem(
        'userSettings',
        JSON.stringify(updatedSettings),
      );
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const openModal = setting => {
    setCurrentSetting(setting);
    setModalVisible(true);
    setSelectedOption(settings[setting]);
  };

  // const selectOption = value => {
  //   const options = getOptions(currentSetting);
  //   const selectedOption = options.find(option => option.value === value);

  //   if (selectedOption) {
  //     saveSetting(currentSetting, value, selectedOption.label);
  //   }
  //   setModalVisible(false);
  // };

  const selectOption = value => {
    const options = getOptions(currentSetting);
    const selected = options.find(option => option.value === value);

    if (selected) {
      saveSetting(currentSetting, value, selected.label);
      setSelectedOption(value); // Ensure this is setting the selected option
      console.log('Selected option:', value);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    console.log('Selected Option:', selectedOption);
  }, [selectedOption]);
  return {
    settings,
    modalVisible,
    currentSetting,
    selectedOption,
    audioSettings,
    notificationOptions,
    toggleAudioSetting,
    saveSetting,
    openModal,
    selectOption,
    getOptions,
    setModalVisible,
  };
};

export default usePrayerTimeSetting;
