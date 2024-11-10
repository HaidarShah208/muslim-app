import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useQibla from './useQibla';
import {COLORS} from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';

const QiblaCompass = ({navigation}) => {
  const {
    compassHeading,
    distanceToKaaba,
    location,
    image,
    difference,
    // setImage,
    changeImage,
    qiblaDirection,
    isAligned,
  } = useQibla();

  const getCardinalDirection = () => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(compassHeading / 45) % 8;
    return directions[index];
  };

  const radius = 140; // Adjusted radius
  const qiblaArrowRotation = qiblaDirection;
  const arrowX = radius * Math.sin((qiblaArrowRotation * Math.PI) / 180);
  const arrowY = -radius * Math.cos((qiblaArrowRotation * Math.PI) / 180);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MainNavigator heading={'Qibla'} />
      <Text style={styles.qiblaAngleText}>
        {`Qibla Angle: ${qiblaDirection.toFixed(2)}°`}
      </Text>
      <View style={styles.container}>
        <View style={styles.compassContainer}>
          <ImageBackground
            source={image.uri}
            style={{
              width: 250,
              height: 250,
              transform: [{rotate: `${360 - compassHeading}deg`}],
              justifyContent: 'center', // Center items vertically
              alignItems: 'center', // Center items horizontally
              borderRadius: 125,
            }}>
            <View
              style={{
                transform: [
                  {translateX: arrowX},
                  {translateY: arrowY},
                  {rotate: `${qiblaArrowRotation}deg`},
                ],
              }}>
              {image && <image.pointer width={35} height={35} />}
            </View>
          </ImageBackground>
          {image?.kaaba && (
            <Image
              source={require('../../assets/images/kaaba.png')}
              style={styles.kaabaImage}
            />
          )}
        </View>
        {image?.road && (
          <Image source={require('../../assets/images/road.png')} />
        )}
      </View>
      <View style={styles.bottomIcons}>
        <TouchableOpacity onPress={() => changeImage(1)}>
          <Image
            source={require('../../assets/images/MosqueCompass.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeImage(2)}>
          <Image
            source={require('../../assets/images/compass2preview.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeImage(3)}>
          <Image
            source={require('../../assets/images/Compass3.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeImage(4)}>
          <Image
            source={require('../../assets/images/compass4.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeImage(5)}>
          <Image
            source={require('../../assets/images/compass5.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QiblaCompass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '900',
    marginLeft: '-10%',
  },
  qiblaAngleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  compassContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 135,
  },
  qiblaArrow: {},
  kaabaImage: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
    position: 'absolute',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bottomIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    backgroundColor: COLORS.LIGHTGRAY,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'contain',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  distanceText: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
});
