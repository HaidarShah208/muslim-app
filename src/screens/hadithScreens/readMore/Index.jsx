import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/COLORS';

import MainNavigator from '../../../components/MainNavigator';
import useReadMore from './useReadMore';
import LottieView from 'lottie-react-native';
import HadeesBottomMenu from '../../../components/HadeesBottomMenu';

const {width} = Dimensions.get('window');

const Index = ({navigation, route}) => {
  const {data, allData} = route.params;
  const {
    handleSaveHadith,
    handleShareText,
    handlePlayPause,
    isPlaying,
    index,
    setIndex,
    hadith,
  } = useReadMore({data, allData});

  const [routes] = useState(
    allData.map(item => ({
      key: item.hadithNumber.toString(),
      title: `${item?.book?.bookSlug}:${item.hadithNumber}`,
    })),
  );

  const renderScene = ({route}) => {
    const hadith = allData.find(item => item.hadithNumber === route.key);

    return (
      <ScrollView
        contentContainerStyle={{paddingBottom: '30%'}}
        style={styles.scene}>
        <Text style={styles.hadith}>{hadith?.hadithArabic}</Text>
        <Text style={[styles.hadith, {marginTop: 10}]}>
          {hadith?.hadithEnglish}
        </Text>
      </ScrollView>
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{backgroundColor: COLORS.PRIMARYGREENSHADE2}}
      style={styles.tabBar}
      tabStyle={styles.tabItem}
      renderLabel={({route, focused}) => (
        <Text
          style={[
            styles.tabText,
            {color: focused ? COLORS.PRIMARYGREENSHADE2 : COLORS.BLACK},
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainNavigator
        heading={
          Array.isArray(data)
            ? `${data[0]?.bookSlug} ${data[0]?.hadithNumber}`
            : `${data?.bookSlug} ${data?.hadithNumber}`
        }
        otherIcon={
          <IonIcon
            name="list-outline"
            size={32}
            color={COLORS.PRIMARYGREENSHADE2}
          />
        }
      />
      {index === null || !hadith ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LottieView
            source={require('../../../assets/hadith/Animation.json')}
            autoPlay
            playOnMount={true}
            style={{width: 200, height: 200}}
          />
        </View>
      ) : (
        <>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width}}
            renderTabBar={renderTabBar}
          />
          <HadeesBottomMenu
            handleSaveHadith={handleSaveHadith}
            handleShareText={handleShareText}
            handlePlayPause={handlePlayPause}
            isPlaying={isPlaying}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  tabBar: {
    backgroundColor: COLORS.WHITE,
  },
  tabItem: {
    width: 130,

    borderColor: COLORS.PRIMARYGREENSHADE2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  scene: {
    flex: 1,
    padding: 20,
    paddingBottom: '30%',
  },
  hadith: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 30,
    fontFamily: 'Poppins',
  },
});
