import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants/COLORS';
import Hamburger from '../assets/icons/hamburger.svg';
const CustomHeader = () => {
  const [greet, setGreet] = useState('');
  const findGreet = () => {
    const hour = new Date().getHours();
    if (hour == 0 || hour < 12) return setGreet('Morning');
    else if (hour == 1 || hour < 17) {
      return setGreet('Afternoon');
    } else {
      setGreet('Evening');
    }
  };
  useEffect(() => {
    findGreet();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Good {greet}!</Text>
      <View>
        <Hamburger />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: COLORS.DARKGREEN,
  },
});
