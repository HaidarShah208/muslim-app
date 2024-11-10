import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../constants/COLORS';
import QuranIcon from '../../assets/icons/quranText.svg';
import SearchIcon from '../../assets/icons/search.svg';
import BookIcon from '../../assets/icons/bookIcon.svg';
import SpeakerIcon from '../../assets/icons/speakerIcon.svg';
import ArrowRight from '../../assets/icons/arrowRight.svg';
import QuickLinkMenu from '../../components/QuickLinkMenu';
import ContentCard from '../../components/ContentCard';
import {quranData} from '../../constants/METADATA';
import useQuran from './useQuran';
import CircularGraph from '../../components/CircularGraph';
import MenuIcon from '../../assets/icons/burgerMenuIcon.svg';
import SettingIcon from '../../assets/icons/settingIcon.svg';
import SearchModal from '../../components/searchModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MergeQuran from '../../constants/merged_quran.json';
import {useNavigation} from '@react-navigation/native';
import Bookmark from '../../assets/icons/fav.svg';
const Index = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quranPageTimer, setQuranPageTimer] = useState(0);
  const [lastPlayedSurah, setLastPlayedSurah] = useState(null);
  const [lastPlayedAyah, setLastPlayedAyah] = useState(null);
  const [AyahNumber, setAyahNumber] = useState(null);
  const navigation = useNavigation();
  const [lastReadSurah, setLastReadSurah] = useState(null);

  const {
    activeOption,
    handleOptionPress,
    surahList,
    juzhList,
    rukuList,
    hizbList,
    manzilList,
    isOptionActive,
    getActiveList,
    activeList,
    getSurahByNumber,
    getAyahsByJuz,
    getAyahsByRuku,
    getAyahsByManzil,
    getAyahsByPage,
    getAyahsByHizbQuarter,
    getSurahByPageNumber,
    getSurah,
  } = useQuran();

  useEffect(() => {
    const loadLastPlayedSurah = async () => {
      try {
        const storedSurah = await AsyncStorage.getItem('lastPlayedSurah');
        if (storedSurah) {
          const parsedSurah = JSON.parse(storedSurah);
          setLastPlayedSurah(parsedSurah);
          const lastPlayedAyahKey = `lastPlayedAyah_${parsedSurah.number}`;
          const storedAyah = await AsyncStorage.getItem(lastPlayedAyahKey);
          const ayahNumber = await AsyncStorage.getItem('saveAyah');
          setAyahNumber(JSON.parse(ayahNumber));
          if (storedAyah) {
            setLastPlayedAyah(JSON.parse(storedAyah));
          }
        }
      } catch (error) {
        console.error('Error loading last played surah', error);
      }
    };

    loadLastPlayedSurah();
  }, [lastPlayedSurah]);

  useEffect(() => {
    const loadLastReadSurah = async () => {
      try {
        const storedSurah = await AsyncStorage.getItem('lastReadSurah');
        if (storedSurah) {
          setLastReadSurah(JSON.parse(storedSurah));
        }
      } catch (error) {
        console.error('Error loading last read surah', error);
      }
    };

    loadLastReadSurah();
  }, [lastReadSurah]);

  useEffect(() => {
    const loadTimer = async () => {
      try {
        const storedTimer = await AsyncStorage.getItem('quranPageTimer');
        if (storedTimer) {
          setQuranPageTimer(parseInt(storedTimer, 10));
        }
      } catch (error) {
        console.error('Error loading timer', error);
      }
    };

    loadTimer();
    const interval = setInterval(loadTimer, 60000);

    return () => clearInterval(interval);
  }, []);

  const quickLinksData = [
    {name: 'Al-Mulk', number: 67},
    {name: 'Al-Rehman', number: 55},
    {name: 'YA-SIN', number: 36},
    {name: 'Al-Kahf', number: 18},
  ];

  const handleSearchIconPress = () => {
    setIsSearchModalVisible(true);
  };

  const handleCloseSearchModal = () => {
    setSearchQuery('');
    setIsSearchModalVisible(false);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    switch (activeOption) {
      case 'Surah':
        handleOptionPress('Surah');
        break;
      case 'Juzh':
        handleOptionPress('Juzh');
        break;
      case 'Ruku':
        handleOptionPress('Ruku');
        break;
      case 'Manzil':
        handleOptionPress('Manzil');
        break;
      default:
        break;
    }
  };

  const filteredList = searchQuery
    ? activeOption === 'Surah'
      ? surahList.filter(surah =>
          surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : activeOption === 'Juzh'
      ? juzhList.filter(juzh =>
          juzh.englishName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : activeOption === 'Ruku'
      ? rukuList.filter(
          ruku =>
            `Ruku ${ruku.number}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            `Surah ${ruku.surah}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            `Ayah ${ruku.ayah}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )
      : activeOption === 'Manzil'
      ? manzilList.filter(
          manzil =>
            `Manzil ${manzil.number}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            `Surah ${manzil.surah}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )
      : getActiveList()
    : getActiveList();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <SearchIcon width={28} height={28} onPress={handleSearchIconPress} />
          <View style={styles.headingContainer}>
            <QuranIcon width={53} height={53} />
            <Text style={styles.headingText}>Quran</Text>
          </View>
          {/* <MenuIcon width={40} height={40} /> */}
          <Bookmark
            width={20}
            height={30}
            onPress={() => {
              navigation.navigate('bookmark');
            }}
          />
        </View>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (lastReadSurah) {
                const matchedSurah = surahList.find(
                  surah => surah.number === lastReadSurah.number,
                );

                if (matchedSurah) {
                  let data = MergeQuran?.surahs?.find(
                    surah => surah.number === lastReadSurah.number,
                  );
                  navigation.navigate('QuranPage', {
                    data: data,
                    type: 'Surah',
                  });
                } else {
                  console.log('No matching Surah found in the list');
                }
              }
            }}>
            <View style={styles.cardFlex}>
              <BookIcon width={20} height={20} />
              <Text style={styles.cardText}>Continue Reading</Text>
            </View>
            {lastReadSurah ? (
              <>
                <Text style={styles.nameText}>{lastReadSurah.name}</Text>
                <Text style={styles.referenceText}>
                  Surah No: {lastReadSurah.number}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.nameText}>No surah read</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (lastPlayedSurah) {
                const matchedSurah = surahList.find(
                  surah => surah.number === lastPlayedSurah.number,
                );

                if (matchedSurah) {
                  let data = MergeQuran?.surahs?.find(
                    surah => surah.number === lastPlayedSurah.number,
                  );
                  navigation.navigate('QuranPage', {
                    data: data,
                    type: 'Surah',
                  });
                } else {
                  console.log('No matching Surah found in the list');
                }
              }
            }}>
            <View style={styles.cardFlex}>
              <SpeakerIcon width={20} height={20} />
              <Text style={styles.cardText}>Continue Reciting</Text>
            </View>
            {lastPlayedSurah ? (
              <>
                <Text style={styles.nameText}>{lastPlayedSurah.name}</Text>
                <Text style={styles.referenceText}>ayah No: {AyahNumber}</Text>
              </>
            ) : (
              <>
                <Text style={styles.nameText}>No Surah played</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.navigator}>
          <Text style={styles.navigatorText}>Your weekly activity</Text>
          <TouchableOpacity>
            <ArrowRight width={13} height={13} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.graphsContainer}>
          <View style={styles.singleGraph}>
            <CircularGraph
              target={100}
              progress={quranPageTimer}
              progressColor={COLORS.PRIMARYGREENSHADE2}
              backgroundColor={COLORS.LIGHTGRAY}
            />
            <Text style={styles.graphLable}>Minutes</Text>
          </View>
          <View style={styles.singleGraph}>
            <CircularGraph
              target={100}
              progress={0}
              progressColor={COLORS.PRIMARYGREENSHADE2}
              backgroundColor={COLORS.LIGHTGRAY}
            />
            <Text style={styles.graphLable}>Verses</Text>
          </View>
          <View style={styles.singleGraph}>
            <CircularGraph
              target={100}
              progress={40}
              progressColor={COLORS.PRIMARYGREENSHADE2}
              backgroundColor={COLORS.LIGHTGRAY}
            />
            <Text style={styles.graphLable}>Days</Text>
          </View>
        </View>
        <QuickLinkMenu
          quickLinks={quickLinksData}
          onLinkPress={getSurahByNumber}
        />
        <View style={styles.partitionMenu}>
          {['Surah', 'Juzh', 'Ruku', 'Manzil'].map(option => (
            <View
              key={option}
              style={[
                styles.optionContainer,
                isOptionActive(option) && styles.activeOptionContainer,
              ]}>
              <TouchableOpacity
                onPress={() => {
                  handleOptionPress(option);
                  setSearchQuery('');
                }}>
                <Text
                  style={[
                    styles.option,
                    isOptionActive(option) && styles.activeOption,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {filteredList.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Text style={styles.noFoundHeading}>
              Not this {activeOption} found
            </Text>
          </View>
        ) : (
          filteredList.map((item, index) => (
            <ContentCard
              key={item.number || item.id}
              data={item}
              type={activeOption}
              getSurahByNumber={getSurahByNumber}
              getAyahsByJuz={getAyahsByJuz}
              getAyahsByRuku={getAyahsByRuku}
              getAyahsByManzil={getAyahsByManzil}
              getAyahsByPage={getAyahsByPage}
              getAyahsByHizbQuarter={getAyahsByHizbQuarter}
              index={index + 1}
            />
          ))
        )}
      </ScrollView>
      <SearchModal
        visible={isSearchModalVisible}
        onClose={handleCloseSearchModal}
        onSearch={handleSearch}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headingText: {
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    marginLeft: 5,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingTop: 0,
  },
  card: {
    flex: 1,
    height: 133,
    backgroundColor: COLORS.LIGHTGREEN15,
    marginLeft: 5,
    padding: 24,
    borderRadius: 17,
  },
  cardText: {
    color: COLORS.BLACK,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  cardFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    marginTop: 5,
  },
  referenceText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    marginTop: 5,
  },
  navigator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    paddingBottom: 0,
  },
  navigatorText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.GRAY,
  },
  arrowIcon: {
    marginLeft: 15,
    marginTop: 5,
  },
  partitionMenu: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  optionContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: COLORS.GRAY,
    alignItems: 'center',
  },
  activeOptionContainer: {
    borderColor: COLORS.PRIMARYGREEN,
  },
  option: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.GRAY,
    marginTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  activeOption: {
    color: COLORS.PRIMARYGREEN,
  },
  graphsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  singleGraph: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  graphLable: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
    color: COLORS.GRAY,
    marginTop: 5,
  },
  notFoundContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFoundHeading: {
    color: COLORS.DARKGREEN,
    fontWeight: 'bold',
  },
});
