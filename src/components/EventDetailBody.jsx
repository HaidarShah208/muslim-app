import moment from 'moment';
import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Smile from '../assets/icons/smile.svg';
import EventAdd from '../assets/icons/eventAdd.svg';
import EventInput from '../assets/icons/eventInput.svg';
import {COLORS} from '../constants/COLORS';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventDetailModal = ({visible, events, date, onClose}) => {
 

  if (!events || events.length === 0 || !date) return null;
  const navigation = useNavigation();

  const dayInEnglish = moment(date).format('DD ddd');
  const dayEnglish = moment(date).format('ddd DD');

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{`${dayInEnglish}`}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.modalDate}>{`${dayEnglish}`}</Text>
            <Smile width={20} style={{marginTop: 15}} />
          </View>
          <ScrollView style={styles.eventsContainer}>
            {events.map((event, index) => (
              <View key={index} style={styles.mainBorder}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.allDay ? (
        <Text style={styles.day}>All Day</Text>
      ) : (
        <Text style={styles.day}>{event.time || 'Time not set'}</Text>
      )}
              </View>
            ))}
          </ScrollView>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <TextInput
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                paddingVertical: 8,
                marginHorizontal: 4,
                paddingHorizontal: 5,
                backgroundColor: COLORS.LIGHTGRAY,
                flex: 1,
                color: COLORS.DARKGREEN,
              }}>
              Type you input
            </TextInput>
            <TouchableOpacity
              style={styles.circle}
              onPress={() =>
                navigation.navigate('calendarEvent', {
                  day: moment(date).format(),
                })
              }>
              <EventAdd width={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  eventsContainer: {
    maxHeight: 700, // Adjust this value as needed
  },
  modalTitle: {
    fontSize: 31,
    fontWeight: '500',
    color: 'black',
    textAlign: 'start',
    borderBlockColor: 'black',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
  modalDate: {
    marginVertical: 20,
    color: 'black',
  },
  modalDescription: {
    marginBottom: 20,
    color: 'black',
  },
  eventTitle: {
    fontSize: 19,
    fontWeight: '500',
    color: 'black',

    paddingStart: 8,
  },
  day: {
    fontSize: 8,
    color: 'black',
    paddingStart: 8,
  },
  mainBorder: {
    borderLeftWidth: 6,
    borderColor: 'green',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
    marginVertical:5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
});

export default EventDetailModal;
