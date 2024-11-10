import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../constants/COLORS';
import quranData from '../constants/merged_quran.json';
import {useNavigation} from '@react-navigation/native';

const QuickLinkMenu = ({quickLinks, onLinkPress}) => {
  const navigation = useNavigation();

  const handlePress = number => {
    const result = onLinkPress(quranData, number);
    navigation.navigate('QuranPage', {
      data: result,
      type: 'Surah',
    });
  };

  return (
    <View style={styles.quickLinksContainer}>
      <Text style={styles.navigatorText}>Quick Links</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}>
        {quickLinks.map((link, index) => (
          <TouchableOpacity
            onPress={() => handlePress(link.number)}
            key={index}
            style={styles.quickLinkCard}>
            <Text style={styles.quickLinkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Default Props
QuickLinkMenu.defaultProps = {
  quickLinks: [
    {name: 'Al-Mulk', number: 67},
    {name: 'Al-Rehman', number: 55},
    {name: 'YA-SIN', number: 36},
    {name: 'Al-Kahf', number: 18},
  ],
  onLinkPress: () => {},
};

export default QuickLinkMenu;

const styles = StyleSheet.create({
  quickLinksContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  quickLinkCard: {
    height: 35,
    width: 'auto',
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 2,
    marginRight: 10,
  },
  quickLinkText: {
    color: COLORS.PRIMARYWHITE,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins',
    padding: 5,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  navigatorText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: COLORS.GRAY,
  },
});
