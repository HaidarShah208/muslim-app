import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const SupportLinks = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.policiesBox}>
      <TouchableOpacity
        style={styles.policiesOption}
        onPress={() => {
          navigation.navigate('helpCenter');
        }}>
        <Text style={styles.policiesOptionText}>Help & Support</Text>
        <Icon name="keyboard-arrow-right" size={24} color={COLORS.BLACK} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.policiesOption}
        onPress={() => navigation.navigate('termAndPolices')}>
        <Text style={styles.policiesOptionText}>Terms and Policies</Text>
        <Icon name="keyboard-arrow-right" size={24} color={COLORS.BLACK} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.policiesOption}
        n
        onPress={() => navigation.navigate('reportProblem')}>
        <Text style={styles.policiesOptionText}>Report a problem</Text>
        <Icon name="keyboard-arrow-right" size={24} color={COLORS.BLACK} />
      </TouchableOpacity>
    </View>
  );
};

export default SupportLinks;

const styles = StyleSheet.create({
  policiesBox: {
    height: 105,
    borderRadius: 15,
    backgroundColor: COLORS.LIGHTGRAY,
    justifyContent: 'space-between',
    padding: 10,
  },
  policiesOption: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policiesOptionText: {
    color: COLORS.BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
});
