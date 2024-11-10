import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import ArrowRight from '../assets/icons/arrowRightLong.svg';
import ArrowLeft from '../assets/icons/arrowLeftLong.svg';
import {COLORS} from '../constants/COLORS';
import moment from 'moment-hijri';

const NamazDateTimeNavigator = ({onNextDay, onPreviousDay, onDateChange}) => {
  
  const [currentDate, setCurrentDate] = useState(moment());
  useEffect(() => {
    if (onDateChange) {
      onDateChange(currentDate);
    }
  }, [currentDate, onDateChange]);


  const handleNextDay = () => {
    const nextDate = moment(currentDate).add(1, 'days');
    setCurrentDate(nextDate);
    onNextDay && onNextDay(nextDate);  
  };

  const handlePreviousDay = () => {
    const previousDate = moment(currentDate).subtract(1, 'days');
    setCurrentDate(previousDate);
    onPreviousDay && onPreviousDay(previousDate);  
  };
  const currentHijriDate = currentDate.format('iDD iMMMM, iYYYY ');
  const currentGregorianDate = currentDate.format('ddd, DD MMMM YYYY');
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePreviousDay}>
        <ArrowLeft width={20} height={20} />
      </TouchableOpacity>
      <View style={styles.dateContainer}>
        <Text style={styles.arabicDate}>{currentHijriDate}</Text>
        <Text style={styles.englishDate}>{currentGregorianDate}</Text>
      </View>
      <TouchableOpacity onPress={handleNextDay}>
        <ArrowRight width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default NamazDateTimeNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arabicDate: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: COLORS.PRIMARYGREEN,
  },
  englishDate: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: COLORS.GRAY,
  },
});
