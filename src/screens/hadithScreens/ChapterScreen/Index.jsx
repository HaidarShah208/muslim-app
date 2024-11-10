import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/COLORS';
import LottieView from 'lottie-react-native';

import useChapter from './useChapter';

const Index = ({navigation, route}) => {
  const {title} = route.params;

  const {
    handleSearch,
    fileContentCache,
    filteredChapters,
    searchQuery,
    isSearch,
    setIsSearch,
  } = useChapter({title});

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 10,
        gap: 10,
        backgroundColor: COLORS.WHITE,
      }}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.BACKGROUND,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="arrow-back-circle-outline"
            size={32}
            color={COLORS.PRIMARYGREENSHADE2}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: isSearch ? 'row' : '',
            gap: 8,
            alignItems: 'center',
            flex: 1,
          }}>
          {isSearch ? (
            <TextInput
              style={{
                fontFamily: 'Poppins',
                color: COLORS.BLACK,
                flex: 1,
                fontSize: 14,
                marginLeft: 8,
              }}
              placeholderTextColor={COLORS.BLACK}
              onChangeText={handleSearch}
              value={searchQuery}></TextInput>
          ) : (
            <Text
              style={{
                color: COLORS.DARKGREEN,
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'Poppins',
              }}>
              {title}
            </Text>
          )}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setIsSearch(!isSearch)}>
            <Icon2
              name="search"
              size={32}
              color={COLORS.PRIMARYGREENSHADE2}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IonIcon
              name="list-outline"
              size={32}
              color={COLORS.PRIMARYGREENSHADE2}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginBottom: '17%'}}>
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 10,
            marginBottom: '10%',
          }}>
          {filteredChapters ? (
            filteredChapters.map(item => (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('HadithScreen', {
                      data: fileContentCache,
                      chapter: item.chapterEnglish,
                      ChapterNo: item.chapterNumber,
                    })
                  }
                  key={item.id}
                  style={styles.Card}>
                  <Text style={styles.Hadith}>{item.chapterEnglish}</Text>
                  <Text style={{color: COLORS.GRAY, marginLeft: 2}}>
                    {item.chapterNumber}
                  </Text>
                </TouchableOpacity>
              </>
            ))
          ) : fileContentCache ? (
            fileContentCache.hadiths.chapters.map(item => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('HadithScreen', {
                      data: fileContentCache,
                      chapter: item.chapterEnglish,
                      ChapterNo: item.chapterNumber,
                    });
                  }}
                  key={item.hadithNumber}
                  style={styles.Card}>
                  <Text style={styles.Hadith}>{item.chapterEnglish}</Text>
                  <Text style={{color: COLORS.GRAY, marginLeft: 2}}>
                    {item.chapterNumber}
                  </Text>
                </TouchableOpacity>
              </>
            ))
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <LottieView
                source={require('../../../assets/hadith/Animation.json')}
                autoPlay
                playOnMount={true}
                style={{width: 200, height: 200}}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  Card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
  },
  Hadith: {
    color: COLORS.BLACK,
    fontSize: 20,
    fontWeight: '500',
    maxWidth: '80%',
    fontFamily: 'Poppins',
  },
});
