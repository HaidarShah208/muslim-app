import {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD_cudjcpIfAlMFQgxIQ04dvsevvaoSFXY';

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    const hasFineLocation =
      granted['android.permission.ACCESS_FINE_LOCATION'] ===
      PermissionsAndroid.RESULTS.GRANTED;
    const hasCoarseLocation =
      granted['android.permission.ACCESS_COARSE_LOCATION'] ===
      PermissionsAndroid.RESULTS.GRANTED;

    return hasFineLocation && hasCoarseLocation;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const getCityAndCountry = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
    );
    if (response.data.status === 'OK') {
      const addressComponents = response.data.results[0].address_components;
      const address = response.data.results[0].formatted_address;
      const placeid = response.data.results[0].place_id;

      let city = null;
      let country = null;
      let state = null;

      addressComponents.forEach(component => {
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (component.types.includes('country')) {
          country = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          state = component.long_name;
        }
      });

      return {city, country, state, address, placeid};
    } else {
      console.error('🔍 Error fetching geocode data:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('🔍 Error fetching geocode data:', error);
    return null;
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon1 - lon2) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};
const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [cityCountry, setCityCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchId = useRef(null);

  useEffect(() => {
    const getLocation = async () => {
      const hasLocationPermission = await requestLocationPermission();
      if (!hasLocationPermission) {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature.',
        );
        setLoading(false);
        const previousCityCountry = await AsyncStorage.getItem('cityCountry');
        if (previousCityCountry) {
          setCityCountry(JSON.parse(previousCityCountry));
        }
        return;
      }

      const fetchLocation = async () => {
        setLoading(true);
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;

            // Update the location state
            setLocation({latitude, longitude});

            const previousLocation = await AsyncStorage.getItem('location');
            const previousCityCountry = await AsyncStorage.getItem(
              'cityCountry',
            );

            if (previousLocation) {
              const {latitude: prevLat, longitude: prevLong} =
                JSON.parse(previousLocation);
              const distance = calculateDistance(
                prevLat,
                prevLong,
                latitude,
                longitude,
              );

              if (distance <= 10) {
                if (previousCityCountry) {
                  setCityCountry(JSON.parse(previousCityCountry));
                }
                setLoading(false);
                return;
              }
            }

            // Update AsyncStorage with new location and cityCountry
            await AsyncStorage.setItem(
              'location',
              JSON.stringify({latitude, longitude}),
            );

            const cityCountry = await getCityAndCountry(latitude, longitude);
            if (cityCountry) {
              await AsyncStorage.setItem(
                'cityCountry',
                JSON.stringify(cityCountry),
              );
              setCityCountry(cityCountry);
            } else if (previousCityCountry) {
              setCityCountry(JSON.parse(previousCityCountry));
            }
            setLoading(false);
          },
          async error => {
            console.error('Error getting location');
            console.error(`Error code: ${error.code}`);
            console.error(`Error message: ${error.message}`);

            switch (error.code) {
              case 1:
                Alert.alert('Error', 'Location permission denied.');
                break;
              case 2:
                Alert.alert('Error', 'Location provider not available.');
                break;
              case 3:
                Alert.alert('Error', 'Location request timed out.');
                break;
              default:
                Alert.alert('Error', 'Unknown error occurred.');
                break;
            }

            const previousCityCountry = await AsyncStorage.getItem(
              'cityCountry',
            );
            if (previousCityCountry) {
              setCityCountry(JSON.parse(previousCityCountry));
            }
            setLoading(false);
          },
          {
            enableHighAccuracy: false,
            timeout: 50000,
            maximumAge: 0,
            distanceFilter: 1000, // Only trigger if location changes by at least 1000 meters
          },
        );
      };

      fetchLocation();
      // const intervalId = setInterval(fetchLocation, 50000); // Fetch location every 50 seconds

      return () => {
        if (watchId.current !== null) {
          Geolocation.clearWatch(watchId.current);
        }
        clearInterval(intervalId);
      };
    };

    getLocation();
  }, []);

  return {location, cityCountry, loading, requestLocationPermission};
};

export default useLocation;
