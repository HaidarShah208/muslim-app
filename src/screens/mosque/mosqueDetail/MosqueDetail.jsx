import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/COLORS';
import Loacation from '../../../assets/icons/locationPin.svg';
import Contact from '../../../assets/icons/contact.svg';
import Bookmark from '../../../assets/icons/bookmark.svg';
import Heart from '../../../assets/icons/heartIcon.svg';
import Menu from '../../../assets/icons/menu.svg';
import PrayerTimeWidgetDetailed from '../../../components/PrayerTimeWidgetDetailed';
import Icon from 'react-native-vector-icons/Ionicons';
import { addFavorite } from '../../../store/slices/favouriteMosquesSlice';

const MosqueDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { mosque } = route.params;
  const favorites = useSelector((state) => state.favorites.favorites);
  const prayersTiming = useSelector((state) => state.prayerTiming.timings);
  const [currentMosque, setCurrentMosque] = useState(mosque);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!mosque) {
      // Logic to fetch mosque details if coming from somewhere else
      // setCurrentMosque(fetchedMosqueData);
    }

    // Check if current mosque is already in favorites
    const isMosqueInFavorites = favorites.some((fav) => fav.id === currentMosque.id);
    setIsFavorite(isMosqueInFavorites);
  }, [mosque, favorites]);

  const handleAddFavorite = () => {
    if (isFavorite) {
      Alert.alert('Already in Favorites', 'This mosque is already in your favorites.');
    } else {
      dispatch(addFavorite(currentMosque));
      setIsFavorite(true);
      Alert.alert('Added to Favorites', 'The mosque has been added to your favorites.');
    }
  };

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${currentMosque.lat},${currentMosque.lon}`;
    Linking.openURL(url).catch((err) => console.error('Error opening map:', err));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/mosqueCard.png')}
          style={styles.img}
        />
        <View style={styles.detailCard}>
          <Text style={styles.mosqueName}>{currentMosque?.tags?.name}</Text>
          <View style={styles.iconContainer}>
            <Loacation width={18} height={20} />
            <Text style={styles.detail}>
              {currentMosque?.tags?.['addr:street'] || 'Address not found'}, {currentMosque?.tags?.['addr:city']}
            </Text>
          </View>

          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={openMap}>
              <Bookmark />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddFavorite}>
              <Heart />
            </TouchableOpacity>
            <Menu />
          </View>
        </View>
        <ScrollView style={{ marginTop: 70 }}>
          <PrayerTimeWidgetDetailed prayersTiming={prayersTiming} />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default MosqueDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingBottom: 23 },
  img: { height: 370, width: '100%', position: 'relative', zIndex: -30 },
  prayerHeader: {
    fontWeight: '700',
    color: '#9A9A9A',
  },
  detailCard: {
    position: 'absolute',
    zIndex: 1000,
    top: '25%',
    width: '93%',
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 10,
    padding: 24,
  },
  mosqueName: {
    textAlign: 'left',
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
  },
  distanceContainer: {
    backgroundColor: '#f2f2f5',
    width: 70,
    borderRadius: 5,
    marginVertical: 13,
    color: 'black',
  },
  distanceText: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    fontWeight: '700',
    color: 'black',
  },
  detail: { fontSize: 13, fontWeight: '600', width: '90%', color: 'black' },
  widget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 90,
    paddingHorizontal: 30,
  },
  iconContainer: { flexDirection: 'row', gap: 13, marginTop: 12 },
  iconWrapper: {
    marginTop: 22,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 36,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  prayerText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
  prayerTime: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  aqamatTime: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.DARKGREEN,
  },
});
