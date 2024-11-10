import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  toggleNotification,
  loadNotificationPreferences,
} from '../store/slices/notificationSlice';
import NotificationTrue from '../assets/icons/notificationTrue.svg';
import NotificationFalse from '../assets/icons/notificationFalse.svg';
import BackgroundPattern from '../assets/images/mosque.svg';
import {COLORS} from '../constants/COLORS';
import NotificationService from '../services/notificationService';

const PrayerTimeWidgetDetailed = ({prayersTiming}) => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);

  useEffect(() => {
    dispatch(loadNotificationPreferences());
  }, [dispatch]);

  const toggleNotificationHandler = prayerName => {
    dispatch(toggleNotification({prayerName}));
  };
  const date = new Date(Date.now() + 20 * 1000);
  const triggerTestNotification = () => {
    NotificationService.scheduleNotification(
      1,
      'tasas',
      'Test Notification',
      date,
    );
  };

  const convertTo12HourFormat = time => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute} ${period}`;
  };

  const initialPrayerTimes = [
    {name: 'Fajr', time: '', icon: require('../assets/icons/fajr.png')},
    {name: 'Dhuhr', time: '', icon: require('../assets/icons/dhuhr.png')},
    {name: 'Asr', time: '', icon: require('../assets/icons/asr.png')},
    {name: 'Maghrib', time: '', icon: require('../assets/icons/maghrib.png')},
    {name: 'Isha', time: '', icon: require('../assets/icons/isha.png')},
  ];

  const prayerTimes = initialPrayerTimes.map(prayer => ({
    ...prayer,
    time: convertTo12HourFormat(prayersTiming?.data?.timings[prayer.name]),
  }));

  return (
    <View style={styles.container}>
      <BackgroundPattern style={styles.backgroundPattern} />
      {prayerTimes.map(prayer => (
        <View key={prayer.name} style={styles.singlePrayerContainer}>
          <View style={styles.namazNameContainer}>
            <Image source={prayer.icon} style={styles.prayerIcon} />
            <Text style={styles.namazNameText}>{prayer.name}</Text>
          </View>
          <View style={styles.namazTimeContainer}>
            <Text style={styles.timeText}>{prayer.time}</Text>
            <TouchableOpacity
              onPress={() => toggleNotificationHandler(prayer.name)}>
              {notifications[prayer.name] ? (
                <NotificationTrue height={20} width={20} />
              ) : (
                <NotificationFalse height={20} width={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PrayerTimeWidgetDetailed;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: COLORS.LIGHTGRAY,
    padding: 20,
    marginTop: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  singlePrayerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHTGREEN15,
    paddingBottom: 10,
    marginVertical: 15,
  },
  namazNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  namazNameText: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
  },
  namazTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
    marginRight: 15,
  },
  prayerIcon: {
    height: 20,
    width: 25,
  },
  backgroundPattern: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: 215,
    height: 155,
  },
});
