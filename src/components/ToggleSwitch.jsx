import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../constants/COLORS';

const ToggleSwitch = ({label1, label2, enabled, onToggle}) => (
  <View style={styles.audioSettingOption}>
    <View style={styles.audioLabelContainer}>
      <Text style={styles.audioLabel}>{label1}</Text>
      <Text style={styles.audioLabel}>{label2}</Text>
    </View>
    <View style={styles.switch}>
      <TouchableOpacity
        style={[styles.switchOption, enabled && styles.switchOptionEnabled]}
        onPress={() => !enabled && onToggle()}>
        <Text style={[styles.switchText, enabled && styles.switchTextEnabled]}>
          Enabled
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.switchOption, !enabled && styles.switchOptionEnabled]}
        onPress={() => enabled && onToggle()}>
        <Text style={[styles.switchText, !enabled && styles.switchTextEnabled]}>
          Disabled
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ToggleSwitch;

const styles = StyleSheet.create({
  audioSettingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  audioLabelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  audioLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#239371',
    borderRadius: 8,
    overflow: 'hidden',
    maxWidth: 200,
  },
  switchOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  switchOptionEnabled: {
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  switchTextEnabled: {
    color: COLORS.PRIMARYWHITE,
  },
});
