import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavButton from '../../../components/navButton';
import { COLORS } from '../../../constants/COLORS';

const TranslationScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSecondaryLanguage, setSelectedSecondaryLanguage] = useState('');

  const handleLanguageChange = async (language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      setSelectedLanguage(language);
      Alert.alert('Language Selection', `Your selected language is ${language}`);
    } catch (error) {
      console.error('Error saving language', error);
    }
  };

  const handleSecondaryLanguageChange = async (language) => {
    try {
      await AsyncStorage.setItem('selectedSecondaryLanguage', language);
      setSelectedSecondaryLanguage(language);
      Alert.alert('Language Selection', `Your secondary language is ${language}`);
    } catch (error) {
      console.error('Error saving secondary language', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a</Text>
      <Text style={styles.subtitle}>Translation</Text>
      <Text style={styles.description}>Breaking Language Barriers</Text>

      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/trans.png')} style={styles.image} />
        <View style={styles.dropdownContainer}>
          <Icon name="language" size={20} color="black" style={styles.dropdownIcon} />
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handleLanguageChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Urdu" value="Urdu" />
            <Picker.Item label="Hindi" value="Hindi" />
          </Picker>
        </View>
      </View>

      {/* Horizontal Language Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.languagesContainer}>
        {['Albanian', 'Bengali', 'Bosnian', 'Welsh','Scots'].map((language) => (
          <TouchableOpacity
            key={language}
            style={styles.languageButton}
            onPress={() => handleSecondaryLanguageChange(language)}
          >
            <Text style={styles.languageText}>{language}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <NavButton
        navigationNext={() => {
          navigation.navigate('Reminder');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.PRIMARYGREEN,
  },
  description: {
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
  },
  languagesContainer: {
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
  },
  languageButton: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARYGREEN,
    borderRadius: 10,
    height: 50,
    paddingVertical: 10,
    width: 100,
    marginHorizontal: 5,
  },
  languageText: {
    color: COLORS.PRIMARYGREEN,
    fontSize: 16,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default TranslationScreen;
