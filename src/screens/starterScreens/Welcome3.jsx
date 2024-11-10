import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/COLORS';
import Icon from 'react-native-vector-icons/AntDesign';
import img1 from '../../assets/images/img3.png';
import useLocation from '../../services/useLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const WelcomeScreen3 = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [currentLocation, setCurrentLocation] = useState(null);
  const {
    location,
    cityCountry,
    loading,
    hasFineLocationPermission,
    hasCoarseLocationPermission,
    requestLocationPermission,
  } = useLocation();
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const locationJson = await AsyncStorage.getItem('location');
        const locationData = locationJson ? JSON.parse(locationJson) : null;
        setCurrentLocation(locationData);
      } catch (error) {
        console.error('Failed to retrieve location from AsyncStorage:', error);
      } finally {
        setLoadingState(false);
      }
    };
    getLocation();
  }, [cityCountry]);

  useEffect(() => {
    if (currentLocation && Object.keys(currentLocation).length > 0) {
      setIsLocationEnabled(true);
    } else {
      setIsLocationEnabled(false);
    }
  }, [currentLocation]);

  const handleEnableLocation = async () => {
    Alert.alert(
      'Enable Location',
      'This app needs access to your location to provide accurate data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Enable',
          onPress: async () => {
            const permissionGranted = await requestLocationPermission();
            if (permissionGranted) {
              setLoadingState(true);
              const newLocation = await location; // Fetch the location
              setCurrentLocation(newLocation);
              await AsyncStorage.setItem(
                'location',
                JSON.stringify(newLocation),
              );
              setLoadingState(false);
              setIsLocationEnabled(true);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.progressBar}>
            <View style={styles.progress}></View>
          </View>
          <View style={styles.columnReverse}>
            <View style={styles.header}>
              <Text style={styles.welcomeText}>AUTOPILOT</Text>
            </View>
            <Text style={styles.mainText}>Location</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={img1} style={styles.image} />
          </View>
          {!isLocationEnabled && (
            <TouchableOpacity
              style={styles.locationButton}
              onPress={handleEnableLocation}>
              <Text style={styles.locationText}>Enable Location Services</Text>
            </TouchableOpacity>
          )}
          {isLocationEnabled && (
            <Text style={styles.locationEnabledText}>
              Location Enabled Successfully
            </Text>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.description}>
            An intuitive, secure, and elegantly crafted app, the Ummah Muslim
            app highlights immersive Islamic education with detailed guides and
            lectures—plus, there’s more to come.
          </Text>
          <View style={{marginTop: 20}}>
            {loadingState ? (
              <ActivityIndicator size="large" color={COLORS.PRIMARYGREEN} />
            ) : (
              isLocationEnabled && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => navigation.navigate('locationScreen')}>
                  <Text style={styles.nextButtonText}>Next</Text>
                  <Icon
                    name="arrowright"
                    color="white"
                    size={20}
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    backgroundColor: COLORS.PRIMARYLIGHTGREEN,
    width: 103,
    height: 22,
    borderRadius: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 13,
    overflow: 'hidden',
  },
  progress: {
    width: '50%',
    height: '100%',
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 13,
  },
  columnReverse: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: 10,
    fontFamily: 'Poppins',
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  locationButton: {
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  locationEnabledText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
    marginTop: 10,
  },
  bottomContainer: {},
  description: {
    color: COLORS.BLACK,
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 30,
    paddingHorizontal: 10,
    lineHeight: 20,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  nextButton: {
    borderRadius: 10,
    alignItems: 'space-between',
    gap: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
  },
  nextButtonText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default WelcomeScreen3;
