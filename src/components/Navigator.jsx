import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NavigatoionIcon from '../assets/icons/navigationIcon.svg';
import {COLORS} from '../constants/COLORS';

const Navigator = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <NavigatoionIcon width={50} height={50} />
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARYWHITE,
  },
});
