

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../constants/COLORS';
import RNFS from 'react-native-fs';
import { addFavorite, removeFavorite } from '../../store/slices/favoriteImages'; 
import Icons from 'react-native-vector-icons/AntDesign';

const ImageDetailScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const { imageUrl } = route.params;
  const favorites = useSelector((state) => state.favoritesImages.favorites); 
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false); 
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['12%', '50%'], []);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
 
  useEffect(() => {
    if (imageUrl) {
      Image.getSize(
        imageUrl,
        (width, height) => {
          setImageSize({ width, height });
        },
        (error) => {
          console.error('Error loading image size:', error);
        }
      );
    }

    const isFavorited = favorites.some((favImage) => favImage.id === image.id);
    setIsFavorite(isFavorited);
  }, [imageUrl, favorites, image.id]);

  const handleDownload = async () => {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/downloaded_image.jpg`;
      const response = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (response.statusCode === 200) {
        Alert.alert('Success', 'Image downloaded successfully');
        if (Platform.OS === 'android') {
          RNFS.scanFile(downloadDest);
        }
      } else {
        Alert.alert('Error', 'Failed to download image');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to download image: ${error.message}`);
    }
  };

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(image));
    } else {
      dispatch(addFavorite(image));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image.featuredImage || 'fallback-image-url' }}
        style={styles.image}
      >
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.heartIcon} onPress={handleFavorite}>
          <Icons
            name={isFavorite ? 'heart' : 'hearto'}
            size={30}
            color="white"
          />
        </TouchableOpacity>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <Text style={styles.overviewTitle}>Overview</Text>
          <View style={styles.bottomSheetContent}>
            <View>
              <View style={styles.propertyContainer}>
                <Text style={styles.propertyLabel}>Title</Text>
                <Text style={styles.propertyValue}>{image.description}</Text>
              </View>

              <View style={styles.propertyContainer}>
                <Text style={styles.propertyLabel}>Category</Text>
                <Text style={styles.propertyValue}>{image.category}</Text>
              </View>

              <View style={styles.propertyContainer}>
                <Text style={styles.propertyLabel}>Size</Text>
                <Text style={styles.propertyValue}>
                  {imageSize.width} x {imageSize.height} px
                </Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  navIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  heartIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
  },
  bottomSheetContent: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    marginHorizontal: 20,
  },
  overviewTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight: '700',
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: 140,
  },
  propertyContainer: {
    marginBottom: 10,
  },
  propertyLabel: {
    fontSize: 14,
    color: '#BABEC1',
    fontWeight: 'bold',
  },
  propertyValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ImageDetailScreen;
