import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import mosqueCard from '../assets/images/mosqueCard.png';
import ummah from '../assets/images/Group2.png';
import {COLORS} from '../constants/COLORS';
import FolowLine from '../assets/icons/followLine.svg';

const OneUmmahs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <FolowLine width={10} height={176} />
      </View>
      <View style={styles.ummahContainer}>
        <Image
          source={mosqueCard}
          style={{
            width: 70,
            height: 'auto',
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <View>
            <View style={{marginStart: 50}}>
              <Text
                style={{
                  paddingEnd: 10,
                  marginStart: -20,
                  color: COLORS.DARKGREEN,
                  fontWeight: '700',
                  paddingVertical: 10,
                }}>
                ONE UMMAH
              </Text>
              <View>
                <Image
                  source={ummah}
                  style={{width: 40, height: 90, borderBottomLeftRadius: 20}}
                />
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontWeight: '700',
                fontSize: 9,
                textAlign: 'center',
                marginTop: 10,
                paddingStart: 13,
              }}>
              Muslim Social Media Platform
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 7,
                textAlign: 'center',

                paddingStart: 13,
              }}>
              For Muslims By Muslims
            </Text>
          </View>
          <View style={{paddingTop: 20}}>
            <View style={{paddingStart: 5, paddingBottom: 20}}>
              <Text style={{color: 'black'}}>Join the</Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '800',
                  fontSize: 15,
                  paddingVertical: 2,
                }}>
                {' '}
                Ummah
              </Text>
              <Text style={{color: 'black'}}>Today!</Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: COLORS.DARKGREEN,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                <TouchableOpacity
                  style={{color: 'black'}}
                  onPress={() => Linking.openURL('https://1ummaah.com/')}>
                  <Text style={{textAlign: 'center', color: COLORS.WHITE}}>
                    Join
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 5}}>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderColor: COLORS.DARKGREEN,
                  borderWidth: 1,
                }}>
                <Text style={{textAlign: 'center', color: COLORS.DARKGREEN}}>
                  Now
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OneUmmahs;
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
  ummahContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 24,
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARYWHITE,
  },
});
