import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment-hijri';
import { COLORS } from '../../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import useWeeklyCalendarBody from './useWeeklyCalendarBody';

const WeeklyHijriCalendar = ({ currentDate }) => {
const {
handlePress,isEvent,getSpecialMessage,WEEKDAY_NAMES_ARABIC,eventDetail,days

}=useWeeklyCalendarBody(currentDate)

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.weekContainer}>
        {days.map((day, dayIndex) => {
          const detail = eventDetail(day);
          return (
            <TouchableOpacity
              key={dayIndex}
              onPress={() => handlePress(day, detail?.id)}>
              <View
                style={[
                  {
                    backgroundColor: day.isSame(moment(), 'day')
                      ? '#deefea'
                      : 'transparent',
                  },
                  styles.box,
                ]}>
                <Text
                  style={{
                    color: day.isSame(currentDate, 'day')
                      ? COLORS.DARKGREEN
                      : isEvent(day)
                      ? 'red'
                      : 'black',
                    fontWeight: day.isSame(moment(), 'day') ? '900' : 'normal',
                  }}>
                  {WEEKDAY_NAMES_ARABIC[day.format('dddd')]}
                </Text>
                <Text
                  style={[
                    styles.day,
                    {
                      color: day.isSame(currentDate, 'day')
                        ? COLORS.DARKGREEN
                        : isEvent(day)
                        ? 'red'
                        : 'black',
                      fontWeight: day.isSame(moment(), 'day') ? '900' : 'normal',
                    },
                  ]}>
                  {day.iDate()}
                </Text>
                <Text
                  style={{
                    color: day.isSame(currentDate, 'day')
                      ? COLORS.DARKGREEN
                      : isEvent(day)
                      ? 'red'
                      : 'black',
                    fontWeight: day.isSame(moment(), 'day') ? '900' : 'normal',
                  }}>
                  {day.format('dd')}
                </Text>
                {getSpecialMessage(day) && (
                  <View
                    style={{
                      backgroundColor: COLORS.LIGHTGREEN15,
                      borderRadius: 12,
                      gap: 2,
                    }}>
                    <Text style={styles.eventText}>
                      {getSpecialMessage(day)}
                    </Text>
                  </View>
                )}
                {detail && (
                  <Text style={styles.title}>
                    {detail.title.length > 2
                      ? detail.title.substring(0, 3) + '...'
                      : detail.title}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: 'white',
    marginBottom:10
  },
  box: {
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 13,
    width: 50,
    height: 90,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  day: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  eventText: {
    fontSize: 12,
    color: COLORS.DARKGREEN,
    width: 10,
    textAlign: 'center',
    paddingLeft: 1,
  },
  title: {
    textAlign: 'center',
    color: COLORS.DARKGREEN,
  },
});

export default WeeklyHijriCalendar;
