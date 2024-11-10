import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/COLORS';
import NotificationTrue from '../assets/icons/notificationTrue.svg';
import NotificationFalse from '../assets/icons/notificationFalse.svg';

const SeharIftarTimeWidget = ({prayersTiming}) => {
  // State for notification toggles
  const [isSeharNotificationOn, setSeharNotificationOn] = useState(false);
  const [isIftarNotificationOn, setIftarNotificationOn] = useState(false);

  // Toggle functions
  const toggleSeharNotification = () => {
    setSeharNotificationOn(!isSeharNotificationOn);
  };

  const toggleIftarNotification = () => {
    setIftarNotificationOn(!isIftarNotificationOn);
  };

  // Helper function to convert 24-hour time to 12-hour time
  const convertTo12HourFormat = time => {
    if (!time) return 'N/A';
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${period}`;
  };

  // Extract and convert Sehar and Iftar times from prayersTiming prop
  const seharTime = convertTo12HourFormat(
    prayersTiming?.data?.timings?.Sunrise,
  );
  const iftarTime = convertTo12HourFormat(
    prayersTiming?.data?.timings?.Maghrib,
  );

  return (
    <View style={styles.container}>
      {/* Sehar Container */}
      <View style={styles.seharContainer}>
        <TouchableOpacity onPress={toggleSeharNotification}>
          {isSeharNotificationOn ? (
            <NotificationTrue width={20} height={20} />
          ) : (
            <NotificationFalse width={20} height={20} />
          )}
        </TouchableOpacity>
        <View style={styles.seharTextContainer}>
          <Text style={styles.timeNameText1}>Sehar</Text>
          <Text style={styles.timeText1}>{seharTime}</Text>
        </View>
      </View>
      {/* Divider Line */}
      <View style={styles.divider} />
      {/* Iftar Container */}
      <View style={styles.iftarContainer}>
        <View style={styles.iftarTextContainer}>
          <Text style={styles.timeNameText2}>Iftar</Text>
          <Text style={styles.timeText2}>{iftarTime}</Text>
        </View>
        <TouchableOpacity onPress={toggleIftarNotification}>
          {isIftarNotificationOn ? (
            <NotificationTrue width={20} height={20} />
          ) : (
            <NotificationFalse width={20} height={20} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SeharIftarTimeWidget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center', // Center align vertically
    justifyContent: 'space-around',
  },
  seharContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center align vertically
    justifyContent: 'space-between',
  },
  iftarContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center align vertically
    justifyContent: 'space-between',
  },
  seharTextContainer: {
    marginLeft: 45, // Add space between icon and text
  },
  iftarTextContainer: {
    marginRight: 45, // Add space between icon and text
  },
  divider: {
    width: 1,
    height: '100%', // Use percentage for flexible height
    backgroundColor: COLORS.PRIMARYGREEN,
  },
  timeNameText1: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'right',
    color: COLORS.BLACK,
  },
  timeText1: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
    color: COLORS.BLACK,
  },
  timeNameText2: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'left',
    color: COLORS.BLACK,
  },
  timeText2: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'left',
    color: COLORS.BLACK,
  },
});
