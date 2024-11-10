import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from '../assets/images/verify.png'
import { COLORS } from '../constants/COLORS';

const HabitCard = ({ image, title, description }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image source={Icon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000001A',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#0000001A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 15,
    borderColor:COLORS.PRIMARYGREEN,
    borderWidth: 2,
    padding: 5,
    backgroundColor:'white'

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default HabitCard;
    