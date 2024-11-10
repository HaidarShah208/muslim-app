import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/COLORS';

const SettingModal = ({
  getOptions,
  currentSetting,
  modalVisible,
  setModalVisible,
  renderOption,
}) => {
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select {currentSetting}</Text>
          <FlatList
            data={getOptions(currentSetting)}
            renderItem={renderOption}
            keyExtractor={item => item.value}
            contentContainerStyle={styles.optionsList}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettingModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: COLORS.PRIMARYWHITE,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 20,
  },
  optionsList: {
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLORS.PRIMARYWHITE,
    fontWeight: '600',
    fontSize: 16,
  },
});
