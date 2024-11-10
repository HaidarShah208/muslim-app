import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../../constants/COLORS';
import BookmarkContentCard from '../../../components/BookmarkContentCard';
import useQuranBookmark from './useQuranBookmarks';
import quranData from '../../../constants/merged_quran.json';
import MainNavigator from '../../../components/MainNavigator';

const Index = ({}) => {
  const {
    bookmarkedPages,
    handleBookmarkPress,
    handleBookmarkView,
  } = useQuranBookmark();

  return (
    <View style={styles.container}>
      <MainNavigator heading={'Bookmarks'} />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>“Quran”</Text>
        <View style={styles.dottedLine} />
        {bookmarkedPages.map((page, index) => {
          console.log('Rendering page:', page);
          return (
            <BookmarkContentCard
              key={index}
              title={`Page ${page}`}
              onPress={() => handleBookmarkView(quranData, page)}
              onDeleted={() => handleBookmarkPress(page)}
              description={`Page number: ${page}`}
            />
          );
        })}
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: COLORS.BLACK,
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.BLACK,
    borderStyle: 'dotted',
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
