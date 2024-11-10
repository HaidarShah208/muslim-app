import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainNavigator from '../../../components/MainNavigator';
import {COLORS} from '../../../constants/COLORS';
import MenuItem from '../../../components/SettingMenuItem';
import ToggleSwitch from '../../../components/ToggleSwitch';
import SettingModal from '../../../components/SettingModal';
import usePrayerTimeSetting from './usePrayerTimeSetting';
import PoweredByUmmaah from '../../../assets/icons/poweredByUmmaaah.svg';
import {useNavigation} from '@react-navigation/native';
import SupportLinks from '../../../components/SupportLinks';

const Index = () => {
  const navigation = useNavigation();
  const {
    settings,
    modalVisible,
    currentSetting,
    selectedOption,
    notificationOptions,
    openModal,
    selectOption,
    getOptions,
    setModalVisible,
    toggleAudioSetting,
    saveSetting,
  } = usePrayerTimeSetting();

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Preferences</Text>
        <MenuItem
          name="Location Settings"
          icon="location-on"
          onPress={() => {}}
        />
        <MenuItem
          name="Calculation Methods"
          icon="calculate"
          selectedOption={settings?.calculationMethod?.label}
          onPress={() => openModal('calculationMethod')}
        />
        <MenuItem
          name="Juristic Methods"
          icon="calculate"
          selectedOption={settings.juristicMethod.label}
          onPress={() => openModal('juristicMethod')}
        />

        <Text style={styles.heading}>Notification Settings</Text>
        {notificationOptions.map((option, index) => (
          <ToggleSwitch
            key={index}
            label1={option.label1}
            label2={option.label2}
            enabled={option.enabled}
            onToggle={option.onToggle}
          />
        ))}
        <SupportLinks/>
        <PoweredByUmmaah
          width={80}
          height={50}
          style={{alignSelf: 'center', marginTop: 20}}
        />
      </ScrollView>
      <SettingModal
        getOptions={getOptions}
        currentSetting={currentSetting}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        renderOption={renderOption}
      />
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
