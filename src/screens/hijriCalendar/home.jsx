import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {COLORS} from '../../constants/COLORS';
import WeeklyHijriCalendar from '../../components/CalendarBody/WeeklyCalendarBody';
import moment from 'moment-hijri';
import Leaf from '../../assets/icons/Leaf.svg';

import Notification from '../../assets/icons/notificationFalse.svg';
import ArraowRight from '../../assets/icons/arrowRightLong.svg';

import {useState} from 'react';
import EventModal from '../../components/EventMode';

const HijriCalenderHome = ({navigation}) => {
  const currentDate = moment();
  const currentGregorianDate = moment().format('MMMM D, YYYY');
  const currentHijriDate = moment().format('iYYYY iMMMM iD');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const specialDates = {
    '1-10': {arabic: 'رأس السنة الهجرية', english: 'Islamic New Year'},
    '9-1': {arabic: 'عاشوراء', english: 'Ashura'},
    '10-1': {arabic: 'عاشوراء', english: 'Ashura'},
    '12-3': {arabic: 'المولد النبوي', english: 'Prophet Muhammad’s Birthday'},
    '27-7': {arabic: 'الإسراء والمعراج', english: 'Isra and Mi’raj'},
    '15-8': {arabic: 'النصف من شعبان', english: 'Mid-Sha’ban'},
    '1-9': {arabic: 'بداية رمضان', english: 'Beginning of Ramadan'},
    '27-9': {arabic: 'ليلة القدر', english: 'Night of Decree'},
    '1-10': {arabic: 'عيد الفطر', english: 'Eid al-Fitr'},
    '9-12': {arabic: 'يوم عرفة', english: 'Day of Arafah'},
    '10-12': {arabic: 'عيد الأضحى', english: 'Eid al-Adha'},
    '11-12': {arabic: 'عيد الأضحى', english: 'Eid al-Adha'},
    '12-12': {arabic: 'عيد الأضحى', english: 'Eid al-Adha'},
  };

  const specialDateList = Object.keys(specialDates).map(key => {
    const [iDay, iMonth] = key.split('-').map(Number);
    let eventDate = moment()
      .iYear(currentDate.iYear())
      .iMonth(iMonth - 1)
      .iDate(iDay);

    if (eventDate.isBefore(currentDate, 'day')) {
      eventDate = eventDate.add(1, 'iYear');
    }

    const daysLeft = eventDate.diff(currentDate, 'days');
    return {
      date: eventDate,
      eventName: specialDates[key].english,
      arabicEventName: specialDates[key].arabic,
      daysLeft,
    };
  });

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader />
          <View style={styles.hijriDate}>
            <Text style={styles.dateDay}>{currentGregorianDate}</Text>
            <View style={styles.dateDayMain}>
              <Text style={styles.dateDay}>{currentHijriDate}</Text>
              <Text style={styles.today}>Today</Text>
            </View>
          </View>
        </View>
        <View style={styles.weeklyCalendar}>
          <WeeklyHijriCalendar currentDate={currentDate} />
        </View>
        <View style={styles.events}>
          <View style={styles.mainHeading}>
            <Text style={styles.heading}>Islamic Calendar</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('hijriCalendar')}>
              <ArraowRight style={styles.navigator} />
            </TouchableOpacity>
          </View>
          {specialDateList.map((special, index) => (
            <TouchableOpacity
              key={index}
              style={styles.eventsBox}
              onPress={() => {
                setSelectedEvent(special);
                setModalVisible(true);
              }}>
              <View style={styles.eventMain}>
                <View style={styles.circle}>
                  <Leaf />
                </View>
                <View style={styles.dashedLine} />
                <View style={styles.dateMonth}>
                  <Text style={styles.date}>
                    {`${special.date.format('D')}\n${special.date.format(
                      'MMM',
                    )}`}
                  </Text>
                </View>
              </View>
              <Notification />
              <View style={styles.eventText}>
                <Text style={styles.monthName}>{special.eventName}</Text>
                <Text style={{color: COLORS.WHITE}}>{`${special.date.format(
                  'iYYYY, iMMM D',
                )}`}</Text>

                {special.daysLeft > 0 ? (
                  <Text
                    style={{
                      color: COLORS.WHITE,
                    }}>{`${special.daysLeft} Days Left`}</Text>
                ) : (
                  <Text>Today</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <EventModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedEvent={selectedEvent}
        currentGregorianDate={currentGregorianDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {paddingBottom: 20, flex: 1, backgroundColor: 'white'},
  container: {
    padding: 27,
  },
  calendarWrapper: {paddingHorizontal: 12},
  dateDayMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateDay: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: COLORS.GRAY,
    fontSize: 18,
  },
  currentdateDay: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
    paddingTop: 15,
  },
  today: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARKGREEN,
  },
  weeklyCalendar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  events: {
    paddingHorizontal: 27,
  },
  heading: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'poppins',
    marginBottom: 20,
  },
  navigator: {
    paddingTop: 30,
  },
  eventsBox: {
    backgroundColor: COLORS.BLUEGREEN,
    padding: 6,
    borderRadius: 10,
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.LIGHTGREEN15,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
    padding: 15,
    alignSelf: 'flex-start',
  },
  eventMain: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    marginEnd: 15,
  },
  dateMonth: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 20,
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    color: 'black',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'white',
  },
  eventText: {
    marginStart: 20,
  },
  monthName: {
    color: COLORS.DARKGREEN,
    fontWeight: '800',
    fontSize: 9,
  },
});

export default HijriCalenderHome;
