import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HadithCard from '../../../components/HadithCard';
import {COLORS} from '../../../constants/COLORS';
import LottieView from 'lottie-react-native';
import useHadithScreen from './useHadithScreen';
const Index = ({navigation, route}) => {
  const {data, chapter, ChapterNo} = route.params;
  let No = 1;
  const {
    chapterData,
    handleSearch,
    isSearch,
    setIsSearch,
    filterData,
    setFilterData,
  } = useHadithScreen({data, chapter, No});

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
                fontFamily: 'Outfit-Medium',
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
              {chapter}
            </Text>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setIsSearch(!isSearch), setFilterData(null);
            }}>
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
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 10,
        }}>
        {filterData ? (
          filterData.map(item => (
            <HadithCard
              key={item.hadithNumber || index}
              data={item}
              No={No++}
              allData={chapterData}
            />
          ))
        ) : chapterData ? (
          chapterData.map(item => (
            <HadithCard
              key={item.hadithNumber || index}
              data={item}
              No={No++}
              allData={chapterData}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: '70%',
            }}>
            <LottieView
              source={require('../../../assets/hadith/Animation.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
