import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progress}></View>
      </View>

      <Text style={styles.mainText}>Assalamu alaykum</Text>

      <View style={styles.imageContainer}>
        {/* <Image
          source={{ uri: 'https://your-image-url.com/praying-muslim.png' }} // Replace with your actual image URI
          style={styles.image}
        /> */}
      </View>

      <Text style={styles.description}>
        An intuitive, secure, and elegantly crafted app, the Ummah Muslim app
        highlights immersive Islamic education with detailed guides and
        lectures—plus, there’s more to come.
      </Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('NextScreen')} // Replace with your actual navigation logic
      >
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
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
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progress: {
    width: '50%', // Adjust to represent the progress
    height: '100%',
    backgroundColor: '#26A069',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  description: {
    color: '#A9A9A9',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#26A069',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default WelcomeScreen;
