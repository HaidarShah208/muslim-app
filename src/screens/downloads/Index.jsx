import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/COLORS';
import Document from '../../assets/icons/Document1.svg';
import Photo from '../../assets/icons/Photos.svg';
import Audio from '../../assets/icons/Audio1.svg';
import Quran from '../../assets/icons/Quran 1.svg';
import Hadith from '../../assets/icons/hadith.svg';
import Books from '../../assets/icons/books.svg';
import Mosque from '../../assets/icons/Mosque1.svg';
import SeeAll from '../../assets/icons/Button.svg';
const Index = ({navigation}) => {
  const options = [
    {name: 'document', size: '223 MB', icon: Document},
    {name: 'Images', size: '450 MB', icon: Photo},
    {name: 'Audio', size: '200 MB', icon: Audio},
  ];
  const categories = [
    {name: 'Quran', icon: Quran},
    {name: 'Hadith', icon: Hadith},
    {name: 'Books', icon: Books},
    {name: 'Mosque', icon: Mosque},
  ];

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
          paddingHorizontal: 20,
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="arrow-back-circle-outline"
            size={32}
            color={COLORS.PRIMARYGREENSHADE2}
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
          Downloads
        </Text>
        <View></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.search}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IonIcon name="search-outline" size={20} color={COLORS.BLACK} />
          <TextInput
            style={{
              fontFamily: 'Outfit-Medium',
              color: COLORS.BLACK,
              flex: 1,
              fontSize: 14,
              padding:5,
              height: 40, // Fixed height for TextInput
            }}
            placeholder="search for a file"
            placeholderTextColor={COLORS.BLACK}
            // onChangeText={handleSearch}
            // value={searchQuery}
          />
        </View>
      </KeyboardAvoidingView>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20}}>
          {options.map(item => (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.BACKGROUND,
                marginRight: 10,
                width: 120,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: COLORS.BLACK,
                  paddingTop: 10,
                  fontSize: 16,
                  paddingHorizontal: 10,
                }}>
                {item.name}
              </Text>
              <Text style={{color: COLORS.GRAY, paddingHorizontal: 10}}>
                {item.size}
              </Text>
              <View style={{alignItems: 'flex-end', padding: 10}}>
                <item.icon />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: COLORS.BLACK, fontSize: 24}}>Categories</Text>
        <TouchableOpacity>
          <Text style={{color: COLORS.PRIMARYGREENSHADE2}}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          {categories.map(item => (
            <View
              style={{
                backgroundColor: COLORS.BACKGROUND,
                marginRight: 10,
                width: '100%',
                height: 120,
                borderRadius: 20,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    {item.name}
                  </Text>
                  <TouchableOpacity style={{marginTop: 30}}>
                    <SeeAll />
                  </TouchableOpacity>
                </View>
                <View>
                  <item.icon />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  search: {

      marginHorizontal: 30,
      backgroundColor: COLORS.BACKGROUND,
      width: '80%',
      borderRadius: 30,
      paddingVertical: 10, // Add padding if needed for better layout

  },
});