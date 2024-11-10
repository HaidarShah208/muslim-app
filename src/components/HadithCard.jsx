import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Plus from '../assets/hadith/plus.svg';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../constants/COLORS';
import ReadMore from '../assets/hadith/Add.svg';
import ShareButton from '../assets/hadith/Share1.svg';
import BookMark from '../assets/hadith/bookmark.svg';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import {addHadithBookmark} from '../store/slices/bookmarkSlice';

const HadithCard = ({data, No, allData}) => {
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const truncateText = (text, wordLimit = 40) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleSaveHadith = async () => {
    if (data) {
      console.log('Hadith:', {bookName:data.book.bookSlug,hadithNumber:data.hadithNumber});
      dispatch(addHadithBookmark({bookName:data.book.bookSlug,hadithNumber:data.hadithNumber}));
      Alert.alert('Hadith saved successfully');
    } else {
      Alert.alert('Hadith is undefined or empty');
    }
  };

  const handleShareText = () => {
    const message = `${data?.hadithArabic} \n ${data?.hadithEnglish} \n ${data?.book?.bookSlug}_______${data?.hadithNumber}`;
    Share.open({
      message,
      title: 'Share Hadith',
    }).catch(err => console.log(err));
  };

  return (
    <View>
      <Text style={{color: '#000', fontSize: 44, fontFamily: 'Popins'}}>
        {No}.
      </Text>
      <Text style={styles.Narrator}>
        Narrator:{' '}
        {data?.englishNarrator
          ? data?.englishNarrator
          : data?.hadithEnglish.split(':')[0].split(' ').splice(1).join(' ')}
      </Text>
      <View style={styles.Card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('readMore', {data: data, allData: allData})
          }>
          <Text style={styles.Hadith}>{truncateText(data?.hadithArabic)}</Text>
          <Text style={[styles.Hadith, {marginTop: 10}]}>
            {truncateText(data?.hadithEnglish)}
          </Text>
        </TouchableOpacity>
        <View style={styles.BookDetails}>
          <View>
            <Text style={styles.text}>Status: {data?.status}</Text>
            <Text style={styles.text}>Book Name:{data?.book?.bookName}</Text>
          </View>
          <TouchableOpacity
            style={{alignItems: 'center', position: 'relative'}}
            onPress={() => setShowButtons(!showButtons)}>
            <Plus />
            <Text
              style={{color: '#000', fontWeight: '600', fontFamily: 'Popins'}}>
              More
            </Text>
          </TouchableOpacity>
          {showButtons && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.button1]}
                onPress={handleSaveHadith}>
                <BookMark />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.button2]}
                onPress={handleShareText}>
                <ShareButton />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.button3]}
                onPress={() =>
                  navigation.navigate('readMore', {
                    data: data,
                    allData: allData,
                  })
                }>
                <ReadMore />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HadithCard;

const styles = StyleSheet.create({
  Narrator: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 15,
    maxWidth: '90%',
    fontFamily: 'Poppins',
  },
  Card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 20,
    padding: 15,
  },
  Hadith: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 30,
    fontFamily: 'Poppins',
  },
  BookDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -150,
    right: 20,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  button1: {
    position: 'absolute',
    left: 10,
    top: -145,
  },
  button2: {
    top: 105,
    right: -15,
  },
  button3: {
    top: 95,
    left: -30,
  },
});
