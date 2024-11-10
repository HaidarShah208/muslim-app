import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 
import Quran from '../../../assets/images/quran.png'
import QuranIcon from '../../../assets/images/quranIcon.png'
import { COLORS } from '../../../constants/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';
const QuranWelcomeScreen = ({navigation}) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    const checkScreen = async () => {
      const hasSeenScreen = await AsyncStorage.getItem('hasSeenScreen');
      if (hasSeenScreen) {
        setIsFirstTime(false);
        navigation.replace('Quran');
      }
    };

    checkScreen();
  }, []);

  const handleProceed = async () => {
    await AsyncStorage.setItem('hasSeenScreen', 'true');
    navigation.replace('trackQuran');
  };

  if (!isFirstTime) {
    return null;
  }
  
  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <Icon name="arrowleft" size={24} color="#007E5A" />
        <TouchableOpacity style={styles.skipButton} onPress={()=>{
          navigation.navigate('Quran')
        }}>
          <Text style={styles.skipText}>SKIP</Text>
          <Icon name="arrowright" size={16} color="#007E5A" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>

        <Image
          source={QuranIcon} 
          style={{
            position: 'absolute',
            top: 0,
            left: 'auto',
            width: 80,
            height: 80,
            alignSelf: 'center',
            marginHorizontal: 'auto',
            resizeMode: 'cover',
            marginTop: 20
          }}

        />
        <Image
          source={Quran}
          style={{
            position: 'absolute',
            bottom: 0,

            width: 200,
            height: 300,
            
            overflow: 'hidden',
         
            resizeMode: 'cover',
           
          }}
          resizeMode="cover"
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore the Quran</Text>
        <Text style={styles.description}>
          Unlock profound wisdom, explore divine guidance for every stage of life, cultivate a deeper connection with your faith, and enhance your spiritual journey through thoughtful reflection and understanding of each verse.
        </Text>
        <Text style={styles.subText}>Let’s Setup your Quran Features</Text>
      </View>

      <TouchableOpacity style={styles.getStartedButton} onPress={handleProceed}>
        <Text style={styles.getStartedText}>Lets get started</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    color: '#007E5A',
    fontSize: 16,
    marginRight: 5,
  },
  imageContainer: {
   
    height: 350,
   
    position: 'relative',
    backgroundColor: COLORS.PRIMARYGREEN,
    borderTopEndRadius: 200,
    borderTopStartRadius: 200,
    overflow: 'hidden',
    paddingHorizontal: 20,
    marginTop: 20,

  },
  quranImage: {
    
    height: 400, 
    alignSelf: 'center',
    resizeMode: 'contain',
    overflow: 'hidden',

  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'justify',
  },
  description: {
    fontSize: 14,
    color: '#000000B2',
    textAlign: 'justify',
    marginHorizontal: 20,
    lineHeight: 20,
  },
  subText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginTop: 10,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor:COLORS.PRIMARYGREEN,
    
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    marginBottom: 20,	
    padding: 5,
    paddingVertical: 12  
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign :'center'
  },
});

export default QuranWelcomeScreen;
