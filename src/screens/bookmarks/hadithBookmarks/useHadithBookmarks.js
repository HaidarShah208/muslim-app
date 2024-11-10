import {useDispatch, useSelector} from 'react-redux';
import {loadBookmarks} from '../../../store/slices/bookmarkSlice';
import {useEffect} from 'react';
import sahihBukhari from '../../../constants/sahih-bukhari.json';
import sahihMuslim from '../../../constants/sahih-muslim.json';
import alTirmidhi from '../../../constants/al-tirmidhi.json';
import abuDawood from '../../../constants/abu-dawood.json';
import SunanNasai from '../../../constants/sunan-nasai.json';
import ibneMajah from '../../../constants/ibn-e-majah.json';
import {useNavigation} from '@react-navigation/native';

const useHadithBookmarks = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const hadithBookmarks = useSelector(
    state => state?.bookmarks?.bookmarkedHadiths,
  );
  useEffect(() => {
    dispatch(loadBookmarks()); // Load bookmarks when the component mounts
  }, [dispatch]);

  const handleBookmarkPress = (book, hadith) => {
    if (book == 'sahih-bukhari') {
     const data =  sahihBukhari.hadiths.data.filter((item)=> item.hadithNumber === hadith)
     const alldata = sahihBukhari.hadiths.data.filter((item)=>item?.chapter?.chapterNumber === data[0]?.chapter?.chapterNumber);
      navigation.navigate('readMore', {
        data: data,
        allData: alldata,
      });
    } else if (book == 'sahih-muslim') {
   
      const data =  sahihMuslim.hadiths.data.filter((item)=> item.hadithNumber === hadith)
      const alldata = sahihMuslim.hadiths.data.filter((item)=>item?.chapter?.chapterNumber === data[0]?.chapter?.chapterNumber);
       navigation.navigate('readMore', {
         data: data,
         allData: alldata,
       });
  
    } else if (book == 'al-tirmidhi') {
      const data =  alTirmidhi.hadiths.data.filter((item)=> item.hadithNumber === hadith)
      const alldata = alTirmidhi.hadiths.data.filter((item)=>item?.chapter?.chapterNumber === data[0]?.chapter?.chapterNumber);
      navigation.navigate('readMore', {
        data: data,
        allData: alldata,
      });
    
  
    } else if (book == 'abu-dawood') {
      const data =  abuDawood.hadiths.data.filter((item)=> item.hadithNumber === hadith)
      const alldata = abuDawood.hadiths.data.filter((item)=>item?.chapter?.chapterNumber === data[0]?.chapter?.chapterNumber);
      navigation.navigate('readMore', {
        data: data,
        allData: alldata,
      });
    } else if (book == 'sunan-nasai') {
      const data =  SunanNasai.hadiths.data.filter((item)=> item.hadithNumber === hadith)
      const alldata = SunanNasai.hadiths.data.filter((item)=>item?.chapter?.chapterNumber === data[0]?.chapter?.chapterNumber);
      navigation.navigate('readMore', {
        data: data,
        allData: alldata,
      });
    } else if (book == 'ibn-e-majah') {
      const data =  ibneMajah.hadiths.data.filter((item)=> item.hadithNumber === hadith)
      const alldata = ibneMajah.hadiths.data.filter((item)=>item?.chapter?.chapterNumber === data[0]?.chapter?.chapterNumber);
      navigation.navigate('readMore', {
        data: data,
        allData: alldata,
      });
    } else {
      console.log('else', book);
    }
  };

  const handleRemoveBookmark = hadith => {
    console.log('Hadith:', hadith);
  };
  return {
    hadithBookmarks,
    handleBookmarkPress,
    handleRemoveBookmark,
  };
};

export default useHadithBookmarks;
