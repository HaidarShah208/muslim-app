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
import useHadithSetting from './useHadithSetting';
import PoweredByUmmaah from '../../../assets/icons/poweredByUmmaaah.svg';
import SupportLinks from '../../../components/SupportLinks';

const Index = () => {
  const {} = useHadithSetting();

  return (
    <View style={styles.container}>
      <MainNavigator heading="Setting" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.heading}>Menu</Text>
          <MenuItem name="Bookmark" icon="bookmark" onPress={() => {}} />
          <MenuItem name="Downloads" icon="download" onPress={() => {}} />
        </View>
        <View>
          <SupportLinks/>
          <PoweredByUmmaah
            width={80}
            height={50}
            style={{alignSelf: 'center', marginTop: 20}}
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
    justifyContent: 'space-between',
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
