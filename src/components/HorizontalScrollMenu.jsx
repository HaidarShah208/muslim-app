import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import MenuCard from './MenuCard';
import QiblaIcon from '../assets/icons/qiblaIcon.svg';
import MosqueIcon from '../assets/icons/mosqueIcon.svg';
import TasbihIcon from '../assets/icons/tasbih.svg';
import QuranIcon from '../assets/icons/quran.svg';
import RestaurantIcon from '../assets/icons/restaurant.svg';
import ChandaBoxIcon from '../assets/icons/chandaBox.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import PrayerMatIcon from '../assets/icons/prayerMat.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HorizontalScrollMenu = () => {
  const navigation = useNavigation();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const handleMosque = async () => {
    const hasSeenScreen = await AsyncStorage.getItem('hasQuranScreen');
    if (hasSeenScreen) {
      setIsFirstTime(false);
      navigation.navigate('mosqueStart');
    } else if (!hasSeenScreen) {
      navigation.navigate('mosque');
    }
  };

  // const handleQuran = async () => {
  //   // not working who did this ?
  //   const hasSeenScreen = await AsyncStorage.getItem('hasQuranStartScreen');
  //   if (hasSeenScreen) {
  //     setIsFirstTime(false);
  //     navigation.navigate('Quran');
  //   } else if (!hasSeenScreen) {
  //     navigation.navigate('startQuran');
  //   }
  // };
  // if (!isFirstTime) {
  //   return null;
  // }

  const handleQuran = async () => {
    navigation.navigate('Quran');
  };

  const menuData = [
    {
      id: 1,
      title: 'Qibla',
      icon: QiblaIcon,
      onClick: () => {
        navigation.navigate('qiblaScreen');
      },
    },
    {
      id: 2,
      title: 'mosque',
      icon: MosqueIcon,
      onClick: () => {
        handleMosque();
      },
    },
    {
      id: 3,
      title: 'Tasbih',
      icon: TasbihIcon,
      onClick: () => navigation.navigate('tasbih'),
    },
    {
      id: 4,
      title: 'Quran',
      icon: QuranIcon,
      onClick: () => {
        handleQuran();
      },
    },
    {
      id: 5,
      title: 'Higri',
      icon: CalendarIcon,
      onClick: () => {
        navigation.navigate('hijriCalendarHome');
      },
    },
    {
      id: 6,
      title: 'Prayer Time',
      icon: PrayerMatIcon,
      onClick: () => {
        navigation.navigate('namazTiming');
      },
    },
    {
      id: 7,
      title: 'Gallery',
      icon: PrayerMatIcon,
      onClick: () => {
        navigation.navigate('gallery');
      },
    },
    {
      id: 8,
      title: 'Books',
      icon: PrayerMatIcon,
      onClick: () => {
        navigation.navigate('book');
      },
    },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {menuData.map(item => (
        <MenuCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          onClick={item.onClick}
        />
      ))}
    </ScrollView>
  );
};

export default HorizontalScrollMenu;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 10,
  },
});
