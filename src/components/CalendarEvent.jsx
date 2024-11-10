import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View, Alert} from 'react-native';
import CustomTextInput from './CustomTextInput';
import {COLORS} from '../constants/COLORS';
import Circle from '../assets/icons/circle.svg';
import Emoji from '../assets/icons/emoji.svg';
import Location from '../assets/icons/mapIcon.svg';
import Email from '../assets/icons/email.svg';
import Notification from '../assets/icons/notification.svg';
import Notes from '../assets/icons/notes.svg';
import Video from '../assets/icons/video.svg';
import Attachment from '../assets/icons/attach.svg';
import Invites from '../assets/icons/invite.svg';
import World from '../assets/icons/world.svg';
import Category from '../assets/icons/category.svg';
import Repeat from '../assets/icons/repeat.svg';
import Clock from '../assets/icons/clock.svg';
import HijriCutomButton from './HijriCutomButton';
import TimePicker from './TimePicker';
import useCalendarEvent from './useCalendarEvent'; 
import moment from 'moment-hijri';

const CalendarEvent = () => {
  const {
    title,
    setTitle,
    location,
    setLocation,
    type,
    setType,
    notes,
    setNotes,
    video,
    setVideo,
    attach,
    setAttachment,
    invites,
    setInvites,
    world,
    setWorld,
    category,
    setCategory,
    isEnabled,
    toggleSwitch,
    time,
    setTime,
    endtime,
    setEndTime,
    notification,
    setNotification,
    handleSave,
    formattedDay,
    loading,
    email,
    day,
  } = useCalendarEvent();

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.mainContainer}>
        <View>
          <CustomTextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
            iconleft={<Emoji />}
            iconleft2={<Circle />}
          />
          <View style={styles.allDayContainer}>
            <View style={styles.allDayTextContainer}>
              <Clock />
              <Text style={styles.allDayText}>All Day</Text>
            </View>
            <Switch
              trackColor={{false: COLORS.BLACK, true: COLORS.DARKGREEN}}
              thumbColor={'#ffffff'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={{paddingVertical: 20}}>
            <View style={styles.timePickerContainer}>
              <Text style={{color: 'black'}}>
                {moment(day).format('ddd, MMM DD')}
              </Text>
              <Text style={{color: 'black'}}>
                {moment(day).format('ddd, MMM DD')}
              </Text>
            </View>
            <Text style={styles.formattedDay}>{formattedDay}</Text>
            <View style={styles.timePickerContainer}>
              <TimePicker time={time} setTime={setTime} />
              {!isEnabled && <TimePicker time={endtime} setTime={setEndTime} />}
            </View>
          </View>
          <CustomTextInput
            icon={<Email />}
            value={email}
            placeholder="umer@gmail.com"
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
          />
          <CustomTextInput
            icon={<Notification />}
            value={notification}
            onChangeText={setNotification}
            placeholder="10 mins before"
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
          />
          <CustomTextInput
            icon={<Repeat />}
            value={type}
            onChangeText={setType}
            placeholder="Don't repeat"
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
          />
          <CustomTextInput
            icon={<World />}
            value={world}
            onChangeText={setWorld}
            placeholder="World"
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
          />
          <CustomTextInput
            icon={<Location />}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            style={styles.input}
            containerStyle={styles.inputContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
          />
          <CustomTextInput
            icon={<Notes style={styles.iconStyle}/>}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes"
            style={styles.inputNotes}
            containerStyle={styles.notesContainer}
            keyboardType="default"
            autoCapitalize="none"
            placeholderTextColor={COLORS.BLACK}
            placeholderFontSize={14}
            placeholderFontWeight="700"
            multiline
            numberOfLines={4}

          />
        </View>
        <View>
        {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <HijriCutomButton onPress={handleSave} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CalendarEvent;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, padding: 19, backgroundColor: 'white'},
  inputContainer: {
    backgroundColor: '#f2f2f5',
    borderBottomWidth: 0,
    borderRadius: 10,
    paddingLeft: 12,
    margin: 5,
  },
  notesContainer: {
    backgroundColor: '#f2f2f5',
    borderBottomWidth: 0,
    borderRadius: 10,
    paddingLeft: 12,
    height: 140,
    margin: 5,
    flexDirection: 'row',   
  alignItems: 'flex-start',
  },
  inputNotes: {
    height: 150,
    color:COLORS.BLACK,
    textAlignVertical:'top'
  },
  iconStyle: {
    marginTop: 10,   
  },
  input: {
    height: 50,
    color:COLORS.BLACK
  },
  allDayContainer: {
    flexDirection: 'row',
    padding: 19,
    justifyContent: 'space-between',
  },
  allDayTextContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  allDayText: {
    fontWeight: '500',
    fontSize: 15,
    color: COLORS.BLACK,
  },
  formattedDay: {
    paddingLeft: 20,
    color: 'black',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
  },
});
