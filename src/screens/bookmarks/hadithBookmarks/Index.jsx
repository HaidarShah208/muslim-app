import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../../constants/COLORS';
import BookmarkContentCard from '../../../components/BookmarkContentCard';
import MainNavigator from '../../../components/MainNavigator';
import useHadithBookmarks from './useHadithBookmarks';

const Index = ({}) => {
  const {hadithBookmarks, handleBookmarkPress, handleRemoveBookmark} =
    useHadithBookmarks();

  return (
    <View style={styles.container}>
      <MainNavigator heading={'Bookmarks'} />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>“Hadith”</Text>
        <View style={styles.dottedLine} />
        {hadithBookmarks.map((hadith, index) => {
          return (
            <BookmarkContentCard
              key={index}
              title={`Hadith No. ${hadith?.hadithNumber}`}
              onPress={() => handleBookmarkPress(hadith.bookName,hadith.hadithNumber)}
              onDeleted={() => handleRemoveBookmark(hadith?.hadithNumber)}
              description={`${hadith?.bookName}`}
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
