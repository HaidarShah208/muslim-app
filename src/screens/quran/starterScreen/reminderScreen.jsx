import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hand from '../../../assets/icons/hand.svg';
import Track from '../../../assets/icons/track.svg';
import Remind from '../../../assets/icons/remind.svg';
import Read from '../../../assets/icons/read.svg';
import MainNavigator from '../../../components/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants/COLORS';

const ReminderScreen = ({ navigation }) => {
  const handleTryOnMyOwn = async () => {
    // Show alert
    Alert.alert(
      'Confirmation',
      'Are you sure you want to try on your own?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            // Save data to AsyncStorage
            try {
              await AsyncStorage.setItem('reminderPreference', 'tryOnOwn');
              // Show toast message
              ToastAndroid.show('We have saved your priority.', ToastAndroid.SHORT);
            } catch (error) {
              console.error('Error saving data', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <MainNavigator />

      {/* Icons Section */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconWrapper}>
          <View style={[styles.icon, styles.iconReading]}>
            <Read />
          </View>
          <Text style={styles.iconText}>Consistent Reading</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper}>
          <View style={[styles.icon, styles.iconReminders]}>
            <Remind />
          </View>
          <Text style={styles.iconText}>Personalized Reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconWrapper, { backgroundColor: '#EF94004D' }]}>
          <View style={[styles.icon, styles.iconProgress]}>
            <Track />
          </View>
          <Text style={styles.iconText}>Track Your Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconWrapper, { backgroundColor: '#EA4D2D4D' }]}>
          <View style={[styles.icon, styles.iconGrowth]}>
            <Hand />
          </View>
          <Text style={styles.iconText}>Spiritual Growth</Text>
        </TouchableOpacity>
      </View>

      {/* Alert Section */}
      <Text style={styles.alertTitle}>Alerts</Text>
      <Text style={styles.alertText}>
        People who turn on reminders are 3x more likely to read daily. Would you like to succeed in building your Quran habit?
      </Text>
      <Text style={styles.alertText}>
        Avoid missing notifications if your app goes in background, by accepting the permissions.
      </Text>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.tryButton} onPress={handleTryOnMyOwn}>
        <Text style={styles.tryButtonText}>No, I’ll try on my own!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.successButton} onPress={() => {
        navigation.navigate('Quran');
      }}>
        <Text style={styles.successButtonText}>Yes, I want to succeed!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'column',
    marginBottom: 30,
    marginTop: 30,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#2393714D',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 250,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    resizeMode: 'contain',
  },
  iconReading: {
    backgroundColor: '#8FD1C6',
  },
  iconReminders: {
    backgroundColor: '#5C8DFF',
  },
  iconProgress: {
    backgroundColor: '#FEC968',
  },
  iconGrowth: {
    backgroundColor: '#F47D7D',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '500',
  },
  alertTitle: {
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 10,
    color: '#444',
  },
  alertText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  tryButton: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  tryButtonText: {
    color: '#B0B0B0',
    fontWeight: 'bold',
  },
  successButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 10,
    width: 250,
    height: 45,
    alignSelf: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ReminderScreen;
