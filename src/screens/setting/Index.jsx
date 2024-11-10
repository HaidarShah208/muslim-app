import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/COLORS';
import MenuItem from '../../components/SettingMenuItem';
import useSetting from './useSetting';
import ToggleSwitch from '../../components/ToggleSwitch';
import SettingModal from '../../components/SettingModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainNavigator from '../../components/MainNavigator';
import PoweredByUmmaah from '../../assets/icons/poweredByUmmaaah.svg';
import {useNavigation} from '@react-navigation/native';
import SupportLinks from '../../components/SupportLinks';

const Index = () => {
  const {
    notificationsOptions,
    settings,
    openModal,
    getOptions,
    currentSetting,
    selectedOption,
    modalVisible,
    selectOption,
    setModalVisible,
  } = useSetting();
  const navigation = useNavigation();

  const renderOption = ({item}) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        selectedOption === item.value && styles.optionItemSelected,
      ]}
      onPress={() => selectOption(item.value)}>
      <Text style={styles.optionText}>{item.label}</Text>
      {selectedOption === item.value && (
        <Icon name="check-circle" size={24} color={COLORS.PRIMARYGREEN} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MainNavigator heading="Setting" />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.heading}>Account Setting</Text>
        <MenuItem
          name="Hdith Setting"
          icon="book"
          onPress={() => {
            navigation.navigate('hadithSetting');
          }}
        />
        <MenuItem
          name="Quran Setting"
          icon="book"
          onPress={() => {
            navigation.navigate('quranSetting');
          }}
        />
        <MenuItem
          name="Calendar Setting"
          icon="calendar-month"
          onPress={() => {
            navigation.navigate('calendarSetting');
          }}
        />
        <MenuItem
          name="Prayer Time Setting"
          icon="access-alarms"
          onPress={() => {
            navigation.navigate('prayerTimeSetting');
          }}
        />
        <MenuItem
          name="Gallery Setting"
          icon="browse-gallery"
          onPress={() => {
            navigation.navigate('gallerySetting');
          }}
        />

        <Text style={styles.heading}>Notification Setting</Text>
        {notificationsOptions.map((option, index) => (
          <ToggleSwitch
            key={index}
            label1={option.label1}
            label2={option.label2}
            enabled={option.enabled}
            onToggle={option.onToggle}
          />
        ))}

        <Text style={styles.heading}>Display Settings</Text>
        <MenuItem
          name="Theme"
          icon="brightness-4"
          selectedOption={settings?.theme.label}
          onPress={() => openModal('theme')}
        />
        <MenuItem
          name="Language"
          icon="language"
          selectedOption={settings?.language.label}
          onPress={() => openModal('language')}
        />
        <SettingModal
          getOptions={getOptions}
          currentSetting={currentSetting}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          renderOption={renderOption}
        />
        <View>
          <SupportLinks />
          <PoweredByUmmaah
            width={80}
            height={50}
            style={{marginBottom: 20, alignSelf: 'center'}}
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
    padding: 20,
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
    paddingVertical: 15,
    paddingHorizontal: 10,
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
  },
});
