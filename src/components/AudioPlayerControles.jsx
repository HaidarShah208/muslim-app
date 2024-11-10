import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AudioPlayerControles = () => {
  const playbackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async playBack => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playBack === State.Paused || playBack === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <Pressable style={styles.controlButton} onPress={skipToPrevious}>
          <Icon name="skip-previous" size={50} color="#000" />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={() => {
            togglePlayback(playbackState);
          }}>
          <Icon
            name={
              playbackState === TrackPlayer.STATE_PLAYING
                ? 'pause'
                : 'play-arrow'
            }
            size={50}
            color="#000"
          />
        </Pressable>
        <Pressable style={styles.controlButton} onPress={skipToNext}>
          <Icon name="skip-next" size={50} color="#000" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default AudioPlayerControles;
