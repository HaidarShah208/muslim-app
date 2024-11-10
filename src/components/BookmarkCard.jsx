import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';
import QuranImage from '../assets/images/quran.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BookmarkCard = ({title, icon: Icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
      <Icon width={150} height={175} />
    </TouchableOpacity>
  );
};

export default BookmarkCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 30,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
});
