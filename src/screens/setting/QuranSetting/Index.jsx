import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainNavigator from '../../../components/MainNavigator';
import {COLORS} from '../../../constants/COLORS';
import useQuranSetting from './useQuranSetting';
import MenuItem from '../../../components/SettingMenuItem';
import SettingModal from '../../../components/SettingModal';
import PoweredByUmmaah from '../../../assets/icons/poweredByUmmaaah.svg';
import SupportLinks from '../../../components/SupportLinks';

const {width} = Dimensions.get('window');

const Index = () => {
  const {
    settings,
    modalVisible,
    currentSetting,
    selectedOption,
    openModal,
    selectOption,
    getOptions,
    setModalVisible,
  } = useQuranSetting();

  const renderOption = ({item}) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        selectedOption === item.value && styles.optionItemSelected,
      ]}
      onPress={() => selectOption(item.value)}>
      <Text style={styles.optionText}>{item.label}</Text>

      {currentSetting === 'fontSize' && (
        <Text
          style={[styles.previewWord, {fontSize: item.value}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </Text>
      )}

      {currentSetting === 'quranScript' && (
        <Text
          style={[styles.previewWord, {fontFamily: item?.value}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </Text>
      )}

      {/* Checkmark for selected option */}
      {selectedOption === item.value && (
        <Icon name="check-circle" size={24} color={COLORS.PRIMARYGREEN} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MainNavigator heading="Setting" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.heading}>Menu</Text>
          <MenuItem name="Bookmark" icon="bookmark" onPress={() => {}} />
          <MenuItem name="Downloads" icon="download" onPress={() => {}} />
          <Text style={styles.heading}>Preferences</Text>
          <MenuItem
            name="Font Size"
            icon="font-download"
            selectedOption={settings.fontSize.label}
            onPress={() => openModal('fontSize')}
          />
          <MenuItem
            name="Quran Script"
            icon="book-online"
            selectedOption={settings.quranScript.label}
            onPress={() => openModal('quranScript')}
          />
          <MenuItem
            name="Reciter"
            icon="headset-mic"
            selectedOption={settings.reciter.label}
            onPress={() => openModal('reciter')}
          />
          <MenuItem
            name="Translation"
            icon="translate"
            selectedOption={settings.translation.label}
            onPress={() => openModal('translation')}
          />
        </View>
        <View>
          <SupportLinks />
          <PoweredByUmmaah
            width={80}
            height={50}
            style={{marginVertical: 10, alignSelf: 'center'}}
          />
          <SettingModal
            getOptions={getOptions}
            currentSetting={currentSetting}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            renderOption={renderOption}
          />
        </View>
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
    paddingHorizontal: width * 0.05, // 5% of screen width
    paddingVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center label and preview word
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHTGRAY,
  },
  optionItemSelected: {
    backgroundColor: COLORS.LIGHTGREEN15,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.BLACK,
    flexShrink: 1,
  },
  previewWord: {
    color: COLORS.BLACK,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    maxWidth: '60%',
  },
});
