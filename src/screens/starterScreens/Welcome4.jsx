import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/COLORS';
import useHome from '../home/useHome';
import {useDispatch, useSelector} from 'react-redux';
import {setSetting} from '../../store/slices/userSettingsSlice';
import ToggleSwitch from 'toggle-switch-react-native';

const WelcomeScreen4 = ({navigation}) => {
  const dispatch = useDispatch();
  const {prayersTiming} = useHome();
  const settings = useSelector(state => state?.settings.notificationPreference);

  const insets = useSafeAreaInsets();
  const [isEnabled, setIsEnabled] = useState(
    settings?.value === undefined ? false : settings?.value,
  );
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSwitch = () => {
    const newValue = !isEnabled;

    setIsEnabled(newValue);
    if (newValue) {
      setIsModalVisible(true);
      dispatch(
        setSetting({
          key: 'notificationPreference',
          value: true,
          label: 'Notification Preference',
        }),
      );
    } else {
      savePreference(false); // Save the preference immediately when disabling
    }
  };

  const savePreference = async preference => {
    try {
      dispatch(
        setSetting({
          key: 'notificationPreference',
          value: preference,
          label: 'Notification Preference',
        }),
      );
    } catch (e) {
      console.error('Failed to save the preference', e);
    }
  };

  const handlePermissionSelect = () => {
    navigation.navigate('welcome5');
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDisableBatteryOptimization = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Alert.alert('Unsupported', 'This feature is only available on Android.');
    }
    savePreference(true);
    closeModal();
  };

  const handleIgnoreOptimization = () => {
    savePreference(true);
    closeModal();
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.progressBar}>
        <View style={styles.progress}></View>
      </View>
      <Text style={styles.mainText}>Notifications</Text>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Icon name="partly-sunny-outline" size={55} color="#FFD700" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Time Sensitive</Text>
            <Text style={styles.cardMessage}>It's time to pray!</Text>
          </View>
          <Text style={styles.cardTime}>16:47 PM</Text>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Notifications</Text>
        <ToggleSwitch
          isOn={isEnabled}
          onColor="#239571"
          offColor="#239571"
          labelStyle={{color: 'black', fontWeight: '900'}}
          size="small"
          onToggle={() => toggleSwitch()}
        />
      </View>

      <Text style={styles.description}>
        Enable notifications to receive prayer alerts. You can customize which
        prayers you receive alerts for after onboarding.
      </Text>

      <TouchableOpacity
        style={styles.radioButton}
        onPress={handlePermissionSelect}>
        <Text style={styles.radioLabel}>Next</Text>
        {/* <View style={styles.radioCircle}>
          {selectedPermission === 'first' && <View style={styles.selectedRb} />}
        </View> */}
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notice to Android Users</Text>
            <Text style={styles.modalText}>
              Battery Optimization may cause otherwise unavoidable delays in the
              delivery of prayer time notifications.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDisableBatteryOptimization}>
              <Text style={styles.modalButtonText}>
                Disable Battery Optimization
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalIgnoreButton]}
              onPress={handleIgnoreOptimization}>
              <Text style={[styles.modalButtonText, styles.modalIgnoreText]}>
                Ignore (Not Recommended)
              </Text>
            </TouchableOpacity>
            <Text style={styles.modalFooterText}>
              Your phone OS may be disrupting your experience with apps
              including this app. Follow this guide for multiple steps you can
              take to ensure timely prayer notifications & correct widget
              timings.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 13,
    overflow: 'hidden',
  },
  progress: {
    width: '70%',
    height: '100%',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 13,
  },
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 150,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: COLORS.LIGHTGRAY,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 10,
  },
  cardText: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardMessage: {
    fontSize: 12,
    color: COLORS.PRIMARYGREEN,
  },
  cardTime: {
    fontSize: 14,
    color: COLORS.PRIMARYGREEN,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#0000001A',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'justify',
    paddingHorizontal: 5,
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    gap: 20,
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.PRIMARYWHITE,
    textAlign: 'center',
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.PRIMARYWHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.PRIMARYGREEN,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARYWHITE,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.PRIMARYWHITE,
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: COLORS.PRIMARYWHITE,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  modalIgnoreButton: {
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderColor: COLORS.PRIMARYWHITE,
    borderWidth: 1,
  },
  modalIgnoreText: {
    color: 'white',
  },
  modalFooterText: {
    fontSize: 12,
    color: COLORS.PRIMARYWHITE,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default WelcomeScreen4;
