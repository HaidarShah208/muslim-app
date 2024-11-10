import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../constants/COLORS';
import ArraowLeft from '../assets/icons/arrowLeftLong.svg';
import ArraowRight from '../assets/icons/arrowRightLong.svg';

const CalendarHeader = ({currentDate, onPrevMonth, onNextMonth}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPrevMonth}>
        <Text style={styles.navButton}>
          <ArraowLeft />
        </Text>
      </TouchableOpacity>
      <Text style={styles.monthText}>{currentDate.format('iMMMM iYYYY')}</Text>
      <TouchableOpacity onPress={onNextMonth}>
        <Text style={styles.navButton}>
          <ArraowRight />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  navButton: {
    fontSize: 24,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.DARKGREEN,
  },
});

export default CalendarHeader;
