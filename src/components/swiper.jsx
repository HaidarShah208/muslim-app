import React from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {COLORS} from '../constants/COLORS';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'contain',
  },
});

const SwiperComponent = () => {
  const images = [
    require('../assets/images/ss1.png'),
    require('../assets/images/ss2.png'),
    require('../assets/images/ss3.png'),
    require('../assets/images/ss4.png'),
    require('../assets/images/ss5.png'),
    require('../assets/images/ss6.png'),
    require('../assets/images/ss7.png'),
    require('../assets/images/ss8.png'),
    require('../assets/images/ss9.png'),
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        // paddingHorizontal: 20,
        height: 300,
        marginBottom: 10,
      }}>
      <Swiper
        style={{}}
        autoplay={true}
        loop={true}
        paginationStyle={{
          bottom: 0,
        }}
        dotStyle={{
          backgroundColor: COLORS.PRIMARYGREEN,
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 8,
          marginTop: 3,
        }}
        activeDotStyle={{
          backgroundColor: COLORS.PRIMARYGREEN,
          width: 52,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 8,
          marginTop: 3,
        }}
        automaticallyAdjustContentInsets={true}
        showsPagination={true}>
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

AppRegistry.registerComponent('myproject', () => SwiperComponent);

export default SwiperComponent;
