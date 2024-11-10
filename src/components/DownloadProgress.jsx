import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useDownload} from '../context/DownloadContext';
import {COLORS} from '../constants/COLORS';
import Slider from '@react-native-community/slider';

const DownloadProgress = () => {
  const {downloadProgress, isDownloading} = useDownload();
  if (!isDownloading) return null;
  return (
    <View style={styles.container}>
      <Slider
        style={{width: '100%'}}
        disabled
        minimumValue={0}
        maximumValue={100}
        value={downloadProgress}
        minimumTrackTintColor={COLORS.PRIMARYWHITE}
        maximumTrackTintColor={COLORS.PRIMARYWHITE}
        thumbTintColor={COLORS.PRIMARYWHITE}
      />
      <Text style={styles.text}>{`Downloading: ${downloadProgress}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: COLORS.PRIMARYGREEN,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default DownloadProgress;
