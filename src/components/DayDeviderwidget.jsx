import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';

const DayDeviderwidget = ({prayersTiming}) => {
  if (!prayersTiming || !prayersTiming.data) {
    return null; // or return a fallback UI
  }
  const {timings} = prayersTiming.data; // Destructure timings from the data prop

  // Function to convert 24-hour time to 12-hour format
  const convertTo12HourFormat = time => {
    const [hour, minute] = time.split(':');
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute} ${period}`;
  };

  // Calculate Mid Day if not available
  const calculateMidDay = (sunrise, sunset) => {
    const [sunriseHour, sunriseMinute] = sunrise.split(':').map(Number);
    const [sunsetHour, sunsetMinute] = sunset.split(':').map(Number);

    const sunriseInMinutes = sunriseHour * 60 + sunriseMinute;
    const sunsetInMinutes = sunsetHour * 60 + sunsetMinute;

    const midDayInMinutes = Math.floor(
      (sunriseInMinutes + sunsetInMinutes) / 2,
    );

    const midDayHour = Math.floor(midDayInMinutes / 60);
    const midDayMinute = midDayInMinutes % 60;

    return `${midDayHour.toString().padStart(2, '0')}:${midDayMinute
      .toString()
      .padStart(2, '0')}`;
  };

  const sunrise = timings.Sunrise;
  const sunset = timings.Sunset;
  const midDay = timings['Mid Day'] || calculateMidDay(sunrise, sunset);

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.leftSection]}>
        <Text style={styles.text}>Sunrise</Text>
        <Text style={styles.time}>{convertTo12HourFormat(sunrise)}</Text>
      </View>

      {/* Divider between the first and second sections */}
      <View style={styles.divider} />

      <View style={[styles.section, styles.middleSection]}>
        <Text style={styles.text}>Mid Day</Text>
        <Text style={styles.time}>{convertTo12HourFormat(midDay)}</Text>
      </View>

      {/* Divider between the second and third sections */}
      <View style={styles.divider} />

      <View style={[styles.section, styles.rightSection]}>
        <Text style={styles.text}>Sunset</Text>
        <Text style={styles.time}>{convertTo12HourFormat(sunset)}</Text>
      </View>
    </View>
  );
};

export default DayDeviderwidget;

const styles = StyleSheet.create({
  container: {
    height: 57,
    backgroundColor: COLORS.LIGHTGRAY,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  leftSection: {
    alignItems: 'flex-start', // Align text to the left
  },
  middleSection: {
    alignItems: 'center', // Align text to the center
  },
  rightSection: {
    alignItems: 'flex-end', // Align text to the right
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.PRIMARYGREEN,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 19,
    fontFamily: 'Poppins',
  },
  time: {
    color: COLORS.BLACK,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19,
    fontFamily: 'Poppins',
  },
});
