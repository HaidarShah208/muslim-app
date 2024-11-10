import React, {useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, Alert, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  initializeFavorites,
  removeFavorite,
} from '../../../store/slices/favouriteMosquesSlice';
import {COLORS} from '../../../constants/COLORS';
import MainNavigator from '../../../components/MainNavigator';
import BookmarkContentCard from '../../../components/BookmarkContentCard';

const FavoritesMosqueList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    // Initialize favorites from AsyncStorage
    dispatch(initializeFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = mosque => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this mosque from favorites?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          onPress: () => dispatch(removeFavorite(mosque)),
        },
      ],
    );
  };

  const openMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening map:', err));
  };

  const renderFavoriteMosque = ({item}) => (
    <BookmarkContentCard
      onPress={() => openMap(item.lat, item.lon)}
      title={item.tags.name}
      description={`Place:${item.tags['addr:city']}`}
      onDeleted={() => handleRemoveFavorite(item)}
    />
  );

  return (
    <View style={styles.container}>
      <MainNavigator heading="Favorites Mosque" />
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavoriteMosque}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>No favorite mosques yet.</Text>
      )}
    </View>
  );
};

export default FavoritesMosqueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  list: {
    paddingBottom: 20,
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.DARKGREY,
    marginTop: 50,
  },
});
