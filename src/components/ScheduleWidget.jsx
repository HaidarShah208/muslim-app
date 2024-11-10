import React, {useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import EventIcon from '../assets/icons/eventIcon.svg';
import {fetchEvents, removeEvent} from '../store/slices/eventSlice';
import {useDispatch, useSelector} from 'react-redux';

const ScheduleWidget = ({title}) => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(removeEvent(id));
  };

  const getTodayEvents = () => {
    const todayStart = moment().startOf('day');
    return events.filter(item => {
      const eventTime = moment(item.day);
      return eventTime.isSame(todayStart, 'day');
    });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i += 1) {
      slots.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const renderEventCards = timeSlot => {
    const eventsAtTimeSlot = getTodayEvents().filter(event => {
      const eventTime = moment(event.time, 'HH:mm');
      const slotHour = parseInt(timeSlot.split(':')[0], 10);
      return eventTime.hours() === slotHour;
    });

    return eventsAtTimeSlot.map(event => (
      <View key={event.id} style={styles.card}>
        <EventIcon />
        <Text style={styles.cardTitle}>{event.notes || 'No Title'}</Text>
        <Icon name="delete" size={24} onPress={() => handleDelete(event.id)} />
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {generateTimeSlots().map((timeSlot, index) => (
        <View key={index} style={styles.timeSlotContainer}>
          <View style={styles.timeSlot}>
            <Text style={styles.timeSlotText}>{timeSlot}</Text>
          </View>

          <View style={styles.eventsContainer}>
            {renderEventCards(timeSlot)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    paddingLeft: 27,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  timeSlot: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  eventsContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#239571',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    width: '80%',
  },
  cardTime: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  cardNotes: {
    fontSize: 14,
    color: '#555',
  },
});

export default ScheduleWidget;
