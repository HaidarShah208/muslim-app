import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import LocationIcon from '../../assets/icons/location.svg';
import PrayerWidget from '../../components/PrayerWidget';
import HomeHeader from '../../components/HomeHeader';
import MenuCard from '../../components/MenuCard';
import LocationContainer from '../../components/LocationContainer';
import PrayerTimeWidget from '../../components/PrayerTimeWidget';
import ShowAllNavigator from '../../components/ShowAllNavigator';
import HorizontalScrollMenu from '../../components/HorizontalScrollMenu';
import DailyDuaContainer from '../../components/DailyDuaContainer';
import useHome from './useHome';
import ArrowRight from '../../assets/icons/arrowRight.svg';
import LocationModel from '../../components/LocationModel';
import Dialoag from '../../components/Dialoag';
import moment from 'moment-hijri';

import OneUmmahs from '../../components/OneUmmah';
import DonateNow from '../../components/DonateNow';
import ImageCollection from '../../components/ImageCollection';
import EventSection from '../../components/EventSection';

const Index = () => {
  const {
    prayersTiming,
    modalVisible,
    handleCancelExit,
    handleConfirmExit,
    navigation,
  } = useHome();
  const [visible, setVisible] = useState(false);

  moment.locale('en');
  const currentHijriMonth = moment().format('iDD iMMMM, iYYYY ');

  return (
    <View style={styles.container}>
      <Dialoag
        visible={modalVisible}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
        message="Files are downloading. Are you sure you want to exit?"
      />
      <LocationModel visible={visible} setVisible={setVisible} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.main}>
          <HomeHeader />
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <LocationContainer />
          </TouchableOpacity>

          <View style={styles.firstContainer}>
            <View style={styles.optionContainer}>
              <Image
                style={{width: 36, height: 36}}
                source={require('../../../src/assets/icons/qibla.png')}
              />
              <Text style={styles.optionName}>{currentHijriMonth}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('hijriCalendar')}>
              <ArrowRight width={10} height={10} />
            </TouchableOpacity>
          </View>
          <PrayerTimeWidget prayersTiming={prayersTiming} />
          <ShowAllNavigator
            lable={'Explore'}
            linkText={'See All'}
            onPress={() => {
              navigation.navigate('More');
            }}
          />
        </View>
        <View style={styles.duas}>
          <HorizontalScrollMenu />
        </View>
        <View style={styles.duaContainer}>
          <EventSection />
          <ShowAllNavigator lable={'Daily Duas'} linkText={'See All'} />
          <DailyDuaContainer />
          <OneUmmahs />
          <ShowAllNavigator lable={'Daily Ayat'} linkText={'See All'} />
          <DailyDuaContainer />
          <DonateNow />
          <ShowAllNavigator lable={'Daily Hadees'} linkText={'See All'} />
          <DailyDuaContainer />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('gallery');
            }}>
            <ImageCollection />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.LIGHTGRAY,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  main: {
    padding: 20,
  },
  firstContainer: {
    backgroundColor: COLORS.PRIMARYLIGHTGREEN,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionName: {
    fontSize: 15,
    color: COLORS.PRIMARYWHITE,
    fontWeight: '700',
    marginLeft: 5,
  },
  duaContainer: {
    padding: 20,
  },
  duas: {
    marginStart: 20,
  },
});

export default Index;
