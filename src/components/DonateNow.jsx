import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';
import FolowLine from '../assets/icons/followLine.svg';
import {useNavigation} from '@react-navigation/native';

export default function DonateNow() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <FolowLine width={15} height={76} />
      </View>
      <View style={styles.eventMain}>
        <View style={styles.eventFirst}>
          <Text style={styles.eventHeading}>Help us Keep</Text>
          <Text style={styles.eventHeading}>Its Free Forever!</Text>
        </View>
        <View style={styles.donateMain}>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.DARKGREEN,
                paddingVertical: 5,
                fontWeight: '600',
              }}>
              Donate Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  lineContainer: {
    justifyContent: 'center',
    marginRight: 3,
  },
  eventMain: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventFirst: {
    width: 180,
    height: 90,
    borderRadius: 20,
    overflow: 'hidden',
    paddingStart: 10,
    paddingTop: 10,
    marginRight: 10,
    backgroundColor: COLORS.BLUEGREEN,
  },
  eventImages: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'white',
  },
  eventText: {color: 'white', alignSelf: 'flex-end'},
  eventHeading: {color: 'white', fontSize: 20, marginVertical: 5},
  donateMain: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
    width: 110,
    alignItems: 'center',
    height: 60,
  },
});
