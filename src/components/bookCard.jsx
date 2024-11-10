// src/components/BookCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: volumeInfo?.imageLinks?.thumbnail }}
        style={styles.image}
      />
      <Text style={styles.title}>{volumeInfo?.title}</Text>
      <Text style={styles.author}>{volumeInfo?.authors?.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
});

export default BookCard;
