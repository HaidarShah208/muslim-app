import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';

const TimePicker = ({time, setTime}) => {
  const [open, setOpen] = useState(false);

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={time}
        mode="time"
        is24hourSource="locale"
        onConfirm={date => {
          setOpen(false);
          setTime(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TimePicker;
