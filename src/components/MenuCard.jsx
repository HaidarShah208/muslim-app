import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';

const MenuCard = ({icon: Icon, title, onClick}) => {
  return (
    <View style={styles.cardParent}>
      <TouchableOpacity style={styles.card} onPress={onClick}>
        <Icon width={50} height={50} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  cardParent: {
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    marginRight: 20,
  },
  card: {
    backgroundColor: COLORS.PRIMARYWHITE,
    width: 69,
    height: 69,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.BLACK,
    alignSelf: 'center',
    fontFamily: 'Poppins',
  },
});
