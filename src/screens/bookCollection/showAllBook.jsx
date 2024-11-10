import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchPDFBooks } from '../../store/slices/pdfSlice'; 
import MainNavigator from '../../components/MainNavigator';

const BooksListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { pdfs, status, error } = useSelector((state) => state.pdf); 

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPDFBooks());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <MainNavigator heading='All Books' />
      <ScrollView showsVerticalScrollIndicator={false}> 
        {pdfs.map((pdf) => ( 
          <TouchableOpacity
          
            key={pdf.id} 
            onPress={() => navigation.navigate('PdfDetail', { pdf: pdf })} 
          >
            <View style={styles.bookCard}>
              <Image
                source={{ uri: pdf.featuredImage }}
                style={styles.bookImage}
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{pdf.title}</Text>
              
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    width: 80,
    height: 85,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
    color:"black"
  },
  bookAuthors: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BooksListScreen;
