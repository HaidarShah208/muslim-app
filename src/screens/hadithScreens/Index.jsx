import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import TradeMark from '../../assets/hadith/tradeMark.svg';
import useHadith from './useHadith';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/COLORS';
const filterTabs = ['All'];

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(filterTabs[0]);

  const {
    downloadProgress,
    downloadAndSaveFile,
    books,
    bookName,
    fileExistence,
    started,
    removeBook,
  } = useHadith();
  const navigation = useNavigation();
  const renderBooks = ({item}) => {
    const isFileExist = fileExistence[item.title];
    return (
      <View
        style={{
          borderRadius: 20,
          height: 240,
          width: '50%',
          backgroundColor: COLORS.BACKGROUND,
          alignItems: 'center',
        }}>
        {!isFileExist && item.isDownloadAble && (
          <View
            style={{
              position: 'absolute',
              width: '98%',
              height: '99%',
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', marginVertical: 'auto'}}
              onPress={() =>
                !started && downloadAndSaveFile(item.url, item.title)
              }>
              {downloadProgress !== 0 && bookName == item.title ? (
                <Text style={{color: COLORS.WHITE}}>
                  Download Progress: {downloadProgress}%
                </Text>
              ) : (
                <Text
                  style={{color: COLORS.PRIMARYGREENSHADE2, alignItems: ''}}>
                  Download
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HadithChapters', {title: item.title})
          }
          style={{
            borderRadius: 20,
            height: 200,
            width: '100%',
            backgroundColor: COLORS.BACKGROUND,
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              paddingVertical: 10,
              marginTop: 5,
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <Image
              source={item.pic}
              style={{width: 100, height: !isFileExist ? 150 : 130}}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.BLACK,
              fontWeight: '700',
              fontFamily: 'Poppins',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
        {isFileExist && (
          <TouchableOpacity
            onPress={() => removeBook(item.title)}
            style={{
              padding: 3,
              marginTop: -25,
              borderColor: COLORS.PRIMARYGREENSHADE2,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: COLORS.PRIMARYGREENSHADE2,
            }}>
            <Text style={{color: COLORS.WHITE, fontWeight: '700'}}>
              Remove Book
            </Text>
          </TouchableOpacity>
        )}

        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                color: COLORS.GRAY,
                marginLeft: 10,
                fontFamily: 'Poppins',
              }}>
              Total Books:{item.books}
            </Text>
            <Text
              style={{
                color: COLORS.GRAY,
                marginLeft: 10,
                fontFamily: 'Poppins',
              }}>
              Total Hadiths:{item.hadiths}
            </Text>
          </View>
          <TradeMark width={20} height={30} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 10,
        backgroundColor: COLORS.WHITE,
      }}>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('MainSearch')}>
          <Icon2
            name="search"
            size={38}
            color={COLORS.PRIMARYGREENSHADE2}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.PRIMARYGREENSHADE2,
            fontSize: 22,
            fontWeight: '700',
            marginLeft: -10,
            fontFamily: 'Poppins',
          }}>
          Hadiths
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('bookmark');
            }}>
            <IonIcon
              name="list-outline"
              size={32}
              color={COLORS.PRIMARYGREENSHADE2}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        numColumns={2}
        data={books}
        columnWrapperStyle={{gap: 5, marginBottom: 9}}
        renderItem={renderBooks}
        keyExtractor={item => item.url}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
