import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment-hijri';
import CalendarHeader from '../../components/CalendarHeader';
import CalendarBody from '../../components/CalendarBody/CalendarBody';
import CustomHeader from '../../components/CustomHeader';
import ScheduleWidget from '../../components/ScheduleWidget';
import axios from 'axios';

const HijriCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'iMonth'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'iMonth'));
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader />
        </View>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <View style={styles.calendarWrapper}>
          <CalendarBody currentDate={currentDate} />
        </View>
        <View>
          <ScheduleWidget title="Schedule Today" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {paddingBottom: 20, flex: 1, backgroundColor: 'white'},
  container: {
    padding: 27,
  },
  calendarWrapper: {paddingHorizontal: 12},
});

export default HijriCalendar;
