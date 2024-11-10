import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const SwiperCard = () => {
  const width = Dimensions.get('window').width;

  // Array of local images
  const images = [
    require('../assets/images/ss1.png'),
    require('../assets/images/ss1.png'),
    require('../assets/images/ss1.png'),
    // require('./assets/image4.jpg'),
  ];

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default SwiperCard;
