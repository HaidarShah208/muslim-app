import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/COLORS';
import Icon from 'react-native-vector-icons/AntDesign';
import img1 from '../../assets/images/img3.png';
import LocationContainer from '../../components/LocationContainer';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const LocationScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const customStyle = {
    fontSize: 20,
  };
  const iconSize = 20;

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
        <View>
          <View style={styles.imageContainer}>
            <Image source={img1} style={styles.image} />
          </View>
          <TouchableOpacity style={styles.locationButton}>
            <LocationContainer customStyle={customStyle} iconSize={iconSize} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.description}>
            An intuitive, secure, and elegantly crafted app, the Ummah Muslim
            app highlights immersive Islamic education with detailed guides and
            lectures—plus, there’s more to come.
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate('welcome4');
            }}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrowright" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLORS.PRIMARYLIGHTGREEN,
    width: 103,
    height: 22,
    borderRadius: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 13,
    overflow: 'hidden',
  },
  progress: {
    width: '50%',
    height: '100%',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 13,
  },
  columnReverse: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  locationButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0000001A',
    padding: 18,
    borderRadius: 15,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
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
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
    alignItems: 'space-between',
    gap: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default LocationScreen;
