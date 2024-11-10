import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksByDiscipline } from '../../store/slices/pdfCollection'; // Adjust the path as needed
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';

const BooksByCategoryScreen = ({ navigation }) => {
  const disciplines = ['Hadith Masterpieces', 'guiding lights', 'Classics Literature', 'moral lessons']; // Array of disciplines
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.pdfBooks);

  useEffect(() => {
    if (disciplines && status === 'idle') {
      disciplines.forEach((discipline) => {
        dispatch(fetchBooksByDiscipline(discipline));
      });
    }
  }, [status, dispatch, disciplines]);

  if (status === 'failed') {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <MainNavigator heading="Collection" />
      {disciplines.map((discipline) => {
        const disciplineBooks = books.filter((book) => book.collection === discipline);

        return (
          <TouchableOpacity
            key={discipline}
            style={styles.bookCard}
            onPress={() => navigation.navigate('DisciplineBooks', { discipline })}
          >
            <View style={styles.cardContent}>
              <View style={styles.bookImageContainer}>
                {disciplineBooks.map((pdf) => (
                  <View key={pdf.id}>
                    <Image
                      source={{ uri: pdf.featuredImage || 'fallback-image-url' }}
                      style={styles.bookImage}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.booksList}>
                <Text style={styles.disciplineTitle}>{discipline}</Text>
                <View style={styles.disciplinesContainer}>
                {disciplineBooks.map((pdf) => (
                    pdf.discipline ? (
                      <Text key={pdf.id} style={styles.disciplineTag}>{pdf.discipline}</Text>
                    ) : null
                  ))}
                </View>
                <View style={styles.totalBooksText}>
                  <Text style={styles.bookTitle}>{disciplineBooks.length}</Text>
                  <Text style={styles.bookDescription}>Books</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {books.length === 0 && <Text>No books found for any discipline.</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  bookCard: {
    backgroundColor: '#F2F2F5',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'column',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disciplineTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  disciplinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  disciplineTag: {
    backgroundColor: 'white',
    paddingHorizontal: 7,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
    color: COLORS.PRIMARYGREEN,
    fontWeight: '400',
    paddingVertical: 2,
  },
  totalBooksText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bookImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '40%',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  bookImage: {
    width: 50,
    height: 90,
    resizeMode: 'cover',
    // borderRadius: 8,
    // marginRight: 8,
    // marginBottom: 8,
  },
  booksList: {
    flex: 1,
    marginLeft: 16,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  bookDescription: {
    fontSize: 14,
    color: '#000000',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default BooksByCategoryScreen;
