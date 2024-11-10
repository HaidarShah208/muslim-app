import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() =>
        ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT),
      );
  };
  return (
    <View>
      <Text>Index</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>

        <Text
          onPress={() => {
            navigation.navigate('generalSetting');
          }}>
          General Setting
        </Text>

        <Text
          onPress={() => {
            navigation.navigate('hadithSetting');
          }}>
          Hadith Setting
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('calendarSetting');
          }}>
          Calendar Setting
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('gallerySetting');
          }}>
          Gallery Setting
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('prayerTimeSetting');
          }}>
          prayer time Setting
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('book');
        }}>
        <Text>BOOks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Pay');
        }}>
        <Text>payment screen </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('bookmark');
        }}>
        <Text>bookmark index </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('gallery');
        }}>
        <Text>gallery </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
