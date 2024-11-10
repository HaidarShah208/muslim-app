import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MainNavigator from '../../components/MainNavigator';

const DisciplineBooksScreen = ({ route, navigation }) => {
    const { discipline } = route.params;
    const books = useSelector((state) => state.pdfBooks.books);
    const disciplineBooks = books.filter((book) => book.collection === discipline);
    if (books.length === 0) {
        return <Text>No books found for this discipline.</Text>;
    }
   
    return (
        <ScrollView style={styles.container}>
            <MainNavigator heading={discipline} />
            
            {disciplineBooks.map((pdf) => ( 
          <TouchableOpacity
          style={styles.bookCard}
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

export default DisciplineBooksScreen;
