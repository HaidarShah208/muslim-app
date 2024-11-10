import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS} from '../constants/COLORS';
import FajrIcon from '../assets/icons/fajr-icon.svg';
import DhuhrIcon from '../assets/icons/fajr-icon.svg';
import AsrIcon from '../assets/icons/fajr-icon.svg';
import MaghribIcon from '../assets/icons/fajr-icon.svg';
import IshaIcon from '../assets/icons/fajr-icon.svg';
import BackgroundImageFajr from '../assets/images/fajarBackground.png';
import BackgroundImageSunrise from '../assets/images/sunriseBackground.png';
import BackgroundImageDhuhr from '../assets/images/zohrBackground.png';
import BackgroundImageAsr from '../assets/images/asarBackground.png';
import BackgroundImageMaghrib from '../assets/images/magribBackground.png';
import BackgroundImageIsha from '../assets/images/ishaBackground.png';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

const PrayerTimeWidget = ({
  prayersTiming,
  customStyles = {},
  showScrollIcon = true,
}) => {
  const [currentNamaz, setCurrentNamaz] = useState(null);
  const [nextNamaz, setNextNamaz] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateRemainingTime = nextPrayerTime => {
    const now = new Date();
    const timeDifference = nextPrayerTime - now;

    // If time difference is negative, it means the next prayer is on the following day
    if (timeDifference < 0) {
      nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
    }

    const newTimeDifference = nextPrayerTime - now;
    const hours = Math.floor(
      (newTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (newTimeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((newTimeDifference % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // useEffect(() => {

  //  } , [prayersTiming]);

  useEffect(() => {
    if (prayersTiming) {
      const {timings} = prayersTiming.data;
      const prayerTimes = [
        'Fajr',
        'Sunrise',
        'Dhuhr',
        'Asr',
        'Maghrib',
        'Isha',
      ].map(namazName => ({
        namazName,
        time: timings[namazName],
      }));

      const updatePrayerTimes = () => {
        const now = new Date();
        let currentPrayer = null;
        let nextPrayer = null;

        for (let i = 0; i < prayerTimes.length; i++) {
          const {namazName, time} = prayerTimes[i];
          const prayerTime = new Date(
            `${now.toISOString().slice(0, 10)}T${time}`,
          );

          if (prayerTime > now) {
            if (namazName === 'Sunrise') {
              currentPrayer = 'Fajr';
              nextPrayer = 'Dhuhr';
              break;
            }
            nextPrayer = namazName;
            currentPrayer =
              i === 0
                ? prayerTimes[prayerTimes.length - 1].namazName
                : prayerTimes[i - 1].namazName;
            break;
          }
        }

        if (!nextPrayer) {
          nextPrayer = prayerTimes[0].namazName;
          currentPrayer = prayerTimes[prayerTimes.length - 1].namazName;
        }

        const nextPrayerTime = new Date(
          `${now.toISOString().slice(0, 10)}T${timings[nextPrayer]}`,
        );
        const timeLeft = calculateRemainingTime(nextPrayerTime);
        setRemainingTime(timeLeft);

        if (nextPrayer === 'Dhuhr') {
          setCurrentNamaz('Dhuhr');
        } else {
          setCurrentNamaz(currentPrayer);
        }

        setNextNamaz(nextPrayer);
        const currentPrayerIndex = prayerTimes.findIndex(
          prayer => prayer.namazName === currentPrayer,
        );
        setCurrentIndex(currentPrayerIndex);
      };

      updatePrayerTimes();
      const intervalId = setInterval(updatePrayerTimes, 1000);

      return () => clearInterval(intervalId);
    }
  }, [prayersTiming]);

  const getBackgroundImage = namazName => {
    switch (namazName) {
      case 'Fajr':
        return BackgroundImageFajr;
      case 'Sunrise':
        return BackgroundImageSunrise;
      case 'Dhuhr':
        return BackgroundImageDhuhr;
      case 'Asr':
        return BackgroundImageAsr;
      case 'Maghrib':
        return BackgroundImageMaghrib;
      case 'Isha':
        return BackgroundImageIsha;

      default:
        return null;
    }
  };

  const getIcon = namazName => {
    switch (namazName) {
      case 'Fajr':
        return <FajrIcon width={28} height={20} style={styles.icon} />;
      case 'Dhuhr':
        return <DhuhrIcon width={28} height={20} style={styles.icon} />;
      case 'Asr':
        return <AsrIcon width={28} height={20} style={styles.icon} />;
      case 'Maghrib':
        return <MaghribIcon width={28} height={20} style={styles.icon} />;
      case 'Isha':
        return <IshaIcon width={28} height={20} style={styles.icon} />;
      default:
        return null;
    }
  };

  const formatAMPM = time => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour, 10);
    const minutes = parseInt(minute, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;
  };

  if (!currentNamaz || !nextNamaz) {
    return null;
  }

  const getNextPrayer = current => {
    const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const currentIndex = prayerOrder.indexOf(current);
    return prayerOrder[(currentIndex + 1) % prayerOrder.length];
  };
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Swiper
        loop={false}
        width={width}
        height={250}
        index={currentIndex}
        bounces={false}
        horizontal={true}
        paginationStyle={{
          bottom: 10,
          alignItems: 'center',
        }}
        dotStyle={{
          backgroundColor: COLORS.PRIMARYGREEN,
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 8,
          marginTop: 3,
        }}
        activeDotStyle={{
          backgroundColor: COLORS.PRIMARYGREEN,
          width: 52,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 8,
          marginTop: 3,
        }}
        automaticallyAdjustContentInsets={true}
        showsPagination={true}
        removeClippedSubviews={false}>
        {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(namaz => (
          <View key={namaz} style={[styles.slide, customStyles.slide]}>
            <ImageBackground
              key={namaz}
              source={getBackgroundImage(namaz)}
              style={[styles.card, customStyles.card]}>
              <View
                style={[styles.namazContainer, customStyles.namazContainer]}>
                <Text style={[styles.nowText, customStyles.nowText]}>
                  {namaz === currentNamaz
                    ? 'Now'
                    : namaz === nextNamaz
                    ? 'Next'
                    : ''}
                </Text>
                <Text
                  style={[
                    styles.namazNameText,
                    {width: '100%'},
                    customStyles.namazNameText,
                  ]}>
                  {namaz}
                </Text>
                <Text
                  style={[styles.namazTimeText, customStyles.namazTimeText]}>
                  {prayersTiming &&
                  prayersTiming.data &&
                  prayersTiming.data.timings
                    ? formatAMPM(prayersTiming.data.timings[namaz])
                    : ''}
                </Text>
              </View>
              <View style={[styles.timeContainer, customStyles.timeContainer]}>
                {getIcon(getNextPrayer(namaz))}
                <Text
                  style={[styles.remainingTime, customStyles.remainingTime]}>
                  {prayersTiming &&
                  prayersTiming.data &&
                  prayersTiming.data.timings
                    ? calculateRemainingTime(
                        new Date(
                          `${new Date().toISOString().slice(0, 10)}T${
                            prayersTiming.data.timings[
                              namaz === currentNamaz ? nextNamaz : namaz
                            ]
                          }`,
                        ),
                      )
                    : ''}
                </Text>
                <Text
                  style={[
                    styles.informationLabel,
                    customStyles.informationLabel,
                  ]}>
                  Remaining till {namaz === currentNamaz ? nextNamaz : namaz}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default PrayerTimeWidget;

const styles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 15,
    borderRadius: 20,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    overflow: 'hidden',
    width: width - 30,
  },
  namazContainer: {
    width: '60%',
  },
  nowText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins',
    marginLeft: 15,
    marginBottom: 15,
  },
  namazNameText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 33,
    fontWeight: '700',
    fontFamily: 'Poppins',
    marginLeft: 15,
  },
  namazTimeText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins',
    marginLeft: 15,
  },
  timeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },

  remainingTime: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    marginBottom: 5,
  },
  informationLabel: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  scrollIcon: {
    marginTop: 10,
    alignItems: 'center',
  },
});
