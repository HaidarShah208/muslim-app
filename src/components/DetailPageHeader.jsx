import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import QuranOpenIcon from '../assets/icons/QuranOpenIcon';
import AyahModeIcon from '../assets/icons/ayahModeIcon.svg';
import {COLORS} from '../constants/COLORS';
import SettingIcon from '../assets/icons/settingIcon.svg';
import {useNavigation} from '@react-navigation/native';

const DetailPageHeader = ({
  handleReadingMode,
  surahItems,
  selectedSurah,
  setSelectedSurah,
  ayahOptions,
  selectedAyah,
  setSelectedAyah,
  readingMode,
}) => {
  const navigation = useNavigation();
  const [ayahPlaceholder, setAyahPlaceholder] = useState('Select Ayah');
  const [surahPlaceholder, setSurahPlaceholder] = useState('Select Surah');

  return (
    <View style={styles.stickyHeader}>
      <View style={styles.dropDownContainer}>
        {/* Surah Dropdown */}
        <ModalDropdown
          options={surahItems.map(item => item.label)}
          onSelect={(index, label) => {
            const selectedSurahValue = surahItems[index].value;
            setSelectedSurah(selectedSurahValue);
            setSurahPlaceholder(label); // Update placeholder to show the selected Surah
            setSelectedAyah(null); // Reset Ayah when Surah changes
            setAyahPlaceholder('Select Ayah'); // Reset Ayah placeholder
          }}
          style={styles.dropDown}
          textStyle={styles.dropDownText}
          dropdownStyle={styles.dropDownInnerContainer}
          renderRow={(rowData, rowID, highlighted) => (
            <View
              style={[
                styles.dropdownRow,
                {
                  backgroundColor:
                    surahItems[rowID].value === selectedSurah
                      ? 'green'
                      : 'white',
                },
              ]}>
              <Text
                style={[
                  styles.dropdownText,
                  {
                    color:
                      surahItems[rowID].value === selectedSurah
                        ? 'white'
                        : 'black',
                  },
                ]}>
                {rowData}
              </Text>
            </View>
          )}>
          {/* Custom Placeholder or Selected Surah */}
          <Text style={styles.dropDownText}>
            {selectedSurah ? surahPlaceholder : 'Select Surah'}
          </Text>
        </ModalDropdown>

        {/* Ayah Dropdown */}
        <ModalDropdown
          options={ayahOptions}
          onSelect={(index, value) => {
            setSelectedAyah(value);
            setAyahPlaceholder(`Ayah ${value}`);
          }}
          style={styles.dropDown}
          textStyle={styles.dropDownText}
          dropdownStyle={styles.dropDownInnerContainer}
          renderRow={(rowData, rowID, highlighted) => (
            <View
              style={[
                styles.dropdownRow,
                {
                  backgroundColor: selectedAyah === rowData ? 'green' : 'white',
                },
              ]}>
              <Text
                style={[
                  styles.dropdownText,
                  {
                    color: selectedAyah === rowData ? 'white' : 'black',
                  },
                ]}>
                {rowData}
              </Text>
            </View>
          )}>
          {/* Custom Placeholder or Selected Ayah */}
          <Text style={styles.dropDownText}>
            {selectedAyah ? ayahPlaceholder : 'Select Ayah'}
          </Text>
        </ModalDropdown>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleReadingMode}>
          {readingMode ? <AyahModeIcon /> : <QuranOpenIcon />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('quranSetting')}>
          <SettingIcon height={30} width={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    alignItems: 'center',
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 24,
    paddingVertical: 10,
    padding: 10,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDown: {
    flex: 1,
    marginHorizontal: 5,
    minWidth: 100,
    minHeight: 40,
    borderColor: COLORS.LIGHTGRAY,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  dropDownText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: COLORS.GRAY,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dropDownInnerContainer: {
    borderColor: COLORS.LIGHTGRAY,
    borderWidth: 1,
    width: 150,
    borderRadius: 10,
    maxHeight: 200, // Adjust height as needed
  },
  dropdownRow: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    height: 40,
    width: 40,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginRight: 5,
  },
});

export default DetailPageHeader;
