import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator, // Import ActivityIndicator for the loader
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainNavigator from '../../../components/MainNavigator';
import Search from '../../../assets/icons/search.svg';
import Gps from '../../../assets/icons/gps.svg';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {COLORS} from '../../../constants/COLORS';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMasjid} from '../../../store/slices/mosqueSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindMosque = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({});

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pinColor = COLORS.DARKGREEN;
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCY0xYPO_q4_Q3dPgyBkayY5N0-l7DQFfw';
  const mosque = useSelector(state => state.mosque.mosque);
  const status = useSelector(state => state.mosque.status);

  const [region, setRegion] = useState({
    latitude: location ? location.latitude : 37.78825,
    longitude: location ? location.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  Geocoder.init(GOOGLE_MAPS_API_KEY);

  const fetchMosque = async (latitude, longitude) => {
    dispatch(fetchMasjid({latitude, longitude}));
  };

  const searchCity = async city => {
    try {
      const res = await Geocoder.from(city);
      const {lat, lng} = res.results[0].geometry.location;
      setRegion({
        ...region,
        latitude: lat,
        longitude: lng,
      });
      fetchMosque(lat, lng);
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
    setSearch('');

    if (location) {
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: location?.latitude,
        longitude: location?.longitude,
      }));
      fetchMosque(location?.latitude, location?.longitude);

      try {
        const res = await Geocoder.from(location.latitude, location.longitude);
        const city = res?.results[0]?.address_components?.find(component =>
          component.types.includes('locality'),
        );
        setSearch(city ? city.long_name : '');
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (location) {
      setRegion(prevRegion => ({
        ...prevRegion,
        latitude: location?.latitude,
        longitude: location?.longitude,
      }));
      fetchMosque(location?.latitude, location?.longitude);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MainNavigator heading={'Mosque Finder'} />
      <View style={styles.inputContainer}>
        <View style={styles.inputInnerContainer}>
          <Search width={20} height={20} />
          <TextInput
            onChangeText={handleSearchChange}
            value={search}
            style={styles.input}
            placeholder="Refine your location"
            placeholderTextColor="#B2B5C1"
            keyboardType="default"
          />
          <TouchableOpacity onPress={() => update()}>
            <Gps width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.shareText}>Share</Text>
        </View>
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={item => item.place_id}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => handleSuggestionPress(item.description)}
                underlayColor="#ddd">
                <Text style={styles.suggestionItem}>{item.description}</Text>
              </TouchableHighlight>
            )}
            style={styles.suggestionsList}
          />
        )}
      </View>
      {status === 'loading' ? ( // Show loader while fetching data
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={pinColor} />
        </View>
      ) : (
        <View style={{borderRadius: 43, overflow: 'hidden'}}>
          <MapView style={styles.map} region={region}>
            {mosque?.map(mosque => (
              <Marker
                key={mosque.place_id}
                pinColor={pinColor}
                coordinate={{
                  latitude: mosque?.lat,
                  longitude: mosque?.lon,
                }}
                title={mosque.name}
                description={mosque.vicinity}
                onPress={() => navigation.navigate('mosqueDetails', {mosque})}
              />
            ))}
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#f2f2f5',
    borderRadius: 10,
    paddingLeft: 12,
    marginTop: 27,
    flexDirection: 'column',
  },
  inputInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  input: {
    height: 60,
    paddingLeft: 1,
    width: '50%',
    fontSize: 16,
    color: 'black',
  },
  separator: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B2B5C1',
  },
  shareText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#B2B5C1',
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
  map: {
    marginTop: 20,
    width: '100%',
    height: '87%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FindMosque;
