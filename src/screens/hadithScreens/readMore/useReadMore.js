import {View, Text, Dimensions, Alert} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Tts from 'react-native-tts';
import Share from 'react-native-share';
import {useDispatch} from 'react-redux';
import {addHadithBookmark} from '../../../store/slices/bookmarkSlice';
const {width} = Dimensions.get('window');

const useReadMore = ({data, allData}) => {
  const [hadith, setHadith] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(null); 
   

  const dispatch = useDispatch();

  useEffect(() => {
    setHadith(data);
    return () => {
      Tts.stop();
      setIsPlaying(false);
    };
  }, []);

  useEffect(() => {
    // Update the hadith data only when the index is changed and not null
    if (index !== null) {
      console.log('Updated Index', index);
      setHadith(allData[index]);
    }
  }, [index, allData]); // Run when index changes



  useEffect(() => {
    // Find initial index when component mounts
    const initialIndex = allData.findIndex(item => item.hadithNumber === data.hadithNumber);
    
    if (initialIndex !== -1) {
      console.log('Initial Index', initialIndex);
      setIndex(initialIndex); // Set the index to the correct one

      // Immediately set hadith data after setting index
      setHadith(allData[initialIndex]);
    }
  }, [allData, data.hadithNumber]); // Only run on component mount


  const handlePlayPause = () => {
// console.log('ActiveHadith',hadith)
    if (isPlaying) {
      Tts.stop();
      setIsPlaying(false);
    } else {
      Tts.speak(hadith?.hadithEnglish);
      setIsPlaying(true);
    }
  };

  const handleShareText = () => {
    const message = `${hadith?.hadithArabic} \n ${hadith?.hadithEnglish} \n ${hadith.book.bookSlug}_______${hadith.hadithNumber}`;

    Share.open({
      message,
      title: 'Share Hadith',
    }).catch(err => console.log(err));
  };

  const handleSaveHadith = async () => {
    if (hadith) {
      console.log('Hadith:',{bookName:hadith?.book?.bookSlug,hadithNumber:hadith?.hadithNumber});
      dispatch(addHadithBookmark({bookName:hadith?.book?.bookSlug,hadithNumber:hadith?.hadithNumber}));
      Alert.alert('Hadith saved successfully');
    } else {
      Alert.alert('Hadith is undefined or empty');
    }
  };
  const handleShareAudio = async () => {
    console.log('Clicked Share');
  };



 

  return {
    hadith,
    index, setIndex,
    isPlaying,
    handlePlayPause,
    handleShareText,
    handleSaveHadith,
    handleShareAudio,
  };
};

export default useReadMore;