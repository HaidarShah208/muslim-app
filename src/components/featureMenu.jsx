import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import QiblaIcon from '../assets/icons/qiblaIcon.svg';
import MosqueIcon from '../assets/icons/mosqueIcon.svg';
import TasbihIcon from '../assets/icons/tasbih.svg';
import QuranIcon from '../assets/icons/quran.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import PrayerMatIcon from '../assets/icons/prayerMat.svg';
import {useNavigation} from '@react-navigation/native';
import CustomMenuCard from './featureMenuCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const FeatureMenu = () => {
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

  if (!isFirstTime) {
    return null;
  }

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() =>
        ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT),
      );
  };

  const menuData = [
    {
      id: 1,
      title: 'Qibla',
      icon: QiblaIcon,
      onClick: () => navigation.navigate('qiblaScreen'),
    },
    {
      id: 2,
      title: 'Mosque',
      icon: MosqueIcon,
      onClick: () => handleMosque(),
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
      onClick: () => navigation.navigate('Quran'),
    },
    {
      id: 5,
      title: 'Higri',
      icon: CalendarIcon,
      onClick: () => navigation.navigate('hijriCalendarHome'),
    },
    {
      id: 5,
      title: 'Prayer Time',
      icon: PrayerMatIcon,
      onClick: () => navigation.navigate('namazTiming'),
    },
    {
      id: 7,
      title: 'Gallery',
      icon: PrayerMatIcon,
      onClick: () => navigation.navigate('gallery'),
    },
    {
      id: 8,
      title: 'Books',
      icon: PrayerMatIcon,
      onClick: () => navigation.navigate('book'),
    },
    {
      id: 9,
      title: 'Bookmarks',
      icon: PrayerMatIcon,
      onClick: () => navigation.navigate('bookmark'),
    },
    {
      id: 10,
      title: 'Sign Out',
      icon: PrayerMatIcon,
      onClick: () => {
        handleSignOut();
      },
    },
  ];

  return (
    <View style={styles.menuContainer}>
      {menuData.map(item => (
        <CustomMenuCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          onClick={item.onClick}
        />
      ))}
    </View>
  );
};

export default FeatureMenu;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
});
