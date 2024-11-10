import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import quranMain from '../assets/images/quranMain.jpeg';
import mosque1 from '../assets/images/mosqueOne.jpeg';
import quranThree from '../assets/images/quranThree.jpeg';
import childFour from '../assets/images/childFour.jpeg';
import mosqueTwo from '../assets/images/mosqueTwo.jpeg';
import FolowLine from '../assets/icons/followLine.svg';

export default function ImageCollection() {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <FolowLine width={10} height={96} />
      </View>
      <View style={styles.eventMain}>
        <View style={styles.eventFirst}>
          <Image
            source={quranMain}
            style={{
              width: 170,
              height: 120,
            }}
          />
        </View>
        <View style={styles.imgMain}>
          <View style={styles.imgContainer}>
            <Image source={mosque1} style={styles.firstImg} />
            <Image source={quranThree} style={styles.images} />
            <Image source={mosqueTwo} style={styles.endImg} />
            <Image source={childFour} style={styles.images} />
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventFirst: {
    width: 160,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
    alignItems: 'center',
  },
  eventImages: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'white',
  },
  images: {
    borderRadius:5,
    width: 50,
    height: 50,
    marginStart: 15,
  },
  firstImg: {
    width: 50,
    height: 50,
    borderRadius:5
  },
  endImg: {
    borderRadius:5,
    width: 50,
    height: 50,
    marginTop: 10,
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgMain: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
    width: 140,
    height: 120,
  },
});
