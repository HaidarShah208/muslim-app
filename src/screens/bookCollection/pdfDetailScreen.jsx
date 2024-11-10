
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, PanResponder, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';
import Fav from '../../assets/icons/fav.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, initializeFavorites } from '../../store/slices/favoriteBookSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setProgress, initializeReadingProgressAsync } from '../../store/slices/pdfProgressSlic';

const PdfDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { pdf } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoriteBook.favorites);
  const progress = useSelector((state) => state.pdfProgress.progress || { pagesRead: 0, totalPages: 0, pdf: pdf });
  const [showImage, setShowImage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(progress.totalPages || 0);

  useEffect(() => {
    dispatch(initializeFavorites());
    dispatch(initializeReadingProgressAsync());
  }, [dispatch]);

  useEffect(() => {
    storeOpenedPdf(pdf); // Store opened PDF in AsyncStorage
  }, [pdf]);

  const storeOpenedPdf = async (pdf) => {
    try {
      const storedPdfs = await AsyncStorage.getItem('openedPdfs');
      const openedPdfs = storedPdfs ? JSON.parse(storedPdfs) : [];

      // Check if the PDF is already stored
      const isAlreadyStored = openedPdfs.some((item) => item.id === pdf.id);
      if (!isAlreadyStored) {
        openedPdfs.push(pdf); // Add the new PDF
        await AsyncStorage.setItem('openedPdfs', JSON.stringify(openedPdfs)); // Save back to AsyncStorage
      }
    } catch (error) {
      console.log('Error storing opened PDF:', error);
    }
  };

  useEffect(() => {
    const saveProgress = () => {
      if (numberOfPages > 0) {
        dispatch(setProgress({ bookId: pdf.id, pagesRead: currentPage, totalPages: numberOfPages, pdf: pdf }));
      }
    };

    saveProgress();
  }, [currentPage, numberOfPages, dispatch, pdf.id, pdf]);

  useEffect(() => {
    const start = Date.now();
    setStartTime(start);

    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - start;
      saveTimeSpent(timeSpent);
    };
  }, []);

  const saveTimeSpent = async (timeSpent) => {
    try {
      const today = new Date();
      const dateKey = today.toISOString().split('T')[0];

      const storedWeeklyData = await AsyncStorage.getItem('weeklyTimeSpent');
      const weeklyData = storedWeeklyData ? JSON.parse(storedWeeklyData) : {};

      const currentDayTime = weeklyData[dateKey] ? weeklyData[dateKey] + timeSpent : timeSpent;
      weeklyData[dateKey] = currentDayTime;

      const last7Days = getLast7Days();
      const filteredData = {};
      last7Days.forEach((day) => {
        if (weeklyData[day]) {
          filteredData[day] = weeklyData[day];
        }
      });

      await AsyncStorage.setItem('weeklyTimeSpent', JSON.stringify(filteredData));
    } catch (error) {
      console.log('Error saving time spent:', error);
    }
  };

  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      days.push(day.toISOString().split('T')[0]);
    }
    return days;
  };

  const handleFavoritePress = () => {
    const alreadyAdded = favorites.some((item) => item.id === pdf.id);

    if (alreadyAdded) {
      ToastAndroid.show('This book is already in your favorites!', ToastAndroid.SHORT);
      return;
    }

    dispatch(addFavorite(pdf));
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy < -100;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -10) {
        setShowImage(false);
      }
    },
  });

  const handlePageChange = (page, numberOfPages) => {
    dispatch(saveProgressToStorage(pdf.id, page, numberOfPages));
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <MainNavigator
        otherIcon={
          <TouchableOpacity onPress={handleFavoritePress}>
            <Fav width={20} />
          </TouchableOpacity>
        }
      />
      {showImage && (
        <>
          <Image source={{ uri: pdf.featuredImage || 'fallback-image-url' }} style={styles.bookImage} />
        </>
      )}
      <Text style={styles.title}>{pdf.title}</Text>
      {loading && <ActivityIndicator size="large" color={COLORS.PRIMARYGREEN} style={styles.loadingIndicator} />}
      {!loading && (
        <Text style={styles.pageNumber}>
          Page {currentPage} of {numberOfPages}
        </Text>
      )}
      <Pdf
        source={{ uri: pdf?.mediaFile, cache: true }}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages) => {
          setNumberOfPages(numberOfPages);
          setLoading(false);
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage(page);
          console.log(`Current page: ${page}`);
        }}
        style={[styles.pdf, showImage ? styles.smallPdf : styles.fullPdf]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.PRIMARYGREEN,
    paddingHorizontal: 25,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  pageNumber: {
    fontSize: 14,
    color: COLORS.PRIMARYGREEN,
    textAlign: 'center',
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  smallPdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  fullPdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
  bookImage: {
    width: 126,
    height: 170,
    borderRadius: 8,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});

export default PdfDetailScreen;
