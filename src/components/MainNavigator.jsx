import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/icons/arrowLeft.svg';
import {COLORS} from '../constants/COLORS';
import {useNavigation} from '@react-navigation/native';

const MainNavigator = ({heading, otherIcon, svgIcon, title, onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackIcon}
        onPress={() => navigation.goBack()}>
        <ArrowLeft width={30} height={30} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        {svgIcon ? (
          <TouchableOpacity style={styles.otherIcon}>
            {svgIcon}
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {title ? (
          <Text style={styles.heading}>{title}</Text>
        ) : (
          <Text style={styles.heading}>{heading}</Text>
        )}
      </View>
      {otherIcon ? (
        <TouchableOpacity style={styles.otherIcon} onPress={onPress}>
          {otherIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderIcon} />
      )}
    </View>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  goBackIcon: {
    width: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.PRIMARYGREEN,
    fontFamily: 'poppins',
  },
  otherIcon: {},
  placeholderIcon: {
    width: 30,
  },
});
