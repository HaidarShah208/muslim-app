import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from '../../../constants/COLORS';
import MainNavigator from '../../../components/MainNavigator';
import CustomTextInput from '../../../components/CustomTextInput';
import BackgroundImage from '../../../assets/images/headingBackground.png';
import Bismillah from '../../../assets/images/bismillah.svg';
import SettingIcon from '../../../assets/icons/settingIcon.svg';
import BookmakrIcon from '../../../assets/icons/fav.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import ShareIconGreen from '../../../assets/icons/shareIconGreen.svg';
import PlayIcon from '../../../assets/icons/playIcon.svg';
import BookMarkIcon from '../../../assets/icons/bookMarkIcon.svg';
import useQuranPage from './useQuranPage';
import useQuran from '../useQuran';
import AudioPlayer from '../../../components/AudioPlayer';
import {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import DetailPageHeader from '../../../components/DetailPageHeader';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDownload} from '../../../context/DownloadContext';
import {
  addQuranBookmark,
  loadBookmarks,
  removeQuranBookmark,
} from '../../../store/slices/bookmarkSlice';
const QuranPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [totalFiles, setTotalFiles] = useState(0);
  const [downloadedFiles, setDownloadedFiles] = useState(0);
  const {data, type} = route.params;
  const [loadingState, setLoadingState] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [playerState, setPlayerState] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const scrollStartTime = useRef(0);
  const lastToggleTime = useRef(0);
  const {
    setDownloadProgress,
    setIsDownloading,
    downloadProgress,
    isDownloading,
  } = useDownload();

  const selectedReciter = useSelector(state => state?.settings?.reciter?.value);
  console.log('downloadAll', selectedReciter);

  const ITEM_HEIGHT = 330;
  const {
    search,
    // isScrolling,
    readingMode,
    handleReadingMode,
    handleSearchChange,
    getAyahs,
    // handleScroll,
    currentAyah,
    setCurrentAyah,
    selectedSurah,
    setSelectedSurah,
    selectedAyah,
    setSelectedAyah,
    ayahOptions,
    setAyahOptions,
    ayahDetails,
    surahItems,
    myType,
    surah,
    // isHeaderVisible,
    // toggleHeaderVisibility,
  } = useQuranPage({data, type, isActive});

  const STORAGE_KEY = useMemo(() => {
    return `downloadProgress_${selectedReciter}_${type}_${
      surah?.name || data?.name || ''
    }`;
  }, [selectedReciter, type, surah, data?.name]);

  useEffect(() => {
    console.log('STORAGE_KEY updated:', STORAGE_KEY);
  }, [STORAGE_KEY]);

  useEffect(() => {
    const loadProgress = async () => {
      console.log('Loading progress with STORAGE_KEY:', STORAGE_KEY);
      try {
        const savedProgress = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setDownloadedFiles(parsedProgress?.downloadedFiles || 0);
          setTotalFiles(parsedProgress?.totalFiles || 0);
          setDownloadProgress(parsedProgress?.downloadProgress || 0);
        } else {
          setDownloadedFiles(0);
          setTotalFiles(0);
          setDownloadProgress(0);
        }
      } catch (error) {
        console.log('Error loading progress:', error);
      }
    };

    loadProgress();
  }, [STORAGE_KEY, surah, data]);

  const saveProgress = async (
    downloadedFiles,
    totalFiles,
    downloadProgress,
  ) => {
    try {
      // If progress reaches 100%, reset the progress and downloaded files to 0
      if (downloadProgress === 100) {
        console.log(
          `Download completed for reciter: ${selectedReciter}. Resetting progress to 0.`,
        );
        downloadedFiles = 0;
        downloadProgress = 0;
      }

      const progressData = {downloadedFiles, totalFiles, downloadProgress};
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));

      console.log(
        `Saved progress for reciter: ${selectedReciter}`,
        progressData,
      );
    } catch (error) {
      console.log(
        `Error saving download progress for reciter: ${selectedReciter}`,
        error,
      );
    }
  };

  const downloadAll = async () => {
    console.log(`Starting download process for reciter: ${selectedReciter}`);

    try {
      setLoadingState(true);
      setIsDownloading(true);

      const quranData = surah.ayahs ? surah : data;
      const totalFiles = quranData?.ayahs?.length || quranData?.length;
      const quranType = myType ? myType : type;
      setTotalFiles(totalFiles);

      console.log('quran data==============================:', quranData);

      let localDownloadedFiles = downloadedFiles; // Track how many files have already been downloaded
      console.log(
        `Total files to process for reciter ${selectedReciter}: ${totalFiles}`,
      );
      console.log(`Current downloaded files count: ${localDownloadedFiles}`);

      for (let i = localDownloadedFiles; i < totalFiles; i++) {
        const track =
          quranType === 'Surah' ? quranData?.ayahs[i] : quranData[i];
        if (!track) {
          console.log(`Skipping track at index ${i}, track not found.`);
          continue;
        }

        const localFilePath = `${RNFS.DocumentDirectoryPath}/${track.number}_${selectedReciter}.mp3`;
        console.log(
          `Checking file at path:===========================>>>>>>>> ${localFilePath}`,
        );

        const fileExists = await RNFS.exists(localFilePath);
        console.log(
          `File exists check for ${track.number}_${selectedReciter}.mp3: ${fileExists}`,
        );

        if (!fileExists) {
          console.log(
            `File does not exist, downloading: ${track.number}_${selectedReciter}.mp3`,
          );
          const reciterUrl = track[selectedReciter];
          if (!reciterUrl) {
            console.error(
              `Reciter URL not found for track ${track.number}. Skipping.`,
            );
            continue;
          }

          await RNFS.downloadFile({
            fromUrl: reciterUrl,
            toFile: localFilePath,
            progress: res => {
              const progressPercent = Math.floor(
                (res.bytesWritten / res.contentLength) * 100,
              );
              console.log(
                `Download progress for ${track.number}_${selectedReciter}.mp3: ${progressPercent}%`,
              );
            },
            progressInterval: 100,
          }).promise;

          console.log(
            `Download completed for: ${track.number}_${selectedReciter}.mp3`,
          );

          localDownloadedFiles++;
          setDownloadedFiles(localDownloadedFiles);

          const updatedDownloadProgress = parseFloat(
            ((localDownloadedFiles / totalFiles) * 100).toFixed(2),
          );
          setDownloadProgress(updatedDownloadProgress);
          console.log(`Updated download progress: ${updatedDownloadProgress}%`);

          await saveProgress(
            localDownloadedFiles,
            totalFiles,
            updatedDownloadProgress,
          );
        } else {
          console.log(
            `File already exists: ${track.number}_${selectedReciter}.mp3`,
          );
        }
      }
    } catch (error) {
      console.error('Error downloading files:', error);
    } finally {
      console.log(`Download process for reciter ${selectedReciter} completed.`);
      setLoadingState(false);
      setIsDownloading(false);
    }
  };
  // console.log('surah==============================================>>>>', surah);
  const bookmarkedPages = useSelector(state => state.bookmarks.bookmarkedPages);
  useEffect(() => {
    setPlayerState(false);
  }, [surah, selectedReciter, data, type]);

  useEffect(() => {
    setIsActive(true);
    return () => {
      setIsActive(false);
    };
  }, []);

  const {getSurahByNumber} = useQuran();

  const handlePlayPress = async index => {
    try {
      setLoadingState(true);
      setPlayerState(true);
      setIsDownloading(true);
      await downloadAll();
      setStartIndex(index);
      setCurrentAyah(index);

      const surahName = data?.englishName;
      const surahNumber = data?.number;
      await AsyncStorage.setItem(
        'lastPlayedSurah',
        JSON.stringify({name: surahName, number: surahNumber}),
      );
    } catch (error) {
      setLoadingState(false);
      setIsDownloading(false);
    } finally {
      setLoadingState(false);
      setLoadingState(false);
    }
  };
  const [startIndex, setStartIndex] = useState(null);
  const [currentTrackText, setCurrentTrackText] = useState('');
  const [activeNumber, setActiveNumber] = useState(null);
  const flatListRef = useRef(null);

  const handleBookmarkPress = pageNumber => {
    if (bookmarkedPages.includes(pageNumber)) {
      dispatch(removeQuranBookmark(pageNumber)); // Remove Quran page bookmark
      ToastAndroid.show('Bookmark Removed Successfully', ToastAndroid.SHORT);
    } else {
      dispatch(addQuranBookmark(pageNumber)); // Add Quran page bookmark
      ToastAndroid.show('Added to bookmark Successfully', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    dispatch(loadBookmarks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAyah !== null && flatListRef?.current && surah?.ayahs) {
      const index = surah?.ayahs.findIndex(
        ayah => ayah.numberInSurah === Number(selectedAyah),
      );

      if (index !== -1) {
        setTimeout(() => {
          try {
            flatListRef?.current?.scrollToIndex({animated: true, index});
          } catch (error) {
            console.warn('Scroll to index failed', error);
          }
        }, 500); // Adjust the delay as needed
      }
    }
  }, [selectedAyah, surah]);
  const renderAyah = ({item}) => {
    const translationText = item[translation] || item.text_english; // Fallback to English if translation is missing

    return (
      <View style={styles.ayahBox}>
        <View style={styles.actionsBox}>
          <View style={styles.ayahIndex}>
            <Text style={styles.indexText}>{item.numberInSurah}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <ShareIconGreen width={25} height={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isDownloading && styles.disabledButton, // Apply disabled style if isDownloading is true
              ]}
              onPress={() => handlePlayPress(item.number)}
              disabled={isDownloading} // Disable interaction if isDownloading is true
            >
              <PlayIcon width={25} height={25} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <BookMarkIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
        </View>
        {activeNumber === item.number ? (
          <View style={{backgroundColor: COLORS.LIGHTGREEN15}}>
            <View style={styles.arabicBox}>
              <Text
                style={[
                  styles.arabicText,
                  {fontSize: fontSize, fontFamily: fontFamily},
                ]}>
                {item.text_arabic}
              </Text>
            </View>
            <View>
              {translation && (
                <Text style={styles.englishText}>{translationText}</Text>
              )}
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.arabicBox}>
              <Text
                style={[
                  styles.arabicText,
                  {fontSize: fontSize, fontFamily: fontFamily},
                ]}>
                {item.text_arabic}
              </Text>
            </View>
            <View>
              {translation && (
                <Text style={styles.englishText}>{translationText}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  // Helper function to convert English numbers to Arabic numerals
  const arabicNumbersMap = {
    0: '٠',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
  };

  const convertToArabicNumbers = number => {
    return number
      .toString()
      .split('')
      .map(digit => arabicNumbersMap[digit] || digit)
      .join('');
  };

  const settings = useSelector(state => state?.settings);

  const fontSize = settings?.fontSize?.value || 24;
  const fontFamily =
    settings?.quranScript?.value || 'KfgqpcHafsUthmanicScriptRegular-1jGEe';

  const translation = settings?.translation?.value || 'text_english';

  const renderReadingModeText = () => {
    const ayahs = surah?.ayahs || getAyahs();
    let currentPage = ayahs[0]?.page;
    const pages = [];
    let pageText = '';
    let pageTextParts = [];
    let number = 0;

    ayahs.forEach((ayah, index) => {
      if (ayah.page !== currentPage) {
        pages.push({textParts: pageTextParts, pageNumber: currentPage, number});
        pageTextParts = [];
        pageText = '';
        currentPage = ayah.page;
        number = ayah.number;
      }
      pageTextParts.push({
        text: `${ayah.text_arabic} ${convertToArabicNumbers(
          ayah.numberInSurah,
        )} `,
        isActive: ayah.number === activeNumber,
      });

      if (index === ayahs.length - 1) {
        pages.push({textParts: pageTextParts, pageNumber: currentPage});
      }
    });

    return (
      <View>
        {pages.map((page, index) => {
          return (
            <View key={index} style={[styles.pageContainer]}>
              <Text
                style={[
                  styles.readingModeText,
                  {fontSize: fontSize, fontFamily: fontFamily},
                ]}>
                {page.textParts.map((part, i) => (
                  <Text
                    key={i}
                    style={part.isActive ? styles.activeAyahNumber : {}}>
                    {part.text}
                  </Text>
                ))}
              </Text>
              <View style={styles.pageNumberContainer}>
                <Text style={styles.pageNumber}>Page {page.pageNumber}</Text>
                <TouchableOpacity
                  onPress={() => handleBookmarkPress(page.pageNumber)}>
                  {bookmarkedPages?.includes(page?.pageNumber) ? (
                    <Text>BookMarked</Text>
                  ) : (
                    <BookMarkIcon />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    // onPress={toggleHeaderVisibility}
    <View style={styles.container}>
      {isHeaderVisible && (
        <DetailPageHeader
          selectedSurah={selectedSurah}
          setSelectedSurah={setSelectedSurah}
          selectedAyah={selectedAyah}
          setSelectedAyah={setSelectedAyah}
          ayahOptions={ayahOptions}
          setAyahOptions={setAyahOptions}
          ayahDetails={ayahDetails}
          surah={surah}
          handleReadingMode={handleReadingMode}
          readingMode={readingMode}
          getSurahByNumber={getSurahByNumber}
          surahItems={surahItems}
          dataName={
            type === 'Surah'
              ? data?.name
              : type === 'Juzh'
              ? `Juzh ${data[0]?.juz}`
              : type === 'Ruku'
              ? `Ruku ${data[0]?.ruku}`
              : type === 'Manzil'
              ? `Manzil ${data[0]?.manzil}`
              : 'Quran Section'
          }
          meaning={
            type === 'Surah' ? data?.englishNameTranslation : 'Quran Section'
          }
          revelationType={type === 'Surah' ? data?.revelationType : ''}
          numberOfAyahs={data?.ayahs?.length}
        />
      )}
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={
          <>
            <MainNavigator
              heading={type === 'Surah' ? data.name : 'Quran Section'}
              title={surah?.name}
              otherIcon={
                <BookmakrIcon
                  width={25}
                  height={25}
                  onPress={() => {
                    navigation.navigate('quranBookmark');
                  }}
                />
              }
            />
            <CustomTextInput
              value={search}
              onChangeText={handleSearchChange}
              placeholder="Search in Quran"
              style={styles.input}
              containerStyle={styles.inputContainer}
              autoCapitalize="none"
              placeholderTextColor={COLORS.PRIMARYGREEN}
              placeholderFontSize={14}
              placeholderFontWeight="700"
              icon={<SearchIcon width={30} height={30} />}
            />
            {!readingMode && (
              <View style={styles.headingBoxWrapper}>
                <ImageBackground
                  source={BackgroundImage}
                  style={styles.headingBox}>
                  <View style={styles.englishBox}>
                    {surah?.englishName ? (
                      <Text style={styles.headingTextEng}>
                        {surah.englishName}
                      </Text>
                    ) : (
                      <Text style={styles.headingTextEng}>
                        {type === 'Surah'
                          ? data?.englishName
                          : type === 'Juzh'
                          ? `Juzh ${data[0]?.juz}`
                          : type === 'Ruku'
                          ? `Ruku ${data[0]?.ruku}`
                          : type === 'Manzil'
                          ? `Manzil ${data[0]?.manzil}`
                          : 'Quran Section'}
                      </Text>
                    )}

                    {surah?.englishNameTranslation ? (
                      <Text style={styles.meaningText}>
                        {surah?.englishNameTranslation}
                      </Text>
                    ) : (
                      <Text style={styles.meaningText}>
                        {type === 'Surah'
                          ? data?.englishNameTranslation
                          : type === 'Juzh'
                          ? `Part ${data[0]?.juz}`
                          : type === 'Ruku'
                          ? `Section ${data[0]?.ruku}`
                          : type === 'Manzil'
                          ? `Division ${data[0]?.manzil}`
                          : 'Quran Section'}
                      </Text>
                    )}
                  </View>
                  {surah?.revelationType ? (
                    <Text style={styles.verseInfo}>
                      {surah?.revelationType}
                    </Text>
                  ) : (
                    <Text style={styles.verseInfo}>
                      {type === 'Surah' ? data?.revelationType : ''}
                    </Text>
                  )}
                  <Bismillah width={200} />
                </ImageBackground>
              </View>
            )}
            {readingMode && renderReadingModeText()}
          </>
        }
        data={readingMode ? [] : surah?.ayahs || getAyahs()}
        renderItem={renderAyah}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        // onScrollBeginDrag={handleScroll}
        scrollEventThrottle={16}
      />

      {loadingState ? (
        <View
          style={{
            backgroundColor: COLORS.PRIMARYGREEN,
            height: 150,
            borderTopStartRadius: 24,
            borderTopEndRadius: 24,
            paddingHorizontal: 22,
            paddingVertical: 10,
          }}>
          <ActivityIndicator size="large" color={COLORS.PRIMARYWHITE} />
        </View>
      ) : (
        playerState && (
          <AudioPlayer
            data={surah?.ayahs ? surah : data}
            surah={surah}
            startIndex={startIndex}
            setCurrentTrackText={setCurrentTrackText}
            setActiveNumber={setActiveNumber}
            activeNumber={activeNumber}
            currentTrackText={currentTrackText}
            type={myType ? myType : type}
            name={data}
          />
        )
      )}
    </View>
  );
};

export default QuranPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  pageContainer: {
    padding: 10,
    backgroundColor: 'white', // default color
  },
  activePageContainer: {
    backgroundColor: COLORS.LIGHTGREEN15, // or any color you want for active pages
  },

  activeAyahNumber: {
    backgroundColor: COLORS.LIGHTGREEN15, // or any color/style you want for highlighting
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  inputContainer: {
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 10,
  },
  input: {
    width: '100%',
  },
  headingBoxWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  headingBox: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  headingTextEng: {
    fontSize: 26,
    fontWeight: '400',
    color: COLORS.PRIMARYWHITE,
    fontFamily: 'Poppins',
  },
  meaningText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.PRIMARYWHITE,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  englishBox: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF59',
  },
  verseInfo: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.PRIMARYWHITE,
    fontFamily: 'Poppins',
    marginTop: 15,
    marginBottom: 32,
  },
  ayahBox: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHTGRAY,
    marginBottom: 20,
  },
  actionsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.LIGHTGRAY,
  },
  ayahIndex: {
    width: 25,
    height: 25,
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    color: COLORS.PRIMARYWHITE,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginHorizontal: 5,
  },
  arabicBox: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  arabicText: {
    fontSize: 25,
    textAlign: 'right',
    color: COLORS.BLACK,
    fontFamily: 'KfgqpcHafsUthmanicScriptRegular-1jGEe',
  },
  englishText: {
    fontSize: 16,
    textAlign: 'left',
    color: COLORS.BLACK,
    fontFamily: 'Poppins',
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pageContainer: {
    marginBottom: 40,
  },
  readingModeText: {
    textAlign: 'justify',
    color: COLORS.PRIMARYGREEN,
    width: '100%',
    padding: 20,
    fontFamily: 'KfgqpcHafsUthmanicScriptRegular-1jGEe',
  },
  pageNumber: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.DARKGRAY,
    fontFamily: 'Poppins',
  },
  pageNumberContainer: {
    backgroundColor: COLORS.LIGHTGREEN15,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indexTextCircle: {
    // color: COLORS.PRIMARYGREEN,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    fontFamily: 'KfgqpcHafsUthmanicScriptRegular-1jGEe',
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: COLORS.LIGHTGRAY,
  },
});
