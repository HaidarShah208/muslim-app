import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function useWeeklyCalendarBody(currentDate) {
    const navigation = useNavigation();
    const startOfWeek = currentDate.clone().startOf('week');
    const endOfWeek = currentDate.clone().endOf('week');
    const days = [];
    const events = useSelector(state => state.events.events);
    const specialDates = {
      '1-10': 'رأس السنة الهجرية',
      '9-1': 'عاشوراء',
      '10-1': 'عاشوراء',
      '12-3': 'المولد النبوي',
      '27-7': 'الإسراء والمعراج',
      '15-8': 'النصف من شعبان',
      '1-9': 'بداية رمضان',
      '27-9': 'ليلة القدر',
      '1-10': 'عيد الفطر',
      '9-12': 'يوم عرفة',
      '10-12': 'عيد الأضحى',
      '11-12': 'عيد الأضحى',
      '12-12': 'عيد الأضحى',
    };
  
    const getSpecialMessage = day => {
      const hijriDate = day.format('iD-iM');
      return specialDates[hijriDate] || null;
    };
  
    const isEvent = day => events.some(event => moment(event.day).isSame(day, 'day'));
    const eventDetail = day => events.find(event => moment(event.day).isSame(day, 'day'));
  
    const WEEKDAY_NAMES_ARABIC = {
      Sunday: 'الأحد',
      Monday: 'الإثنين',
      Tuesday: 'الثلاثاء',
      Wednesday: 'الأربعاء',
      Thursday: 'الخميس',
      Friday: 'الجمعة',
      Saturday: 'السبت',
    };
  
    let day = startOfWeek.clone().subtract(1, 'day');
    while (day.isBefore(endOfWeek, 'day')) {
      days.push(day.add(1, 'day').clone());
    }
  
    const handlePress = (day, id) => {
      navigation.navigate('calendarEvent', {
        day: day.format(),
        id: id,
      });
    };
  return (
  {
handlePress,isEvent,getSpecialMessage,WEEKDAY_NAMES_ARABIC,eventDetail,days
  }
  )
}