import {useState, useEffect} from 'react';
import {quranData} from '../../constants/METADATA';
import {useNavigation} from '@react-navigation/native';

const useQuran = () => {
  const navigation = useNavigation();
  const [activeOption, setActiveOption] = useState('Surah');

  const handleOptionPress = option => {
    setActiveOption(option);
  };
  const surahList = quranData.data.surahs?.references;
  const juzhList = quranData.data.juzs?.references;
  const rukuList = quranData.data.rukus?.references;
  const hizbList = quranData.data.hizbs?.references;
  const manzilList = quranData.data.manzils?.references;

  const isOptionActive = option => activeOption === option;

  const getActiveList = () => {
    switch (activeOption) {
      case 'Surah':
        return surahList;
      case 'Juzh':
        return juzhList;
      case 'Ruku':
        return rukuList;
      case 'Manzil':
        return manzilList;
      default:
        return [];
    }
  };
  const activeList = getActiveList();

  // Helper functions
  const getSurahByNumber = (quranData, surahNumber) => {
    return (
      quranData.surahs.find(surah => surah.number === surahNumber) || {
        ayahs: [],
      }
    );
  };

  const getAyahsByJuz = (quranData, juzNumber) => {
    return quranData.surahs.flatMap(surah =>
      surah.ayahs.filter(ayah => ayah.juz === juzNumber),
    );
  };

  const getAyahsByRuku = (quranData, rukuNumber) => {
    return quranData.surahs.flatMap(surah =>
      surah.ayahs.filter(ayah => ayah.ruku === rukuNumber),
    );
  };

  const getAyahsByManzil = (quranData, manzilNumber) => {
    return quranData.surahs.flatMap(surah =>
      surah.ayahs.filter(ayah => ayah.manzil === manzilNumber),
    );
  };

  const getAyahsByPage = (quranData, pageNumber) => {
    return quranData.surahs.flatMap(surah =>
      surah.ayahs.filter(ayah => ayah.page === pageNumber),
    );
  };

  const getAyahsByHizbQuarter = (quranData, hizbQuarterNumber) => {
    return quranData.surahs.flatMap(surah =>
      surah.ayahs.filter(ayah => ayah.hizbQuarter === hizbQuarterNumber),
    );
  };

  const getSurahByPageNumber = (quranData, pageNumber) => {
    if (!quranData || !quranData.surahs) {
      console.error('Quran data or surahs list is undefined');
      return null;
    }
    const surah = quranData?.surahs?.find(surah =>
      surah.ayahs.some(ayah => ayah.page === pageNumber),
    );
    return surah || null;
  };

  return {
    activeOption,
    handleOptionPress,
    surahList,
    juzhList,
    rukuList,
    hizbList,
    manzilList,
    isOptionActive,
    getActiveList,
    activeList,
    getSurahByNumber,
    getAyahsByJuz,
    getAyahsByRuku,
    getAyahsByManzil,
    getAyahsByPage,
    getAyahsByHizbQuarter,
    getSurahByPageNumber,
    navigation,
  };
};

export default useQuran;
