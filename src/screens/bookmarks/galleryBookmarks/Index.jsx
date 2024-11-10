import React, {useEffect} from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  initializeFavorites,
  removeFavorite,
} from '../../../store/slices/favoriteImages';
import MainNavigator from '../../../components/MainNavigator';
import GalleryBookmark from '../../../components/bookMarkComponent'; // Import the component

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favoritesImages.favorites);
  const status = useSelector(state => state.favorites.status);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        await dispatch(initializeFavorites());
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    fetchFavorites();
  }, [dispatch, status]);

  const handleRemoveFavorite = image => {
    dispatch(removeFavorite(image));
    ToastAndroid.show('Favorite removed!', ToastAndroid.SHORT);
  };

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <MainNavigator heading="Favorite Images" />
      {favorites.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {favorites.map(image => (
            <GalleryBookmark
              onPress={() =>
                navigation.navigate('ImageDetail', {
                  image,
                  isFavorite: true,
                  imageUrl: image.featuredImage,
                })
              }
              key={image.id}
              imageUrl={image.featuredImage} // Pass image URL
              title={image.title || 'No Title'} // Pass title
              // subtitle={`${image.fileSize || "Unknown Size"}`}  // Pass subtitle (file size)
              description={image.description} // Pass description
              onRemove={() => handleRemoveFavorite(image)} // Handle remove
            />
          ))}
        </ScrollView>
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 18,
            color: '#888',
          }}>
          No favorites added yet.
        </Text>
      )}
    </View>
  );
};

export default Index;
