import {useState, useEffect, useRef} from 'react';
import quranDatas from '../../../constants/merged_quran.json';
import {quranData} from '../../../constants/METADATA';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useQuranPage = ({data, type,isActive}) => {
  const [search, setSearch] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedAyah, setSelectedAyah] = useState(null);
  const [ayahOptions, setAyahOptions] = useState([]);
  const [ayahDetails, setAyahDetails] = useState(null);
  const [surah, setSurah] = useState([]);
  const [myType, setMyType] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (selectedSurah) {
      const surah = quranDatas.surahs.find(s => s.number === selectedSurah);
      setSurah(surah);
      setMyType('Surah');
    } else {
      console.error('Surah not found');
    }
  }, [selectedSurah]);
  const surahItems = quranData.data.surahs.references.map(surah => ({
    label: surah.englishName,
    value: surah.number,
    ayah: surah.numberOfAyahs,
  }));

  useEffect(() => {
    if (selectedSurah) {
      const selectedSurahData = surahItems.find(
        item => item.value === selectedSurah,
      );
      if (selectedSurahData) {
        const options = Array.from({length: selectedSurahData.ayah}, (_, i) =>
          (i + 1).toString(),
        );
        setAyahOptions(options);
      } else {
        setAyahOptions(null);
      }
    }
  }, [selectedSurah]);

  const handleReadingMode = async() => {
    setReadingMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        const surahInfo = {
          name: surah?.englishName || data?.englishName,
          number: surah?.number || data?.number
        };
        AsyncStorage.setItem('lastReadSurah', JSON.stringify(surahInfo))
          .catch(error => console.error('Error saving last read surah', error));
      }
      return newMode;
    });
  };
  

  const handleSearchChange = text => {
    setSearch(text);
  };

  const getAyahs = () => {
    if (type === 'Surah') {
      return data.ayahs;
    }
    return data;
  };

  let scrollTimeout = null; // Variable to hold the timeout reference

  const handleScroll = event => {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    console.log(scrollOffset);

    if (scrollOffset > 50 && !isScrolling) {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
    } else if (isScrolling) {
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 10000); // Adjust the duration as needed
    }
  };



  useEffect(() => {
    const loadTimer = async () => {
      try {
        const storedTimer = await AsyncStorage.getItem('quranPageTimer');
        if (storedTimer) {
          setTimer(parseInt(storedTimer, 10));
        }
      } catch (error) {
        console.error('Error loading timer', error);
      }
    };

    loadTimer();
  }, []);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer + 1;
          AsyncStorage.setItem('quranPageTimer', newTimer.toString());
          return newTimer;
        });
      }, 60000); // Increment every minute
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  const toggleHeaderVisibility = () => {
    setIsHeaderVisible(prevState => !prevState);
  };
  return {
    search,
    isScrolling,
    readingMode,
    handleReadingMode,
    handleSearchChange,
    getAyahs,
    handleScroll,
    currentAyah,
    setCurrentAyah,
    selectedSurah,
    setSelectedSurah,
    selectedAyah,
    setSelectedAyah,
    ayahOptions,
    setAyahOptions,
    ayahDetails,
    setCurrentAyah,
    surah,
    surahItems,
    myType,
    timer,
    setTimer,
    isHeaderVisible,
    toggleHeaderVisibility,
  };
};

export default useQuranPage;
