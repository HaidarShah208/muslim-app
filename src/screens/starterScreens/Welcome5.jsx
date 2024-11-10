import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img1 from '../../assets/images/img5.png';
import {COLORS} from '../../constants/COLORS';
import Icon from 'react-native-vector-icons/AntDesign';
import {JURISTIC_OPTIONS} from '../../constants/SettingOptions';
import {setSetting} from '../../store/slices/userSettingsSlice';

const {width} = Dimensions.get('window');

const WelcomeScreen5 = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Load juristicMethod from Redux or set a default 'Shafi'
  const storedMadhab = useSelector(
    state => state.settings.juristicMethod?.value || 'Shafi',
  );
  const [selectedMadhab, setSelectedMadhab] = useState(storedMadhab);

  useEffect(() => {
    const loadMadhab = async () => {
      try {
        const madhab = await AsyncStorage.getItem('madhab');
        if (madhab) {
          setSelectedMadhab(madhab);
        }
      } catch (error) {
        console.error('Failed to load Madhab from AsyncStorage:', error);
      }
    };

    loadMadhab();
  }, []);

  console.log('selectedMadhab:', selectedMadhab);

  const handleMadhabSelect = async madhab => {
    setSelectedMadhab(madhab);
    dispatch(
      setSetting({
        key: 'juristicMethod',
        value: madhab,
        label: 'Juristic Method',
      }),
    );
    try {
      await AsyncStorage.setItem('madhab', madhab);
    } catch (error) {
      console.error('Failed to save Madhab to AsyncStorage:', error);
    }
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View style={styles.progressBar}>
            <View style={styles.progress}></View>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.mainText}>Madhab</Text>
            <Text style={{marginTop: 10, color: COLORS.GRAY}}>
              {' '}
              (School of Thought)
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image source={img1} style={styles.image} />
          </View>

          {JURISTIC_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.madhabContainer,
                selectedMadhab === option.value && styles.selectedMadhab,
              ]}
              onPress={() => handleMadhabSelect(option.value)}>
              <Text style={styles.madhabText}>{option.label}</Text>
              <Text>2 Mithl</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.description}>
            Your Madhab (School of Thought) determines whether you follow the
            earlier or later ASR times. More calculation options are available
            in settings.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('welcome6')}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrowright" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 13,
    overflow: 'hidden',
    marginTop: 5,
  },
  progress: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: 10,
    fontFamily: 'Poppins',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'contain',
  },
  madhabContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    width: '100%',
    backgroundColor: COLORS.LIGHTGRAY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  selectedMadhab: {
    borderWidth: 2,
    borderColor: 'black',
  },
  madhabText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  description: {
    color: COLORS.BLACK,
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 30,
    paddingHorizontal: 10,
    lineHeight: 20,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  nextButton: {
    borderRadius: 10,
    alignItems: 'space-between',
    gap: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
  },
  nextButtonText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default WelcomeScreen5;
