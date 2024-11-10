import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';
import {useNavigation} from '@react-navigation/native';
import quranData from '../constants/merged_quran.json';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};
const ContentCard = ({
  data,
  type,
  getSurahByNumber,
  getAyahsByJuz,
  getAyahsByRuku,
  getAyahsByManzil,
  getAyahsByPage,
  getAyahsByHizbQuarter,
  index
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    let filteredData;
    switch (type) {
      case 'Surah':
        filteredData = getSurahByNumber(quranData, data.number);
        break;
      case 'Juzh':
        filteredData = getAyahsByJuz(quranData, data.number);
        break;
      case 'Ruku':
        filteredData = getAyahsByRuku(quranData, data.number);
        break;
      case 'Manzil':
        filteredData = getAyahsByManzil(quranData, data.number);
        break;
      case 'Page':
        filteredData = getAyahsByPage(quranData, data.number);
        break;
      case 'HizbQuarter':
        filteredData = getAyahsByHizbQuarter(quranData, data.number);
        break;
      default:
        filteredData = null;
    }
    navigation.navigate('QuranPage', {data: filteredData, type});
  };

  const renderContent = () => {
    switch (type) {
      case 'Surah':
        return (
          <View style={styles.textContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.indexMain}>
                <Text style={styles.indexText}>{index}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={styles.textGroup}>
                  <Text style={styles.nameText}>
                    {truncateText(data?.englishName, 4)}
                  </Text>
                  <Text style={styles.verseText}>
                    Verses : {data?.numberOfAyahs}
                  </Text>
                  <Text style={styles.nameTranslation}>
                    {truncateText(data?.englishNameTranslation, 4)}
                  </Text>
                </View>
                <Text style={styles.arabicText}>{data?.name}</Text>
              </View>
            </View>
          </View>
        );
      case 'Juzh':
        return (
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>
              {truncateText(data?.englishName, 3)}
            </Text>
            <Text style={styles.arabicText}>{data?.arabicName}</Text>
          </View>
        );
      case 'Ruku':
        return (
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Ruku {data?.number}</Text>
            <Text style={styles.verseText}>Surah: {data?.surah}</Text>
            <Text style={styles.nameTranslation}>Ayah: {data?.ayah}</Text>
          </View>
        );
      case 'Manzil':
        return (
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Manzil {data?.number}</Text>
            <Text style={styles.verseText}>Starting Surah: {data?.surah}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.contentCard} onPress={handlePress}>
      {renderContent()}
    </TouchableOpacity>
  );
};

export default ContentCard;

const styles = StyleSheet.create({
  contentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGRAY,
  },
  textContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textGroup: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  verseText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  nameTranslation: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
  },
  arabicText: {
    fontSize: 35,
    fontWeight: '400',
    color: COLORS.PRIMARYGREEN,
    textAlign:'right',
    fontFamily: 'KfgqpcHafsUthmanicScriptRegular-1jGEe',
  },
  indexText: {color: 'black',
    fontWeight:'500',
    fontSize:20,
    marginHorizontal:10,
  },
  indexMain:{justifyContent: 'center', alignItems: 'center',
  }
});
