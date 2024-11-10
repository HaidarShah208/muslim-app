import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../constants/COLORS';
import BookmarkCard from '../../components/BookmarkCard';
import quranIcon from '../../assets/images/quran.svg';
import hadithIcon from '../../assets/images/hadith.svg';
import mosqueIcon from '../../assets/images/mosqueBookmark.svg';
import galleryIcon from '../../assets/images/gallery.svg';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <BookmarkCard
          title="Quran"
          icon={quranIcon}
          onPress={() => navigation.navigate('quranBookmark')}
        />
        <BookmarkCard
          title="Hadith"
          icon={hadithIcon}
          onPress={() => navigation.navigate('hadithBookmark')}
        />
        <BookmarkCard
          title="Mosque"
          icon={mosqueIcon}
          onPress={() => navigation.navigate('mosqueBookmark')}
        />
        <BookmarkCard
          title="Gallery"
          icon={galleryIcon}
          onPress={() => navigation.navigate('galleryBookmark')}
        />
      </ScrollView>
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
    padding: 20,
  },
});
