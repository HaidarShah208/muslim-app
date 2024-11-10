import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';
import {useNavigation} from '@react-navigation/native';

const HijriCutomButton = ({onPress}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 11,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HijriCutomButton;

const styles = StyleSheet.create({
  text: {fontWeight: '700', fontSize: 25, color: COLORS.DARKGREEN},
});
