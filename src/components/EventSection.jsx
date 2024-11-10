import {View, Text, StyleSheet} from 'react-native';
import MoonEvents from '../assets/icons/moon.svg';
import PrayerHome from '../assets/icons/prayerHome.svg';
import EventHome from '../assets/icons/eventHome.svg';
import {COLORS} from '../constants/COLORS';

export default function EventSection() {
  const currentDate = new Date();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDay = daysOfWeek[currentDate.getDay()];
  const currentDateNumber = currentDate.getDate();
  return (
    <View style={styles.eventMain}>
      <View style={styles.eventFirst}>
        <View style={styles.eventImages}>
          <MoonEvents />
          <PrayerHome style={{marginHorizontal: 3}} />
          <EventHome />
          <Text style={styles.eventText}>+4</Text>
        </View>
        <Text style={styles.eventHeading}>Next Event in</Text>
        <Text style={{color: 'white', fontSize: 20}}>
          <Text style={{fontWeight: 'bold'}}>270</Text> days
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          overflow: 'hidden',
          padding: 10,
          width: 130,
          height: 130,
        }}>
        <Text style={{color: 'black'}}>{currentDay}</Text>
        <Text style={{color: COLORS.DARKGREEN, paddingVertical: 5}}>
          {currentDateNumber}
        </Text>
        <Text style={{color: COLORS.GRAY}}>Tomorrow</Text>
        <View style={{borderStartColor: COLORS.DARKGREEN, borderStartWidth: 2}}>
          <Text style={{color: 'black', paddingVertical: 5, paddingStart: 5}}>
            2 all-day events
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventMain: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventFirst: {
    width: 180,
    height: 130,
    borderRadius: 20,
    overflow: 'hidden',
    paddingStart: 10,
    paddingEnd: 40,
    backgroundColor: COLORS.BLUEGREEN,
  },
  eventImages: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'white',
  },
  eventText: {color: 'white', alignSelf: 'flex-end'},
  eventHeading: {color: 'white', fontSize: 20, marginVertical: 5},
});
