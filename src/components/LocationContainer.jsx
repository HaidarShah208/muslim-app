import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants/COLORS';
import LocationIcon from '../assets/icons/location.svg';
import useLocation from '../services/useLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationContainer = ({customStyle, iconSize}) => {
  const [currentlocation, setLocation] = useState();
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
  return (
    <>
      <View style={styles.locationContainer}>
        {iconSize ? (
          <LocationIcon width={iconSize} height={iconSize} />
        ) : (
          <LocationIcon width={12} height={12} />
        )}

        <Text style={[styles.locationText, customStyle]}>
          {currentlocation?.city}, {currentlocation?.country}
        </Text>
      </View>
    </>
  );
};

export default LocationContainer;

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 10,
    color: COLORS.BLACK,
  },
});
