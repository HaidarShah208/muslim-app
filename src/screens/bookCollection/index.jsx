import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { COLORS } from '../../constants/COLORS';
import { fetchPdfs } from '../../store/slices/pdfSlice';
import { PacmanIndicator } from 'react-native-indicators';
import BooksByCategoryScreen from './CollectionScreen';
import Fav from '../../assets/icons/fav.svg';
import Collection from '../../assets/icons/collection.svg';
import { loadFavorites, removeFavorite, initializeFavorites } from '../../store/slices/favoriteBookSlice';

const BooksScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { pdfs, status, error } = useSelector((state) => state.pdf);
  const favorites = useSelector((state) => state.favoriteBook.favorites);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPdfs());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        await dispatch(initializeFavorites());
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cat')}
        >
          <Collection />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Books</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('readCollection')}
        >
          <Icon name='chart-simple' size={30} color={COLORS.PRIMARYGREEN}  />

        </TouchableOpacity>
        
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={{
          width:'50%'
        }}>
          <Text style={styles.title}>Reading</Text>
          <Text style={[styles.title, styles.titleHighlight]}>Reimagine.</Text>
        </View>
        <View style={{
          width:'45%'
        }}>
          <Image source={require('../../assets/images/layer.png')} style={{ width: 160, height: 160 }} />
        </View>
      </View>

      {status === 'loading' ? (
        <PacmanIndicator color={COLORS.PRIMARYGREEN} />
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Favorites Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorites</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FavBook')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {favorites.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookScroll}>
              {favorites.slice(0, 4).map((pdf) => (
                <TouchableOpacity
                  key={pdf.id}
                  onPress={() => navigation.navigate('PdfDetail', { pdf })}
                  style={styles.bookContainer}
                >
                  <Image
                    source={{ uri: pdf.featuredImage || 'fallback-image-url' }}
                    style={styles.bookImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noFavoritesText}>No favorite books yet.</Text>
          )}

          {/* Curated Pick Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated Pick</Text>
            <TouchableOpacity onPress={() => navigation.navigate('showAll')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookScroll}>
            {pdfs.slice(4, 12).map((pdf) => (
              <TouchableOpacity
                key={pdf.id}
                onPress={() => navigation.navigate('PdfDetail', { pdf })}
                style={styles.bookContainer}
              >
                <Image
                  source={{ uri: pdf.featuredImage || 'fallback-image-url' }}
                  style={styles.bookImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.PRIMARYGREEN,
  },
  titleContainer: {
    
    paddingVertical: 8,
    marginTop: 20,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'

  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: 'black',
    lineHeight: 50,
  },
  titleHighlight: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.PRIMARYGREEN,
    lineHeight: 50,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  viewAll: {
    fontSize: 14,
    color: COLORS.PRIMARYGREEN,
  },
  bookScroll: {
    marginBottom: 16,
    paddingBottom:15
  },
  bookContainer: {
    marginRight: 16,
    alignItems: 'center',
  },
  bookImage: {
    width: 126,
    height: 170,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  bookTitle: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noFavoritesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default BooksScreen;
