import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/COLORS';

const AudioPlayer = ({ text }) => {
  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
  }, []);

  const handlePlayPause = () => {
    Tts.speak(text);
  };

  return (
    <View style={styles.audioContainer}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
        <TouchableOpacity style={{
        }}>
          <Icon name="backward" size={35} color={COLORS.PRIMARYGREEN} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: COLORS.PRIMARYGREEN,
          width: 50,
          height: 50,
          borderRadius: 20,

          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <Icon name="pause" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="forward" size={35} color={COLORS.PRIMARYGREEN} />
        </TouchableOpacity>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  audioContainer: {

    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  playButton: {
    backgroundColor: 'white',
    // padding: 15,
    // borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40

  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 12,
    marginTop: 20
  },
  progressBar: {
    width: '20%', // Update this value to match the progress percentage
    height: '100%',
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 2,
  },
});

export default AudioPlayer;
