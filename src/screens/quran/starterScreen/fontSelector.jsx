import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants/COLORS';
import NavButton from '../../../components/navButton';

const QuranFontSelector = ({ navigation }) => {
  const [openFont, setOpenFont] = useState(null);
  const [selectedFont, setSelectedFont] = useState(null); // State to track the selected font

  const fonts = [
    { name: 'Indo-Pak Script', fontFamily: 'me_quran' },
    { name: 'Hafs Script', fontFamily: 'KfgqpcHafsUthmanicScriptRegular-1jGEe' },
    { name: 'Kufi Script', fontFamily: 'KufiFont' },
    { name: 'Naskh Script', fontFamily: 'NaskhFont' },
    { name: 'Scheherazade Script', fontFamily: 'AmiriQuran' },
    { name: 'Uthmani Script', fontFamily: 'UthmaniFont' },
  ];

  const handleFontSelection = (font) => {
    setOpenFont(openFont === font.name ? null : font.name);
  };

  const handleFontCheck = async (font) => {
    try {
      // Save the selected font to AsyncStorage
      await AsyncStorage.setItem('selectedFont', font.name);
      setSelectedFont(font.name);
      Alert.alert('Font Selected', `Your selected font is ${font.name}`);
    } catch (error) {
      console.error('Error saving font to AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose</Text>
      <Text style={styles.subTitle}>YOUR</Text>
      <Text style={styles.title}>Font</Text>
      {fonts.map((font, index) => (
        <View key={index}>
          <TouchableOpacity
            style={styles.fontOption}
            onPress={() => handleFontSelection(font)}
          >
            <Text style={styles.fontName}>{font.name}</Text>
            <Text style={styles.plusIcon}>{openFont === font.name ? '-' : '+'}</Text>
          </TouchableOpacity>
          {openFont === font.name && (
            <View style={styles.scriptContainer}>
              <Text style={[styles.scriptText, { fontFamily: font.fontFamily }]}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </Text>
              {/* Checkbox or Radio Button */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleFontCheck(font)}
              >
                <Text style={styles.checkbox}>
                  {selectedFont === font.name ? '☑️' : '⬜️'} {/* Simple checkbox */}
                </Text>
                <Text style={styles.fontName}>Select this font</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      <NavButton navigationNext={() => navigation.navigate('fontAdjust')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARYGREEN,
    textAlign: 'center',
  },
  fontOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 5,
  },
  fontName: {
    fontSize: 18,
    color: 'black',
  },
  plusIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  scriptContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  scriptText: {
    fontSize: 26,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default QuranFontSelector;
