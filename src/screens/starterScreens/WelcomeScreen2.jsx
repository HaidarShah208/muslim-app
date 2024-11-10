import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import img1 from '../../assets/images/img2.png';
import {COLORS} from '../../constants/COLORS';
import Icon from 'react-native-vector-icons/AntDesign';
const {width} = Dimensions.get('window');

const WelcomeScreen2 = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.progressBar}>
            <View style={styles.progress}></View>
          </View>

          <Text style={styles.mainText}>Private & Ad-Free</Text>
        </View>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={img1} // Replace with your actual image URI
              style={styles.image}
            />
          </View>
        </View>

        <View>
          <Text style={styles.description}>
            Muslims are entitled to their privacy, and the Ummaah Muslim app is
            designed with that in mind—private, ad-free, and focused on
            delivering an enriching Islamic experience, with even more features
            on the horizon.
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('welcome3')} // Replace with your actual navigation logic
          >
            <Text style={styles.nextButtonText}>Next </Text>
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
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    color: '#7E7E7E',
    fontSize: 18,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 13,
    overflow: 'hidden',
  },
  progress: {
    width: '35%', // Adjust to represent the progress
    height: '100%',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 30,
  },
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: 10,
    fontFamily: 'Poppins',
  },
  imageContainer: {
    alignItems: 'center',
    // marginBottom: 30,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
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

export default WelcomeScreen2;
