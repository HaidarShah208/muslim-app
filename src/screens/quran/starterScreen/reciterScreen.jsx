
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { usePlaybackState, Capability, State } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Wave from '../../../assets/images/wave.svg';
import NavButton from '../../../components/navButton';
import { COLORS } from '../../../constants/COLORS';

const ReciterScreen = ({navigation}) => {
  const [speed, setSpeed] = useState(1.0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [playTimeout, setPlayTimeout] = useState(null);
  const playbackState = usePlaybackState();

  const reciters = [
    {
      name: 'Hani ar-Rifai',
      location: 'Jeddah, Saudi Arabia',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5g6j9pxmmA0tyhOzgUmK_ofBVX6G4R7e1ow&s',
      audio:
        'https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee//022.mp3',
    },
    {
      name: 'Saud ash-Shuraym',
      location: 'Riyadh, Saudi Arabia',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Z18guFwsrxedDIUNQrZgrOHlxaC8hfZ-GA&s',
      audio:
        'https://download.quranicaudio.com/quran/abdullaah_3awwaad_al-juhaynee//044.mp3',
    },
    {
      name: 'Ahmed Alshafey',
      location: ' Cairo - Egypt',
      image:
        'https://i.pinimg.com/564x/44/b3/35/44b33576f23403f8132e9d935753468f.jpg',
      audio:
        'https://ia904700.us.archive.org/5/items/ahmed_alshafey_202211/001.mp3',
    },
    {
      name: 'Abdul Basit',

      location: 'Egypt',
      image:
        'https://i.pinimg.com/564x/c2/c5/57/c2c5579d6becfccbb4e98f6bcf008127.jpg',
      audio:
        'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/001.mp3',
    },
    {
      name: 'Ali Al Hudhaifi',
      location: 'Al Awamer, Saudi Arabia',
      image:
        'https://i.pinimg.com/originals/d4/3a/fe/d43afef3ae04b26f2deea396aa22a982.jpg',
      audio:
        'https://server9.mp3quran.net/hthfi/001.mp3',
    },
    // ... (other reciters)
  ];

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      const storedSpeed = await AsyncStorage.getItem('@audio_speed');
      const storedReciter = await AsyncStorage.getItem('@selected_reciter');
      if (storedSpeed !== null) setSpeed(parseFloat(storedSpeed));
      if (storedReciter !== null) setSelectedReciter(storedReciter);
    };

    setupPlayer();

    return () => {
      TrackPlayer.destroy();
      if (playTimeout) clearTimeout(playTimeout); // Clear timeout on component unmount
    };
  }, []);

  const playPauseSound = async (reciter, index) => {
    if (playingIndex === index && playbackState === State.Playing) {
      await TrackPlayer.pause();
      if (playTimeout) clearTimeout(playTimeout); // Clear the timeout if paused
    } else {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: reciter.name,
        url: reciter.audio,
        title: reciter.name,
        artist: reciter.location,
        artwork: reciter.image,
      });
      await TrackPlayer.setRate(speed);
      await TrackPlayer.play();
      setPlayingIndex(index);
      setSelectedReciter(reciter.name);
      saveSettings(reciter.name, speed);

      // Set a timeout to stop playing after 10 seconds
      const timeoutId = setTimeout(async () => {
        await TrackPlayer.pause();
      }, 10000); // 10 seconds

      setPlayTimeout(timeoutId);
    }
  };

  const adjustSpeed = async (value) => {
    setSpeed(value);
    await TrackPlayer.setRate(value);
    saveSettings(selectedReciter, value);
  };

  const saveSettings = async (reciterName, speedValue) => {
    try {
      await AsyncStorage.setItem('@audio_speed', speedValue.toString());
      await AsyncStorage.setItem('@selected_reciter', reciterName);
    } catch (error) {
      console.error('Failed to save settings to AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Choose a Voice Speed Of <Text style={styles.highlight}>Reciter</Text>
      </Text>
      {selectedReciter && (
        <Text style={styles.selectedReciterText}>
          You selected: {selectedReciter} at speed {speed.toFixed(1)}x
        </Text>
      )}
      <Slider
        style={styles.slider}
        minimumValue={0.5}
        maximumValue={2.0}
        value={speed}
        onValueChange={adjustSpeed}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.lightGrey}
        thumbTintColor={COLORS.primary}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={reciters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.reciterContainer}>
            <Image source={{ uri: item.image }} style={styles.reciterImage} />
            <View style={styles.reciterInfo}>
              <Text style={styles.reciterName}>{item.name}</Text>
              <Text style={styles.reciterLocation}>{item.location}</Text>
            </View>
            <TouchableOpacity onPress={() => playPauseSound(item, index)}>
              <Wave />
            </TouchableOpacity>
          </View>
        )}
      />
      <NavButton 
      navigationNext={() => {
        navigation.navigate('Translation');
       }}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    marginBottom: 20,

  },
  highlight: {
    color: COLORS.PRIMARYGREEN,
    fontSize: 25,
    fontWeight: 'bold',
  },

  selectedReciterText: {
    fontSize: 16,
    color: COLORS.darkGrey,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  reciterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  reciterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reciterInfo: {
    flex: 1,
    marginLeft: 10,
  },
  reciterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  reciterLocation: {
    fontSize: 14,
     color: 'black'
  },
});

export default ReciterScreen;
