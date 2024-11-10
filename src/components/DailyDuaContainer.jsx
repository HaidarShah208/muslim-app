import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';
import FolowLine from '../assets/icons/followLine.svg';
import ShareIcon from '../assets/icons/shareIcon.svg';
import SaveIcon from '../assets/icons/saveIcon.svg';

// Dummy data object
const duaData = {
  englishText: 'When the sick have renouced all hope of life',
  arabicText:
    'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الأَعْلَى',
  translationText:
    'O Allah, forgive me and have mercy upon me and join me with the highest companions',
  referenceText: 'Al-Bukhari 7/10, Muslim 4/1893.',
};

const DailyDuaContainer = () => {
  const {englishText, arabicText, translationText, referenceText} = duaData;

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <FolowLine width={10} height={196} />
      </View>
      <View style={styles.duaContainer}>
        <View style={styles.duaEngContainer}>
          <Text style={styles.duaTextEng}>
            {englishText}
            <Text style={styles.underline}> </Text>
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <ShareIcon width={15} height={17} stycle={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <SaveIcon width={15} height={17} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.arabicContainer}>
          <Text style={styles.arabicText}>{arabicText}</Text>
        </View>
        <View style={styles.translationContainer}>
          <Text style={styles.translationText}>{translationText}</Text>
        </View>
        <View style={styles.referenceContainer}>
          <Text style={styles.referenceText}>{referenceText}</Text>
        </View>
      </View>
    </View>
  );
};

export default DailyDuaContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  lineContainer: {
    justifyContent: 'center',
    marginRight: 3,
  },
  duaContainer: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: COLORS.PRIMARYWHITE,
    padding: 15,
  },
  duaEngContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  duaTextEng: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
    fontWeight: '500',
    flex: 1,
    textDecorationLine: 'underline',
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  arabicContainer: {
    marginTop: 10,
  },
  arabicText: {
    fontSize: 18,
    color: COLORS.PRIMARYGREEN,
    fontFamily: 'Poppins',
    fontWeight: '600',
    textAlign: 'right',
  },
  translationContainer: {
    marginTop: 10,
  },
  translationText: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  referenceContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  referenceText: {
    fontSize: 10,
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
});
