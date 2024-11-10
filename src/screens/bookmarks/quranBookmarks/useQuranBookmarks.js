import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addQuranBookmark,
  removeQuranBookmark,
} from '../../../store/slices/bookmarkSlice'; // Adjust the import path as needed
import {ToastAndroid} from 'react-native';

const useQuranBookmark = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bookmarkedPages = useSelector(state => state.bookmarks.bookmarkedPages);

  // Handle bookmarking/unbookmarking for Quran pages
  const handleBookmarkPress = pageNumber => {
    if (bookmarkedPages.includes(pageNumber)) {
      dispatch(removeQuranBookmark(pageNumber)); // Remove Quran page bookmark
      ToastAndroid.show('Bookmark Removed Successfully', ToastAndroid.SHORT);
    } else {
      dispatch(addQuranBookmark(pageNumber)); // Add Quran page bookmark
      ToastAndroid.show('Added to bookmark Successfully', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    console.log('Bookmarked Quran Pages:', bookmarkedPages);
  }, [bookmarkedPages]);

  const getAyahsByPage = (quranData, pageNumber) => {
    return quranData.surahs.flatMap(surah =>
      surah.ayahs.filter(ayah => ayah.page === pageNumber),
    );
  };

  const getSurahByPageNumber = (quranData, pageNumber) => {
    if (!quranData || !quranData.surahs) {
      console.error('Quran data or surahs list is undefined');
      return null;
    }
    const surah = quranData.surahs.find(surah =>
      surah.ayahs.some(ayah => ayah.page === pageNumber),
    );
    return surah || null;
  };

  // Navigate to bookmarked page
  const handleBookmarkView = (quranData, pageNumber) => {
    const surah = getSurahByPageNumber(quranData, pageNumber);
    if (surah) {
      const ayahsOnPage = surah.ayahs.filter(ayah => ayah.page === pageNumber);
      navigation.navigate('QuranPage', {
        data: surah,
        type: 'Surah',
      });
    } else {
      console.error('No surah found for this page number');
    }
  };

  useEffect(() => {
    console.log('Bookmarked Quran Pages:', bookmarkedPages);
  }, [bookmarkedPages]);

  return {
    bookmarkedPages,
    handleBookmarkPress,
    getAyahsByPage,
    handleBookmarkView,
  };
};

export default useQuranBookmark;
