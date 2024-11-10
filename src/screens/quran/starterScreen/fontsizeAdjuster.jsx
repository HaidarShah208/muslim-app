import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants/COLORS';
import NavButton from '../../../components/navButton';

const FontSizeAdjuster = ({ navigation }) => {
  const [fontSize, setFontSize] = useState(24); // Unified state for both text sizes
  const [selectedFontFamily, setSelectedFontFamily] = useState('Traditional Arabic'); // Default font family

  useEffect(() => {
    // Retrieve the selected font family and sizes from AsyncStorage on mount
    const loadSettings = async () => {
      try {
        const storedFontFamily = await AsyncStorage.getItem('selectedFont');
        const storedFontSize = await AsyncStorage.getItem('fontSize');
        
        if (storedFontFamily) setSelectedFontFamily(storedFontFamily);
        if (storedFontSize) setFontSize(Number(storedFontSize));
      } catch (error) {
        console.error('Failed to load font settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleFontSizeChange = async (size) => {
    try {
      setFontSize(size);
      await AsyncStorage.setItem('fontSize', size.toString());
    } catch (error) {
      console.error('Error saving font size to AsyncStorage', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>FONT</Text>
      <Text style={[styles.heading, { marginTop: 0, marginBottom: 20, fontSize: 28, fontWeight: '700', color: '#000' }]}>
        Size
      </Text>

      {/* Quranic Script and Translation Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Adjust Font Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={40}
          value={fontSize}
          onValueChange={(value) => handleFontSizeChange(value)}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor={COLORS.PRIMARYGREEN}
          thumbTouchSize={{ width: 40, height: 40 }}
        />
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ alignItems: 'center' }}
          style={styles.horizontalScroll}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={[styles.quranicText, { fontSize, fontFamily: selectedFontFamily }]} numberOfLines={1}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </Text>
        </ScrollView>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ alignItems: 'center' }}
          style={styles.horizontalScroll}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={[styles.translationText, { fontSize }]} numberOfLines={1}>
            IN THE NAME OF GOD, THE MOST GRACIOUS, THE MOST MERCIFUL
          </Text>
        </ScrollView>
        <NavButton navigationNext={() => navigation.navigate('Reciter')} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.PRIMARYGREEN,
    marginTop: 25,
  },
  section: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  slider: {
    width: '100%',
    height: 60, // Increased slider height
  },
  horizontalScroll: {
    marginTop: 10,
    marginBottom:50
  },
  quranicText: {
    fontFamily: 'Traditional Arabic', // Default font, will be overridden by selectedFontFamily
    color: '#000',
  },
  translationText: {
    fontFamily: 'serif',
    color: '#000',
    marginTop:20

  },
});

export default FontSizeAdjuster;
