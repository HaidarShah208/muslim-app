import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import MainNavigator from '../../components/MainNavigator';

const ImageGridScreen = ({ route, navigation }) => {
  const { discipline } = route.params;
  const { Images } = useSelector((state) => state.gallery);
  
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const disciplineImages = Images.filter((image) => image.collection === discipline);

  const imageSources = disciplineImages.map((image) => ({
    uri: image.featuredImage || 'fallback-image-url'
  }));

  const handleImagePress = (index) => {
    setSelectedIndex(index);
    setIsVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <MainNavigator heading={discipline} />

      {/* Horizontal Scroll View for Discipline Images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {disciplineImages.map((image, index) => (
          <View key={index} style={styles.horizontalImageContainer}>
            <TouchableOpacity onPress={() => handleImagePress(index)}>
              <Image
                source={{ uri: image.featuredImage || 'fallback-image-url' }}
                style={styles.horizontalImage}
              />
            </TouchableOpacity>
            <Text style={styles.imageTitle}>{image.title || 'Untitled'}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Grid Layout */}
      <View style={styles.imageGrid}>
        {disciplineImages.map((image, index) => {
          if (index % 3 === 0) {
            
            return (
              <View key={index} style={styles.fullWidthContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ImageDetail', { image: image, imageUrl: image.featuredImage })}
                >
                  <Image
                    source={{ uri: image.featuredImage || 'fallback-image-url' }}
                    style={styles.fullWidthImage}
                  />
                </TouchableOpacity>
              </View>
            );
          } else {
            
            return (
              <View key={index} style={styles.halfWidthContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ImageDetail', { image: image, imageUrl: image.featuredImage })}
                >
                  <Image
                    source={{ uri: image.featuredImage || 'fallback-image-url' }}
                    style={styles.halfWidthImage}
                  />
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </View>

      {/* Image Viewer */}
      <ImageViewing
        images={imageSources}
        imageIndex={selectedIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalScroll: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  horizontalImageContainer: {
    marginRight: 10,
    alignItems: 'center', 
    resizeMode: 'cover',

  },
  horizontalImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 35,
    marginTop : 20,

  },
  fullWidthContainer: {
    width: '100%',
    marginBottom: 10,
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  halfWidthContainer: {
    width: '49%',
    marginBottom: 10,
   
  },
  halfWidthImage: {
    width: '100%',
    height: 98,
    borderRadius: 8,
  },
});

export default ImageGridScreen;
