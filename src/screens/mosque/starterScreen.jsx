import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Arrow from '../../assets/images/Arrow.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StarterMosque = ({navigation}) => {
  const handleProceed = async () => {
    await AsyncStorage.setItem('hasQuranScreen', 'true');
    navigation.replace('mosqueStart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        No More Scrolling, Find Your Mosque Instantly
      </Text>

      <View style={styles.statContainer}>
        <Text style={styles.statText}>3M+</Text>
        <View style={styles.divider} />
        <View style={styles.discoverContainer}>
          <Text style={styles.discoverTitle}>Discover</Text>
          <Text style={styles.discoverText}>
            Effortlessly Discover the Nearest Mosque with Our Advanced Finder.
            Access Detailed Information on Prayer Times, Facilities, Events, and
            More in Just a Few Clicks
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Text style={styles.arrow}>
          {' '}
          <Arrow />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '200',
    marginBottom: 20,
    lineHeight: 50,
  },
  statContainer: {
    // backgroundColor: '#2aa97c',
    borderRadius: 15,
    // padding: 20,
    alignItems: 'center',
  },
  statText: {
    fontSize: 108,
    fontWeight: '700',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 10,
  },
  discoverContainer: {
    // alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 10,
    gap: 10,
  },
  discoverTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 5,
  },
  discoverText: {
    color: 'white',
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 250,
    height: 54,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#1c1c1e',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 10,
  },
  arrow: {
    color: '#1c1c1e',
    fontSize: 20,
  },
});

export default StarterMosque;
