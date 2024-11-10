import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksByCategory } from '../../store/slices/bookCollectionSlice'; 

const BooksListScreen = ({ route }) => {
  const { category } = route.params;
  const dispatch = useDispatch();
  const { collections, loading } = useSelector((state) => state.collections);

  useEffect(() => {
    dispatch(fetchBooksByCategory([category]));
  }, [dispatch, category]);

  const books = collections[category] || [];

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${category.charAt(0).toUpperCase() + category.slice(1)} Books`}</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <Image
              source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
              style={styles.bookImage}
            />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
              <Text style={styles.bookAuthors}>{item.volumeInfo.authors?.join(', ')}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  bookAuthors: {
    fontSize: 14,
    color: '#555',
  },
});

export default BooksListScreen;
