import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainNavigator from '../../components/MainNavigator';
import HabitCard from '../../components/HabitCard';
import Logo from '../../assets/images/Group2.svg'; // Assuming you switched to SVGs
import Black from '../../assets/images/Black.png';
import Black1 from '../../assets/images/Black1.png';
import Black2 from '../../assets/images/Black2.png';
import Black3 from '../../assets/images/Black3.png';
import Black4 from '../../assets/images/Black4.png';
import Black5 from '../../assets/images/Black5.png';
import Black6 from '../../assets/images/Black6.png';
import Black7 from '../../assets/images/Black7.png';
import {COLORS} from '../../constants/COLORS';

const HabitScreen = ({navigation}) => {
  const cardData = [
    {
      image: Black,
      title: 'Build a Habit',
      description: 'Daily Quran and Hadith routines.',
    },
    {
      image: Black1,
      title: 'Real Reminders',
      description: 'Never miss a moment.',
    },
    {
      image: Black2,
      title: 'Gems of Wisdom',
      description: 'Daily Quran and Hadith insights.',
    },
    {
      image: Black3,
      title: 'Progress Tracking',
      description: 'Track your growth.',
    },
    {
      image: Black4,
      title: 'Ad-Free Experience',
      description: 'Faith without interruptions.',
    },
    {image: Black5, title: 'Challenges', description: 'Engage and grow.'},
    {
      image: Black6,
      title: 'Verses to Pages',
      description: 'Navigate with ease.',
    },
    {
      image: Black7,
      title: 'Daily Inspirations',
      description: 'Start with motivation.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Logo style={styles.logo} />
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: 18,
            marginLeft: 0,
          }}>
          mmaah Muslim App
        </Text>
      </View>

      {cardData.map((card, index) => (
        <HabitCard
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
        />
      ))}
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.nextButtonText}>Bismillah</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HabitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  nextButton: {
    borderRadius: 10,
    alignItems: 'space-between',
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    marginBottom: 20,
  },
  nextButtonText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});
