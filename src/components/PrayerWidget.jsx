import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';

// dummyData.js
export const prayersData = {
  date: '07 Dhul-Hijjah 1445',
  now: {prayer: 'Jummah', time: '01:00 PM'},
  suhur: '04:45 AM',
  prayers: [
    {name: 'Fajr', time: '04:50 AM'},
    {name: 'Dhuhr', time: '12:30 PM'},
    {name: 'Asr', time: '03:45 PM'},
    {name: 'Maghrib', time: '06:50 PM'},
    {name: 'Isha', time: '08:20 PM'},
  ],
  timeLeft: '01 : 16 : 45',
};

const PrayerWidget = () => {
  const {date, now, suhur, prayers, timeLeft} = prayersData;
  return (
    <View style={styles.prayersWidget}>
      <Text style={styles.dateText}>{date}</Text>
      <View style={styles.flexContainer}>
        <View style={styles.todayDetails}>
          <Text style={styles.prayerNow}>Now : {now.prayer}</Text>
          <View style={styles.startTimeContainer}>
            <Text style={styles.startTime}>{now.time}</Text>
            <Text style={styles.startTimeText}>(Start Time)</Text>
          </View>
          <Text style={styles.prayerNow}>Suhur: {suhur}</Text>
        </View>
        <View style={styles.timeLeft}>
          <Text style={styles.smallText}>Time</Text>
          <Text style={styles.timeLeftText}>{timeLeft}</Text>
          <Text style={styles.smallText}>Left</Text>
        </View>
      </View>
      <View style={styles.prayerParentContainer}>
        {prayers.map((prayer, index) => (
          <View key={index} style={styles.prayerChild}>
            <View style={styles.circle} />
            <Text style={styles.prayerText}>{prayer.name}</Text>
            <Text style={styles.prayerTime}>{prayer.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PrayerWidget;

const styles = StyleSheet.create({
  prayersWidget: {
    backgroundColor: COLORS.PRIMARYLIGHTGREEN,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  dateText: {
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.PRIMARYWHITE,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayDetails: {},
  timeLeft: {
    height: 41,
    width: 115,
    backgroundColor: COLORS.PRIMARYWHITE,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerNow: {
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  startTime: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  startTimeText: {
    fontSize: 8,
    fontWeight: '400',
    color: COLORS.BLACK,
    marginLeft: 5,
  },
  startTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  timeLeftText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  smallText: {
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  prayerText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  prayerTime: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginTop: 10,
  },
  prayerChild: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerParentContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARYGREEN,
    marginBottom: 5,
  },
});
