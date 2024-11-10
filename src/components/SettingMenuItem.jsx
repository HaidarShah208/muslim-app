import react from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../constants/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MenuItem = ({name, icon, onPress, selectedOption}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.circle}>
        <Icon name={icon} size={24} color={COLORS.PRIMARYWHITE} />
      </View>
      <Text style={styles.menuText}>{name}</Text>
    </View>
    {selectedOption && (
      <Text style={styles.optionValueSelected}>{selectedOption}</Text>
    )}
  </TouchableOpacity>
);

export default MenuItem;
const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  circle: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: '#239371',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  optionValueSelected: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.PRIMARYGREEN,
  },
});
