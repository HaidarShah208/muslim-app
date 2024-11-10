import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchIcon from '../../assets/icons/searchWithPadding.svg';
import MenuIcon from '../../assets/icons/bookMarkIcon.svg';
import Gps from '../../assets/icons/gps.svg';

import ActionsHeader from '../../components/ActionsHeader';
import {COLORS} from '../../constants/COLORS';
import ShowAllNavigator from '../../components/ShowAllNavigator';
import MosqueCard from '../../components/MosqueCard';
import {useNavigation} from '@react-navigation/native';
import {fetchMasjid} from '../../store/slices/mosqueSlice';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationContainer from '../../components/LocationContainer';

const Mosque = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCY0xYPO_q4_Q3dPgyBkayY5N0-l7DQFfw';

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({});
  const [currentTime, setCurrentTime] = useState(''); // State to store current time

  useEffect(() => {
    const getLocation = async () => {
      try {
        const locationJson = await AsyncStorage.getItem('location');
        const locationData = locationJson ? JSON.parse(locationJson) : null;
        setLocation(locationData);
      } catch (error) {
        console.error('Failed to retrieve location from AsyncStorage:', error);
      }
    };
    getLocation();
  }, []);

  const [region, setRegion] = useState({
    latitude: location?.latitude,
    longitude: location?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const navigation = useNavigation();

  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);
  }, []);

  useEffect(() => {
    if (location) {
      const fetchCityName = async () => {
        try {
          const res = await Geocoder.from(
            location.latitude,
            location.longitude,
          );
          const city = res?.results[0]?.address_components?.find(component =>
            component.types.includes('locality'),
          );
          const cityName = city ? city.long_name : '';
          setSearch(cityName);
          setRegion(prevRegion => ({
            ...prevRegion,
            latitude: location.latitude,
            longitude: location.longitude,
          }));
          fetchMasjid(location.latitude, location.longitude);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCityName();
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: location?.latitude,
        longitude: location?.longitude,
      }));
      fetchMasjid(location?.latitude, location?.longitude);
    }
  }, [location]);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    // Update time immediately when component mounts
    updateCurrentTime();

    // Set up interval to update time every minute
    const timer = setInterval(updateCurrentTime, 60000);

    // Clear the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const searchCity = async city => {
    try {
      const res = await Geocoder.from(city);
      const {lat, lng} = res.results[0].geometry.location;
      setRegion({
        ...region,
        latitude: lat,
        longitude: lng,
      });
      fetchMasjid(lat, lng);
      setSuggestions([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = async text => {
    setSearch(text);
    if (text.length > 2) {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
          {
            params: {
              input: text,
              types: '(regions)',
              key: GOOGLE_MAPS_API_KEY,
            },
          },
        );
        setSuggestions(res.data.predictions);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = description => {
    setSearch(description);
    searchCity(description);
  };

  const update = async () => {
    if (location) {
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: location?.latitude,
        longitude: location?.longitude,
      }));

      try {
        const res = await Geocoder.from(location.latitude, location.longitude);
        const city = res?.results[0]?.address_components?.find(component =>
          component.types.includes('locality'),
        );
        setSearch(city ? city.long_name : '');
        fetchMasjid(location.latitude, location.longitude);
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ActionsHeader
        secondIcon={
          <MenuIcon
            width={30}
            height={30}
            onPress={() => {
              navigation.navigate('mosqueBookmark');
            }}
          />
        }
        heading="Mosque"
        firstIcon={<SearchIcon width={30} height={30} />}
      />

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.rich}>Find Closest Mosque Near you.</Text>
          </View>
        </View>
        <View style={styles.secondaryContainer}>
          <View>
            <Text style={styles.time}>{currentTime}</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputInnerContainer}>
              <LocationContainer />
              <TouchableOpacity onPress={update}>
                <Gps width={30} height={25} />
              </TouchableOpacity>
            </View>
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={item => item.place_id}
                renderItem={({item}) => (
                  <TouchableHighlight
                    onPress={() => handleSuggestionPress(item.description)}
                    underlayColor="#ddd">
                    <Text style={styles.suggestionItem}>
                      {item.description}
                    </Text>
                  </TouchableHighlight>
                )}
                style={styles.suggestionsList}
              />
            )}
          </View>
        </View>

        <MosqueCard region={region} />
      </View>
    </View>
  );
};

export default Mosque;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  textContainer: {paddingTop: 15},
  textWrapper: {width: 262, flexDirection: 'column'},
  textMainContainer: {flexDirection: 'row', alignItems: 'center'},
  explore: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000000',
    writingDirection: 'ltr',
  },
  text: {fontSize: 20, color: '#000000'},
  rich: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  experience: {
    fontSize: 20,
    lineHeight: 38,
    fontWeight: '400',
    color: '#000000',
  },
  secondaryContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
  },
  prayerText: {
    transform: [{rotate: '-90deg'}],
    backgroundColor: '#ffdf22',
    padding: 3,
    position: 'absolute',
    borderRadius: 3,
    fontWeight: '700',
    fontSize: 10,
    color: COLORS.DARKGREEN,
    right: -35,
    top: 14,
  },
  tools: {fontSize: 15, paddingBottom: 10, color: '#000000'},
  toolIconContainer: {flexDirection: 'row', gap: 10},
  infoIcon: {
    backgroundColor: '#f2f2f5',
    alignItems: 'center',
    width: 36,
    padding: 5,
    borderRadius: 5,
  },
  calendarIcon: {
    backgroundColor: '#239371',
    alignItems: 'center',
    width: 36,
    padding: 5,
    borderRadius: 5,
  },
  moreIcon: {
    backgroundColor: '#239371',
    alignItems: 'center',
    width: 36,
    justifyContent: 'center',
    borderRadius: 5,
  },
  moreText: {color: 'white', fontSize: 15, fontWeight: '700'},
  locationContainer: {paddingTop: 30},
  inputContainer: {
    backgroundColor: '#f2f2f5',
    borderRadius: 10,
    paddingLeft: 12,
    // marginTop: 27,
  },
  inputInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    height: 60,
    paddingLeft: 1,
    width: '75%',
    fontSize: 16,
    color: 'black',
  },
  suggestionsList: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    elevation: 3,
    zIndex: 1000,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
