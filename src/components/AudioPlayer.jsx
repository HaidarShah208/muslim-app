import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  State,
  Event,
  useProgress,
} from 'react-native-track-player';
import {PlayerContext} from '../App';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReciterIcon from '../assets/icons/reciter.svg';
import SlidingUp from '../assets/icons/sliderUp.svg';
import QuranMain from '../assets/icons/quranMain.svg';
import ScrollDown from '../assets/icons/scrollDown.svg';
import MoreOptions from '../assets/icons/moreOptions.svg';
import Toggle from '../assets/icons/toggle.svg';
import Share from '../assets/icons/share.svg';
import {COLORS} from '../constants/COLORS';
import RNFS from 'react-native-fs';
import BottomSheet from '@gorhom/bottom-sheet';
import useQuran from '../screens/quran/useQuran';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {RECITER_OPTIONS} from '../constants/SettingOptions';
import {setSetting} from '../store/slices/userSettingsSlice';

const AudioPlayer = ({
  data,

  surah,
  startIndex,
  setCurrentTrackText,
  currentTrackText,
  setActiveNumber,
  activeNumber,
  name,

  type,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const playerState = usePlaybackState();
  const progress = useProgress();
  // const isPlaying = playerState === State?.Playing;
  const [isPlaying, setIsPlaying] = useState(false);
  const {isPlayerInitialized} = useContext(PlayerContext);
  const [playerHidden, setPlayerHidden] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // Default speed is 1.0x
  const bottomSheetRef = useRef(null);
  const dropdownRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();

  const selectedReciter = useSelector(state => state?.settings?.reciter?.value);

  useEffect(() => {
    // Reset player and current track index when reciter is changed
    const resetPlayerForNewReciter = async () => {
      console.log('Reciter changed, resetting player...');
      await TrackPlayer.reset();
      setCurrentTrackIndex(null); // Reset track index to null
      setIsPlaying(false); // Set playing state to false
      setCurrentTrackText(''); // Clear current track text
      setActiveNumber(null); // Reset active number
    };

    resetPlayerForNewReciter(); // Call reset when reciter changes
  }, [selectedReciter]);

  const handleSpeedChange = async (index, value) => {
    const selectedSpeed = parseFloat(value);
    setPlaybackSpeed(selectedSpeed);
    await TrackPlayer.setRate(selectedSpeed); // Update the playback speed
  };

  const handleReciterChange = async selectedOption => {
    console.log('Selected reciter:', selectedOption);
    const {value, label} = selectedOption;
    const key = 'reciter';
    // Save the selected reciter to redux
    dispatch(setSetting({key, value, label}));
    ToastAndroid.show(
      `Reciter changed to ${label} you may need to download some resources`,
      ToastAndroid.SHORT,
    );
  };

  const snapPoints = useMemo(() => ['10%', '24%', '100%'], []);

  const handleSheetChanges = useCallback(index => {
    setIsExpanded(index === 2);
    setIsMinimized(index === 0);
  }, []);

  useEffect(() => {
    if (State.Playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [State, isPlaying]);

  useEffect(() => {
    const initializePlayer = async () => {
      const hasPermission = await requestExternalStoragePermission();
      if (!hasPermission) {
        return;
      }
      try {
        setLoading(true);

        const trackIndex =
          type === 'Surah'
            ? data?.ayahs?.findIndex(ayah => ayah.number === startIndex)
            : data?.findIndex(ayah => ayah.number === startIndex);

        if (trackIndex !== -1) {
          setCurrentTrackIndex(trackIndex);
          await setupPlayer(trackIndex);
          // await AsyncStorage.setItem('saveAyah',JSON.stringify(currentTrackIndex))
        } else {
          // console.error('Track index not found');
        }
        setLoading(false);
      } catch (error) {
        // console.error('Error initializing player:', error);
        setLoading(false);
      }
    };

    initializePlayer().catch(error => {
      // console.error('Unhandled error in initializePlayer:', error);
      setLoading(false);
    });
  }, [data, startIndex, isPlayerInitialized]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      AsyncStorage.setItem('saveAyah', JSON.stringify(currentTrackIndex))
        .then(() => console.log('Saved ayah index:', currentTrackIndex))
        .catch(error => console.error('Error saving ayah index:', error));
    }
  }, [currentTrackIndex]);

  const requestExternalStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const readGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'This app needs access to your storage to play downloaded audio files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (readGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Cannot access audio files without storage permission.',
          );
          return false;
        }

        const writeGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'This app needs access to your storage to download audio files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (writeGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Cannot download audio files without storage permission.',
          );
          return false;
        }

        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setPlayerHidden(false);
    }
  }, [currentTrackIndex]);

  const setupPlayer = async index => {
    try {
      await TrackPlayer.reset();
      const track = type === 'Surah' ? data.ayahs[index] : data[index];
      if (!track) return;
      console.log(
        'selected reciter from player==============>>>',
        selectedReciter,
      );
      // const localFilePath = `${RNFS.DocumentDirectoryPath}/${track.number}.mp3`;
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${track.number}_${selectedReciter}.mp3`;
      console.log('localFilePath:', localFilePath);

      const trackDetails = {
        id: `${track.number}`,
        url: `file://${localFilePath}`,
        title: `Ayah ${track.numberInSurah}`,
        artist: 'Quran',
        artwork: 'https://example.com/cover.jpg',
      };

      await TrackPlayer.add([trackDetails]);
      await TrackPlayer.play();
      setCurrentTrackText(track.text_arabic);
      setActiveNumber(track.number);
    } catch (error) {
      console.error('Error setting up TrackPlayer:', error);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const handlePlay = async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };
  const hanlePause = async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  };

  const playNext = async () => {
    try {
      const nextIndex = currentTrackIndex + 1;
      if (nextIndex < (type === 'Surah' ? data.ayahs.length : data.length)) {
        setCurrentTrackIndex(nextIndex);
        await setupPlayer(nextIndex);
      }
    } catch (error) {
      console.error('Error playing next track:', error);
    }
  };

  const playPrevious = async () => {
    try {
      const prevIndex = currentTrackIndex - 1;
      if (prevIndex >= 0) {
        setCurrentTrackIndex(prevIndex);
        await setupPlayer(prevIndex);
      }
    } catch (error) {
      console.error('Error playing previous track:', error);
    }
  };

  const handleSeek = async value => {
    try {
      await TrackPlayer.seekTo(value);
    } catch (error) {
      console.error('Error seeking track:', error);
    }
  };

  useTrackPlayerEvents(
    [Event.PlaybackQueueEnded, Event.PlaybackTrackChanged],
    async event => {
      try {
        if (event.type === Event.PlaybackQueueEnded) {
          await playNext();
        }
        if (event.type === Event.PlaybackTrackChanged) {
          const nextTrack = await TrackPlayer.getTrack(event.nextTrack);
          if (nextTrack) {
            setCurrentTrackText(nextTrack.title);
            setActiveNumber(Number(nextTrack.id));
          }
        }
      } catch (error) {
        console.error('Error handling TrackPlayer events:', error);
      }
    },
  );

  const handleCloseSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const renderPlayPauseButton = () => (
    <>
      <View style={styles.slider}>
        <SlidingUp height={7} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 10,
        }}>
        <Icon
          name="skip-previous"
          size={35}
          color={COLORS.PRIMARYWHITE}
          onPress={playPrevious}
        />
        {playerState.state === 'playing' ? (
          <Icon
            name="pause-circle-filled"
            size={40}
            color={COLORS.PRIMARYWHITE}
            onPress={hanlePause}
          />
        ) : (
          <Icon
            name="play-circle-filled"
            size={40}
            color={COLORS.PRIMARYWHITE}
            onPress={handlePlay}
          />
        )}
        <Icon
          name="skip-next"
          size={35}
          color={COLORS.PRIMARYWHITE}
          onPress={playNext}
        />
      </View>
    </>
  );

  const renderFullContent = () => (
    <>
      {!isExpanded && (
        <View style={styles.slider}>
          <SlidingUp height={7} />
        </View>
      )}
      <View style={[styles.HeadingFlex, isExpanded && styles.imageCenter]}>
        <View>
          <Text style={styles.headingText}>
            {activeNumber ? `Verse ${activeNumber}` : ''}
          </Text>
          <Text style={styles.reciterName} numberOfLines={1}>
            {currentTrackText || ''}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <ModalDropdown
            options={['0.5x', '0.75x', '1.0x', '1.25x', '1.5x', '2.0x']}
            defaultValue={`${playbackSpeed}x`}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownList}
            dropdownTextStyle={styles.dropdownListText}
            onSelect={handleSpeedChange}>
            <Icon name="speed" size={30} color={COLORS.PRIMARYWHITE} />
          </ModalDropdown>
        </View>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={progress.duration}
        value={progress.position}
        onSlidingComplete={handleSeek}
        minimumTrackTintColor={COLORS.PRIMARYWHITE}
        maximumTrackTintColor={COLORS.PRIMARYWHITE}
        thumbTintColor={COLORS.PRIMARYWHITE}
      />
      <View style={styles.controlParent}>
        <TouchableOpacity
          onPress={() => {
            console.log('232323232');
          }}>
          <ModalDropdown
            options={RECITER_OPTIONS.map(option => option.label)}
            defaultValue={`${selectedReciter}`}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownList}
            dropdownTextStyle={styles.dropdownListText}
            onSelect={index => handleReciterChange(RECITER_OPTIONS[index])}>
            <ReciterIcon height={30} width={30} />
          </ModalDropdown>
        </TouchableOpacity>
        <View style={styles.controls}>
          <Icon
            name="skip-previous"
            size={35}
            color={COLORS.PRIMARYWHITE}
            onPress={playPrevious}
          />
          {playerState.state === 'playing' ? (
            <Icon
              name="pause-circle-filled"
              size={60}
              color={COLORS.PRIMARYWHITE}
              onPress={hanlePause}
            />
          ) : (
            <Icon
              name="play-circle-filled"
              size={60}
              color={COLORS.PRIMARYWHITE}
              onPress={handlePlay}
            />
          )}
          <Icon
            name="skip-next"
            size={35}
            color={COLORS.PRIMARYWHITE}
            onPress={playNext}
          />
        </View>
        <Icon name="loop" size={25} color={COLORS.PRIMARYWHITE} />
      </View>
    </>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      style={styles.bottomSheet}
      backgroundColor="#000000"
      snapPoints={snapPoints}
      handleComponent={() => null}
      handleIndicatorStyle={{display: 'none'}}
      onChange={handleSheetChanges}>
      <View
        style={[
          styles.container,
          isExpanded && styles.expandedContainer,
          isMinimized && styles.minimizedContainer,
          {height: screenHeight},
        ]}>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{paddingVertical: 60}}
            color={COLORS.PRIMARYWHITE}
          />
        ) : (
          <>
            {isMinimized ? (
              renderPlayPauseButton()
            ) : (
              <View style={{display: 'flex', justifyContent: 'space-between'}}>
                {isExpanded && (
                  <View>
                    <View style={styles.expendedSheet}>
                      <TouchableOpacity onPress={handleCloseSheet}>
                        <ScrollDown width={20} height={20} />
                      </TouchableOpacity>
                      <MoreOptions width={20} height={20} />
                    </View>
                    <View style={styles.mainContainer}>
                      <View style={styles.imageContainer}>
                        <QuranMain width={170} height={170} />
                      </View>
                      <Text style={styles.surahName}>
                        {name.name || 'Surah Names'}
                      </Text>
                    </View>
                  </View>
                )}
                {renderFullContent()}
              </View>
            )}
            {isExpanded && (
              <View style={styles.bottomImages}>
                <Share width={20} height={20} />
                <Toggle width={20} height={20} />
              </View>
            )}
          </>
        )}
      </View>
    </BottomSheet>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARYGREEN,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  expandedContainer: {
    // marginBottom: 20,
    flex: 1,
    backgroundColor: COLORS.DARKGREEN,
  },
  HeadingFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCenter: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.PRIMARYWHITE,
    fontFamily: 'poppins',
  },
  reciterName: {
    fontSize: 15,
    color: COLORS.PRIMARYWHITE,
    fontFamily: 'poppins',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlParent: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    marginTop: 10,
    width: '100%',
  },
  loadingContainer: {
    backgroundColor: COLORS.PRIMARYGREEN,
    height: 150,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  loadingText: {
    textAlign: 'center',
    color: COLORS.PRIMARYWHITE,
  },
  surahName: {
    fontSize: 30,
    paddingTop: 10,
    fontWeight: '900',
    color: 'white',
  },
  bottomSheet: {
    fontSize: 30,
    paddingTop: 0,
    fontWeight: '900',
    color: 'white',
    borderRadius: 20,
    marginTop: 10,
    overflow: 'hidden',
  },
  expendedSheet: {
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 30,
  },
  imageContainer: {
    width: 300,
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,

    overflow: 'hidden',
  },
  slider: {
    alignItems: 'center',
  },
  bottomImages: {
    display: 'flex',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dropdown: {
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.PRIMARYWHITE,
  },
  dropdownList: {
    backgroundColor: COLORS.PRIMARYLIGHTGREEN,
    borderColor: COLORS.PRIMARYWHITE,
  },
  dropdownListText: {
    color: COLORS.BLACK,
    padding: 10,
  },
});
