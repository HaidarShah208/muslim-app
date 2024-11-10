import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';

const ShowAllNavigator = ({
  lable,
  linkText,
  lableStyle,
  linkTextStyle,
  onPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.lableText, lableStyle]}>{lable}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.linkText, linkTextStyle]}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowAllNavigator;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  lableText: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: COLORS.PRIMARYGREEN,
    paddingStart:15
  },
  linkText: {
    fontSize: 10,
    marginTop: 10,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: COLORS.PRIMARYGREEN,
  },
});
