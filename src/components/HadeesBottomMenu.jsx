import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/COLORS'
import Save from '../assets/hadith/save.svg';
import ShareButton from '../assets/hadith/share';
import Play from '../assets/hadith/Play.svg';
import Audio from '../assets/hadith/shareAudio.svg';
import Search from '../assets/hadith/search.svg';
import { useNavigation } from '@react-navigation/native';
const HadeesBottomMenu = ({handleSaveHadith,handleShareText,handlePlayPause,isPlaying}) => {
    const navigation =useNavigation()
  return (
    <View style={styles.bottomMenu}>
            <TouchableOpacity
              onPress={() => handleSaveHadith()}
              style={{alignItems: 'center'}}>
              <Save height={20} width={20} />
              <Text style={styles.menuText}>Bookmark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleShareText()}
              style={{alignItems: 'center', paddingLeft: 10}}>
              <ShareButton height={20} width={20} />
              <Text style={styles.menuText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePlayPause()}
              style={{alignItems: 'center', marginHorizontal: 20}}>
              <Play height={50} width={50} />
              <Text style={styles.menuText}>
                {isPlaying ? 'Pause' : 'Play'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Share Audio')}
              style={{alignItems: 'center'}}>
              <Audio height={20} width={20} />
              <Text style={styles.menuText}>Share Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainSearch')}
              style={{alignItems: 'center'}}>
              <Search height={20} width={20} />
              <Text style={styles.menuText}>Search</Text>
            </TouchableOpacity>
          </View>
  )
}

export default HadeesBottomMenu

const styles = StyleSheet.create({

    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f5',
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        alignItems: 'center',
      },
      menuText: {
        color: COLORS.BLACK,
        fontSize: 12,
        fontWeight: '400',
      },
})