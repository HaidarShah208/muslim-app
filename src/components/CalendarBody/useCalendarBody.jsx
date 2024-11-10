import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function useCalendarBody(currentDate) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const startOfMonth = currentDate.clone().startOf('iMonth');
  const endOfMonth = currentDate.clone().endOf('iMonth');
  const days = [];
  const day = startOfMonth.clone().startOf('week');
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

  const isEvent = day => {
    return events.some(event => moment(event.day).isSame(day, 'day'));
  };
  const eventDetail = day => {
    return events.find(event => moment(event.day).isSame(day, 'day'));
  };
  const WEEKDAY_NAMES_ARABIC = {
    Sunday: 'الأحد',
    Monday: 'الإثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت',
  };
  while (day.isBefore(endOfMonth.endOf('week'), 'day')) {
    days.push(
      Array(6)
        .fill(0)
        .map(() => day.add(1, 'day').clone()),
    );
  }

  const getEventsForDay = day => {
    return events.filter(event => moment(event.day).isSame(day, 'day'));
  };

  const handlePress = day => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setSelectedEvents(dayEvents);
      setSelectedDate(day);
      setModalVisible(true);
    } else {
      navigation.navigate('calendarEvent', {day: day.format()});
    }
  };
  return {
    modalVisible,
    selectedDate,
    selectedEvents,
    handlePress,
    isEvent,
    eventDetail,
    getSpecialMessage,
    days,
    WEEKDAY_NAMES_ARABIC,
  };
}
