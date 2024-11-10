import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Pagination } from 'react-native-reanimated-carousel';

const SwiperCard = () => {
  const width = Dimensions.get('window').width;

  // Array of local images
  const images = [
    require('../assets/images/ss1.png'),
    require('../assets/images/ss2.png'),
    require('../assets/images/ss3.png'), 
  ];

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={350}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
          </View>
        )}
        
        // Adding pagination
        pagination={({ index }) => (
          <Pagination
            index={index}
            length={images.length}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            activeDotStyle={styles.activeDotStyle}
          />
        )}
      />
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10, // Adjust this value to control the distance from the bottom
    alignSelf: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: 'red',
  },
});

export default SwiperCard;
