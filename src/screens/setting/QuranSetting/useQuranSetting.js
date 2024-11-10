import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSetting,
  loadSettings,
} from '../../../store/slices/userSettingsSlice';
import {
  FONT_SIZE_OPTIONS,
  LANGUAGE_OPTIONS,
  PLAY_PREFRENCE,
  QURAN_SCRIPT_OPTIONS,
  RECITER_OPTIONS,
  TRANSLATION_OPTIONS,
} from '../../../constants/SettingOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const useQuranSetting = () => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state?.settings); // Getting global state from Redux

  const [modalVisible, setModalVisible] = useState(false);
  const [currentSetting, setCurrentSetting] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const getOptions = currentSetting => {
    switch (currentSetting) {
      case 'fontSize':
        return FONT_SIZE_OPTIONS;
      case 'quranScript':
        return QURAN_SCRIPT_OPTIONS;
      case 'reciter':
        return RECITER_OPTIONS;
      case 'translation':
        return TRANSLATION_OPTIONS;
      case 'playPrefrence':
        return PLAY_PREFRENCE;
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

  const selectOption = value => {
    const options = getOptions(currentSetting);
    const selectedOption = options.find(option => option.value === value);

    if (selectedOption) {
      saveSetting(currentSetting, value, selectedOption.label);
    }
    setModalVisible(false);
  };

  const navigation = useNavigation();

  return {
    settings,
    modalVisible,
    currentSetting,
    selectedOption,
    audioSettings,
    toggleAudioSetting,
    saveSetting,
    openModal,
    selectOption,
    getOptions,
    setModalVisible,
    navigation,
  };
};

export default useQuranSetting;
