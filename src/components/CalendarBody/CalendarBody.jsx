import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment-hijri';
import {COLORS} from '../../constants/COLORS';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import EventDetailModal from '../EventDetailBody';
import useCalendarBody from './useCalendarBody';

const CalendarBody = ({currentDate}) => {
 const {
  modalVisible,
  selectedDate,
  selectedEvents,
  handlePress,
  isEvent,
  eventDetail,
  getSpecialMessage,
  days,
  WEEKDAY_NAMES_ARABIC,
 }=useCalendarBody(currentDate, )



  return (
    <View style={styles.bodyContainer}>
      {days.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.calandarContainer}>
          <View style={styles.weekContainer}>
            {week.map((day, dayIndex) => {
              const detail = eventDetail(day);
              return (
                <TouchableOpacity
                  key={dayIndex}
                  onPress={() => handlePress(day, detail?.id)}>
                  <View
                    style={[
                      {
                        backgroundColor: day.isSame(moment(), 'day')
                          ? '#deefea'
                          : 'transparent',
                      },
                      styles.box,
                    ]}>
                    <Text
                      style={{
                        color: day.isSame(currentDate, 'day')
                          ? COLORS.DARKGREEN
                          : isEvent(day)
                          ? 'red'
                          : 'black',
                        fontWeight: day.isSame(moment(), 'day')
                          ? '900'
                          : 'normal',
                      }}>
                      {WEEKDAY_NAMES_ARABIC[day.format('dddd')]}{' '}
                    </Text>
                    <Text
                      style={[
                        styles.day,
                        {
                          color: day.isSame(currentDate, 'day')
                            ? COLORS.DARKGREEN
                            : isEvent(day)
                            ? 'red'
                            : 'black',
                          fontWeight: day.isSame(moment(), 'day')
                            ? '900'
                            : 'normal',
                        },
                      ]}>
                      {day.iDate()}
                    </Text>
                    <Text
                      style={{
                        color: day.isSame(currentDate, 'day')
                          ? COLORS.DARKGREEN
                          : isEvent(day)
                          ? 'red'
                          : 'black',
                        fontWeight: day.isSame(moment(), 'day')
                          ? '900'
                          : 'normal',
                      }}>
                      {day.format('dd')}
                    </Text>
                    {getSpecialMessage(day) && (
                      <View
                        style={{
                          backgroundColor: COLORS.LIGHTGREEN15,
                          borderRadius: 12,
                          gap: 2,
                        }}>
                        <Text style={styles.eventText}>
                          {getSpecialMessage(day)}
                        </Text>
                      </View>
                    )}
                    {detail && (
                      <Text style={styles.title}>
                        {detail.title.length > 2
                          ? detail.title.substring(0, 3) + '...'
                          : detail.title}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
       <EventDetailModal
        visible={modalVisible}
        events={selectedEvents}
        date={selectedDate}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  calandarContainer: {flexDirection: 'column'},
  box: {
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 13,

    width: 53,
    height: 100,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  weekDay: {
    width: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  day: {
    width: 50,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  eventText: {
    fontSize: 12,
    color: COLORS.DARKGREEN,
    width: 100,
    textAlign: 'center',
    paddingLeft: 10,
  },
  title: {
    textAlign: 'center',
    color: COLORS.DARKGREEN,
  },
});

export default CalendarBody;
