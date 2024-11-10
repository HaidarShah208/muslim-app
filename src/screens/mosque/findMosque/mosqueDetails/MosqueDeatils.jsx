import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
// import haversine from 'haversine';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import useLocation from '../../../../services/useLocation';
import Geocoder from 'react-native-geocoding';
import {COLORS} from '../../../../constants/COLORS';
import Car from '../../../../assets/icons/car.png';
import DestinationIcon from '../../../../assets/icons/destinationIcon.png';
import Dot from '../../../../assets/icons/dots.svg';
import Destination from '../../../../assets/icons/destination.svg';
import DestinationsSmall from '../../../../assets/icons/destIcon.svg';
import LocationPin from '../../../../assets/icons/locationPin.svg';
import DestinationBar from '../../../../assets/icons/destinationBar.svg';
import ProgressResult from '../../../../assets/icons/progressResult.svg';
const GOOGLE_MAPS_API_KEY = 'AIzaSyCY0xYPO_q4_Q3dPgyBkayY5N0-l7DQFfw';
import Slider from '@react-native-community/slider';
import Icon from '../../../../assets/images/navigator.png';
import Polygon from '../../../../assets/icons/polygon.svg';

import {useNavigation} from '@react-navigation/native';

const decodePolyline = t => {
  let points = [];
  let index = 0,
    lat = 0,
    lng = 0;

  while (index < t?.length) {
    let b,
      shift = 0,
      result = 0;

    do {
      b = t.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      b = t.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }
  return points;
};

const getDistance = (start, end) => {};

const MosqueDetails = () => {
  const navigation = useNavigation();

  const mapRef = useRef(null);
  const [routeData, setRouteData] = useState({
    distance: '',
    duration: '',
    coordinates: [],
    totalDistance: 0,
  });
  const [searchState, setSearchState] = useState({search: '', suggestions: []});
  const [loading, setLoading] = useState(true);
  const [customOrigin, setCustomOrigin] = useState(null);
  const [progress, setProgress] = useState(0);
  const route = useRoute();
  const {location} = useLocation();
  const {mosque} = route.params;

  const destination = useMemo(
    () => ({
      latitude: mosque.geometry.location.lat,
      longitude: mosque.geometry.location.lng,
    }),
    [mosque.geometry.location],
  );

  useEffect(() => {
    // Initialize Geocoder with your API key
    Geocoder.init(GOOGLE_MAPS_API_KEY);
  }, []);
  useEffect(() => {
    if (location && !customOrigin) {
      // Set the current location as the default origin if customOrigin is not set
      Geocoder.from(location.latitude, location.longitude)
        .then(json => {
          const addressComponent = json.results[0].formatted_address;
          setSearchState(prev => ({...prev, search: addressComponent}));
          setCustomOrigin(location);
        })
        .catch(error => console.warn(error));
    }
  }, [location, customOrigin]);
  const fetchRoute = useCallback(async () => {
    try {
      const origin = customOrigin
        ? `${customOrigin.latitude},${customOrigin.longitude}`
        : `${location.latitude},${location.longitude}`;
      const res = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin,
            destination: `${destination.latitude},${destination.longitude}`,
            key: GOOGLE_MAPS_API_KEY,
            mode: 'driving',
          },
        },
      );
      const route = res?.data?.routes[0];
      const totalDistance = route?.legs[0]?.distance?.value;
      setRouteData({
        distance: route?.legs[0]?.distance?.text,
        duration: route?.legs[0]?.duration?.text,
        coordinates: decodePolyline(route.overview_polyline.points),
        totalDistance,
      });
    } catch (error) {
      console.error('Error fetching route:', error);
    } finally {
      setLoading(false);
    }
  }, [customOrigin, destination, location]);
  useEffect(() => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Set a timeout to fetch route after 5 seconds
      const timer = setTimeout(() => {
        fetchRoute();
      }, 5000);

      // Cleanup timeout if component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [location, fetchRoute]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);
  useEffect(() => {
    if (routeData.totalDistance > 0 && location) {
      const distanceFromStart = getDistance(location, destination);

      // Calculate the distance covered as the distance from start
      const progressPercentage =
        (distanceFromStart / routeData.totalDistance) * 100;

      // Cap the progress at 100%
      setProgress(Math.min(progressPercentage, 100));
    }
  }, [location, routeData]);

  const handleSearchChange = async text => {
    setSearchState(prev => ({...prev, search: text}));
    if (text.length > 2) {
      try {
        const res = await axios.get(
          'https://maps.googleapis.com/maps/api/place/autocomplete/json',
          {
            params: {input: text, types: '(regions)', key: GOOGLE_MAPS_API_KEY},
          },
        );
        setSearchState(prev => ({...prev, suggestions: res.data.predictions}));
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchState(prev => ({...prev, suggestions: []}));
    }
  };

  const handleSuggestionPress = async description => {
    setSearchState(prev => ({...prev, search: description, suggestions: []}));
    try {
      const res = await Geocoder.from(description);
      const {lat, lng} = res?.results[0]?.geometry?.location;
      setCustomOrigin({latitude: lat, longitude: lng});
    } catch (error) {
      console.error(error);
    }
  };
  const showDetail = () => {
    navigation.navigate('mosqueDetail', {mosque});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, paddingBottom: 34}}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: mosque.geometry.location.lat,
              longitude: mosque.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={destination}
              title={mosque.name}
              description={mosque.vicinity}
              image={DestinationIcon}
            />
            {location && (
              <>
                <Marker
                  coordinate={location}
                  title="Current Location"
                  description="This is your current location"
                  image={Car}
                />
                {routeData.coordinates.length > 0 && (
                  <Polyline
                    coordinates={routeData.coordinates}
                    strokeColor="#386641"
                    strokeWidth={4}
                  />
                )}
              </>
            )}
          </MapView>
          <TouchableOpacity
            onPress={showDetail}
            style={{
              position: 'absolute',

              backgroundColor: 'white',
              top: '40%',
              left: 20,
              borderRadius: 20,
              zIndex: 2000,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                gap: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  backgroundColor: '#e5e5e5',
                  alignItems: 'center',
                }}>
                <Destination />
              </View>
              <View>
                <Text style={styles.destination}>Destination</Text>
                <Text style={styles.name}>{mosque.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={{marginVertical: 10}}>
                Fastest Route now due to traffic conditions
              </Text>
              <View style={{paddingVertical: 10, position: 'relative'}}>
                <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  value={progress}
                  style={styles.slider}
                  minimumTrackTintColor="gray"
                  maximumTrackTintColor="green"
                  disabled
                  thumbTintColor="transparent"
                />
                <Image
                  source={Icon}
                  style={[
                    styles.image,
                    {left: `${progress}%`}, // Adjust position based on slider value
                  ]}
                />
              </View>
              <View style={styles.routeInfo}>
                {!routeData ? (
                  <Text>Loading...</Text>
                ) : (
                  <Text style={styles.routeText}>
                    {routeData?.duration} {routeData?.distance}
                  </Text>
                )}
              </View>
              <View style={styles.searchContainer}>
                <View style={styles.searchInputs}>
                  <DestinationsSmall />
                  <Dot />
                  <LocationPin width={20} height={18} />
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter origin"
                    value={searchState.search}
                    onChangeText={handleSearchChange}
                  />
                  {searchState?.suggestions?.length > 0 && (
                    <FlatList
                      data={searchState?.suggestions}
                      keyExtractor={item => item?.place_id}
                      renderItem={({item}) => (
                        <TouchableHighlight
                          onPress={() =>
                            handleSuggestionPress(item.description)
                          }
                          underlayColor="#ddd">
                          <Text style={styles.suggestionItem}>
                            {item.description}
                          </Text>
                        </TouchableHighlight>
                      )}
                      style={styles.suggestionsList}
                    />
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter destination"
                    value={mosque?.name}
                    editable={false}
                  />
                </View>
              </View>

              {/* <View
                style={{
                  borderBottomWidth: 1,
                  width: '100%',
                  overflow: 'auto',
                  marginTop: 30,
                  borderColor: '#c8c8c8',
                  position: 'relative',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    left: '40%',
                    top: -20,
                    width: 71,
                    height: 46,
                    backgroundColor: '#386641',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: '600',
                    }}>
                    {Math.round(progress)}%
                  </Text>
                  <Polygon style={{position: 'absolute', top: -15}} />
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MosqueDetails;

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    width: '100%',
    height: '60%',
  },
  infoContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  infoBox: {
    width: '97%',
    height: '100%',
    padding: 27,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  slider: {
    width: '100%',
    height: 40,
    paddingVertical: 20, // Increase the height of the slider itself
  },
  destinationRow: {
    flexDirection: 'row',
    padding: 15,
    gap: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: '20%',
    left: 20,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
  },
  destination: {
    fontSize: 12,
    fontWeight: '500',
  },
  destinationText: {
    fontSize: 12,
    fontWeight: '500',
  },
  nameText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  routeInfo: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 20,
  },
  routeText: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  image: {
    position: 'absolute',
    top: 35,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  sliderContainer: {
    width: '80%',
    height: 60, // Increase the height of the container
    justifyContent: 'center', // Center the slider vertically in the container
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  searchInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 7,
  },
  input: {
    height: 40,
    width: 280,
    borderColor: '#d8e0d9',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    elevation: 23,
    zIndex: 1000,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
