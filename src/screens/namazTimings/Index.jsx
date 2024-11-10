import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PrayerTimeWidget from '../../components/PrayerTimeWidget';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';
import NamazDateTimeNavigator from '../../components/NamazDateTimeNavigator';
import SeharIftarTimeWidget from '../../components/SeharIftarTimeWidget';
import PrayerTimeWidgetDetailed from '../../components/PrayerTimeWidgetDetailed';
import DayDeviderwidget from '../../components/DayDeviderwidget';
import SalahIcon from '../../assets/icons/salah.svg';
import useLocation from '../../services/useLocation';
import {fetchTimings} from '../../store/slices/prayerTimeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingIcon from '../../assets/icons/settingIcon.svg';
import moment from 'moment-hijri';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const prayersTiming = useSelector(state => state.prayerTiming.timings);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentlocation, setLocation] = useState();
  const [isRamadan, setIsRamadan] = useState(false);
  const {location, cityCountry} = useLocation();
  useEffect(() => {
    const getLocation = async () => {
      try {
        const locationJson = await AsyncStorage.getItem('cityCountry');
        const locationData = locationJson ? JSON.parse(locationJson) : null;
        setLocation(locationData);
      } catch (error) {
        console.error('Failed to retrieve location from AsyncStorage:', error);
      }
    };
    getLocation();
  }, [location]);

  const calculationMethod = useSelector(
    state => state.prayerTiming.calculationMethod,
  );

  useEffect(() => {
    const city = currentlocation?.city;
    const country = currentlocation?.country;
  
    if (cityCountry && currentlocation && currentDate && calculationMethod) {
      console.log('fetchTimings', city, country, currentDate, calculationMethod);
      dispatch(fetchTimings({city, country, date: currentDate, calculationMethod}));
    }
  }, [currentDate, currentlocation, cityCountry, calculationMethod]);
  

  useEffect(() => {
    const hijriMonth = moment(currentDate).format('iMMMM');
    setIsRamadan(hijriMonth === 'Ramadan');
  }, [currentDate]);

  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    });
  };

  const handlePreviousDay = () => {
    setCurrentDate(prevDate => {
      const previousDate = new Date(prevDate);
      previousDate.setDate(previousDate.getDate() - 1);
      return previousDate;
    });
  };

  const customStyles = {
    // card: {
    //   height: 200,
    //   borderRadius: 20,
    // },
    namazTimeText: {
      color: '#FFF',
      fontFamily: 'Poppins',
      fontSize: 30,
      fontWeight: '700',
      lineHeight: 38,
    },
    remainingTime: {
      color: '#FFF',
      fontFamily: 'Poppins',
      fontSize: 25,
      fontWeight: '700',
      lineHeight: 38,
    },
    namazNameText: {
      color: 'white',
      fontFamily: 'Poppins',
      fontSize: 30,
      fontWeight: '700',
    },
    nowText: {
      fontSize: 20,
      color: 'white',
      fontFamily: 'Poppins',
      fontWeight: '700',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <MainNavigator
          svgIcon={<SalahIcon width={55} height={55} />}
          otherIcon={
            <SettingIcon
              width={35}
              height={35}
              onPress={() => navigation.navigate('prayerTimeSetting')}
            />
          }
          heading="Prayer Time"
        />
        <PrayerTimeWidget
          prayersTiming={prayersTiming}
          customStyles={customStyles}
          showScrollIcon={false}
        />
        <NamazDateTimeNavigator
          currentDate={currentDate}
          onNextDay={handleNextDay}
          onPreviousDay={handlePreviousDay}
        />
        {isRamadan && <SeharIftarTimeWidget prayersTiming={prayersTiming} />}
        <PrayerTimeWidgetDetailed prayersTiming={prayersTiming} />
        <DayDeviderwidget prayersTiming={prayersTiming} />
      </ScrollView>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    // padding: 20,
  },
});