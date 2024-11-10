import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/icons/arrowLeft.svg';
import {COLORS} from '../constants/COLORS';
import {useNavigation} from '@react-navigation/native';

const ActionsHeader = ({
  heading,
  secondIcon,
  svgIcon,
  firstIcon,
  handlePressfirstIcon,
  handlePressSecond,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackIcon}>
        {firstIcon ? (
          <TouchableOpacity style={styles.firstIcon}>
            {firstIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderIcon} />
        )}
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        {svgIcon ? (
          <TouchableOpacity style={styles.secondIcon}>
            {svgIcon}
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {heading && <Text style={styles.heading}>{heading}</Text>}
      </View>
      {secondIcon ? (
        <TouchableOpacity style={styles.secondIcon}>
          {secondIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderIcon} />
      )}
    </View>
  );
};

export default ActionsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
  secondIcon: {},
  placeholderIcon: {
    width: 40,
  },
  firstIcon: {},
});
