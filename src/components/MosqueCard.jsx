
import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMasjid } from '../store/slices/mosqueSlice';
import { COLORS } from '../constants/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDistance } from 'geolib';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { WaveIndicator } from 'react-native-indicators';
import Slider from '@react-native-community/slider';
import Radius from '../assets/icons/radius.svg'
const MosqueCard = ({ region }) => {
  const dispatch = useDispatch();
  const mosque = useSelector((state) => state.mosque.mosque);
  const status = useSelector((state) => state.mosque.status);
  const prayersTiming = useSelector((state) => state.prayerTiming.timings);
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('All');
  const [radius, setRadius] = useState(1);
  useEffect(() => {
    if (region?.latitude && region?.longitude) {
      dispatch(fetchMasjid({ latitude: region.latitude, longitude: region.longitude }));
    }
  }, [region, dispatch]);

  const convertTo12HourFormat = (time24) => {
    if (!time24) return ''; // Return an empty string if time24 is undefined
    const [hour, minute] = time24.split(':');
    const hour12 = (hour % 12) || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${ampm}`;
  };
  
  const prayerTimes = useMemo(() => {
    const initialPrayerTimes = [
      { name: 'Fajr', time: prayersTiming?.Fajr, icon: require('../assets/icons/fajr.png') },
      { name: 'Dhuhr', time: prayersTiming?.Dhuhr, icon: require('../assets/icons/dhuhr.png') },
      { name: 'Asr', time: prayersTiming?.Asr, icon: require('../assets/icons/asr.png') },
      { name: 'Maghrib', time: prayersTiming?.Maghrib, icon: require('../assets/icons/maghrib.png') },
      { name: 'Isha', time: prayersTiming?.Isha, icon: require('../assets/icons/isha.png') },
    ];
  
    const now = new Date();
    const closestPrayer = initialPrayerTimes.reduce((closest, prayer) => {
      if (!prayer.time) return closest; // Skip if time is undefined
  
      const prayerTime = new Date();
      const [hour, minute] = prayer.time.split(':');
      prayerTime.setHours(parseInt(hour), parseInt(minute));
  
      if (!closest || (prayerTime > now && prayerTime < closest.time)) {
        return { ...prayer, time: prayerTime };
      }
      return closest;
    }, null);
  
    return closestPrayer
      ? { ...closestPrayer, time: convertTo12HourFormat(closestPrayer.time.toTimeString().slice(0, 5)) }
      : null;
  }, [prayersTiming]);

  const calculateDistance = (mosqueLocation) => {
    if (!region?.latitude || !region?.longitude || !mosqueLocation?.latitude || !mosqueLocation?.longitude) {
      return null;
    }
    const distanceInMeters = getDistance(
      { latitude: region.latitude, longitude: region.longitude },
      { latitude: mosqueLocation.latitude, longitude: mosqueLocation.longitude }
    );
    const distanceInKm = distanceInMeters / 1000;
    return distanceInKm.toFixed(1);
  };
  const filteredMosques = useMemo(() => {
    if (!mosque) return [];  // Return an empty array if mosque data is null/undefined

    return mosque.filter((m) => {
      const distance = calculateDistance({ latitude: m?.lat, longitude: m?.lon });
      return distance && distance <= radius;
    });
  }, [radius, mosque])
  const handlePress = (mosque) => {
    const mosqueLocation = {
      latitude: mosque?.lat,
      longitude: mosque?.lon,
    };
    const url = `https://www.google.com/maps/dir/?api=1&origin=${region.latitude},${region.longitude}&destination=${mosqueLocation.latitude},${mosqueLocation.longitude}`;
    Linking.openURL(url);
  };
 
  if (status === 'loading') {
    return (
      <View style={styles.loaderContainer}>
         <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: COLORS.PRIMARYGREEN,
          }}
        >
          Retrieving mosque information, please wait..
        </Text>
        <WaveIndicator size={100} color={COLORS.DARKGREEN} />
       
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Failed to load mosques.</Text>
      </View>
    );
  }

  return (
    <>
     <View style={styles.tabsContainer}>
    
        <View style={styles.tabsContainer}>
        <Text style={{
          backgroundColor:'#F2F2F5',
          padding: 10,
          borderRadius: 8,
     
        }}> <Radius /></Text>
        <TouchableOpacity style={{
          flexDirection: 'column',
       
          paddingHorizontal: 20,
          display: 'flex',
          width: '100%',
          marginLeft: 50,
        }}>
          <Text style={{
            color: "black"
          }}>Radius: {radius} km</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={2}
            maximumValue={150}
            step={1}
            value={radius}
            onValueChange={(value) => setRadius(value)}
            minimumTrackTintColor={COLORS.PRIMARYGREEN}
            maximumTrackTintColor={COLORS.DARKGRAY}
          />
        </TouchableOpacity>
      </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {filteredMosques?.length > 0 ? (
          filteredMosques
            .filter(
              (mosque) =>
                mosque?.tags?.name &&
                mosque?.tags?.['addr:city'] &&
                mosque?.tags?.['addr:street']
            )
            .map((mosque, index) => {
              const mosqueLocation = {
                latitude: mosque?.lat,
                longitude: mosque?.lon,
              };
              const distance = calculateDistance(mosqueLocation);

            return (
              <View key={index} style={styles.cardContainer}>
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.mosqueName}>{mosque?.tags?.name}</Text>
                    <View style={styles.addressContainer}>
                      <Icon
                        name="location-outline"
                        size={16}
                        color={COLORS.DARKGRAY}
                      />
                      <Text style={styles.mosqueAddress}>
                        {mosque?.tags?.['addr:street']},{' '}
                        {mosque?.tags?.['addr:city']}
                      </Text>
                    </View>
                    {prayerTimes && (
                      <View style={styles.prayerTimeContainer}>
                        <Text style={styles.prayerTimeLabel}>
                          {prayerTimes.name}:
                        </Text>
                        <Text style={styles.prayerTime}>{prayerTimes.time}</Text>
                      </View>
                    )}
                  </View>
                  <ImageBackground
                    source={require('../assets/images/bgIcon.png')}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                  >
                    <View style={styles.distanceContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          onPress={() => handlePress(mosque)}
                          style={{
                            backgroundColor: 'white',
                            width: 45,
                            height: 45,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                          }}
                        >
                          <Icons
                            name="directions"
                            size={20}
                            color='black'
                          />
                        </Text>

                        <Text
                          onPress={() => {
                            navigation.navigate('mosqueDetail', { mosque });
                          }}
                          style={{
                            backgroundColor: 'white',
                            width: 45,
                            // height: 45,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                          }}
                        >
                          <Icons name="arrow-right" size={18}   color='black' style={{
                            alignSelf: 'center',
                            
                          }}  />
                        </Text>
                      </View>
                      <Text style={styles.distance}>
                        {distance ? `${distance} Km` : 'N/A'}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            );
          })
      ) : (
        <View style={styles.loaderContainer}>
          <Text>No mosques found.</Text>
        </View>
      )}
    </ScrollView>
    </>
   
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#F2F2F5',
    padding: 15,
    marginBottom: 15,
  },
  cardContent: {
    flex: 1,
  },
  mosqueName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  mosqueAddress: {
    color: 'black',
    fontSize: 12,
    marginLeft: 5,
  },
  prayerTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  prayerTimeLabel: {
    color: COLORS.DARKGRAY,
    fontSize: 14,
    fontWeight: '500',
  },
  prayerTime: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  imageBackground: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    opacity: 0.7,
  },
  distanceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  distance: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabsContainer: {
  
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-around',
    width: '100%',
 paddingHorizontal: 10,
    flexDirection: 'row',

  },
  tab: {
    paddingVertical: 2,
    // paddingHorizontal: 30,
    borderRadius: 20,
    borderColor:COLORS.PRIMARYGREEN,
    borderWidth: 1,
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.PRIMARYGREEN,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  activeTabText: {
    color:'white',
  },
  sliderContainer: {
    // alignItems: 'center',
    marginVertical: 15,
  },
});

export default MosqueCard;
