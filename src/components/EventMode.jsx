import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import EventImage from '../assets/icons/eventImage.svg';
import EventTime from '../assets/icons/evenTime.svg';
import EventType from '../assets/icons/eventType.svg';
import EventAdd from '../assets/icons/eventAddWhite.svg';
import ArafaDay from '../assets/icons/arafaDay.svg';
import ArafaDayText from '../assets/icons/arafaDayText.svg';
import RamadanDay from '../assets/icons/ramadanDay.svg';
import DecreeDay from '../assets/icons/decreeDay.svg';
import RamadanDayText from '../assets/icons/RamadanDayText.svg';
import EidulFitrDay from '../assets/icons/eidulFitrDay.svg';
import EidulDuhaDay from '../assets/icons/eidulDuhaDay.svg';
import EidulFitrDayText from '../assets/icons/eidutFitrDayText.svg';
import DecreeDayText from '../assets/icons/decreeDayText.svg';
import EidulDuhaDayText from '../assets/icons/eidulDuhaDayText.svg';
import {COLORS} from '../constants/COLORS';


const eventImages = {
  'Eid al-Fitr': EidulFitrDay,
  'Day of Arafah': ArafaDay,
  'Beginning of Ramadan': RamadanDay,
  'Night of Decree':DecreeDay,
  'Eid al-Adha':EidulDuhaDay
};

const eventTextImages = {
  'Eid al-Fitr': EidulFitrDayText,
  'Day of Arafah': ArafaDayText,
  'Beginning of Ramadan': RamadanDayText,
'Night of Decree':DecreeDayText,
'Eid al-Adha':EidulDuhaDayText
};


const EventModal = ({modalVisible, setModalVisible, selectedEvent, currentGregorianDate}) => {
  const EventSpecificImage = eventImages[selectedEvent?.eventName] || EventImage;
  const EventSpecificTextImage = eventTextImages[selectedEvent?.eventName] || EventImage; 
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 2,
              borderStyle: 'dashed',
              borderColor: 'white',
              paddingBottom: 10,
            }}>
            <Text style={styles.modalTitle}>{selectedEvent?.eventName}</Text>
            <EventImage width={15} />
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row',paddingTop:10}}>
            <View style={{flexDirection: 'row'}}>
              <EventTime width={15} style={{marginTop: 18, marginRight: 5}} />
              <View>
                <Text style={styles.currentdateDay}>
                  {currentGregorianDate}
                </Text>
                <Text style={styles.modalDate}>
                  {selectedEvent?.date.format('iD iMMMM')}
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 20}}>
              <Text style={styles.modalDaysLeft}>
                {selectedEvent?.daysLeft > 0
                  ? `${selectedEvent.daysLeft} Days Left`
                  : 'Today'}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: '', alignItems: 'flex-start',marginTop:10}}>
            <EventSpecificImage width={170} />
            <EventSpecificTextImage  width="100%" style={{marginTop:-20}}/>
          </View>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <TextInput
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                paddingVertical: 8,
                marginHorizontal: 4,
                paddingHorizontal: 5,
                backgroundColor: COLORS.LIGHTGREEN15,
                flex: 1,
                color: 'white',
              }}>
              Type your input
            </TextInput>
            <TouchableOpacity style={styles.circle}>
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
        marginHorizontal: 65,
        backgroundColor: COLORS.DARKGREEN,
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'start',
      },
    
      modalDate: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
      },
      modalDaysLeft: {
        fontSize: 14,
      },
      closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
        textAlign: 'center',
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
});

export default EventModal;
