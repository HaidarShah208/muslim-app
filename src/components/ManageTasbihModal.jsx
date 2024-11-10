import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ManageTasbihModal = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {addEditMode ? (
            <>
              <Text style={styles.modalTitle}>
                {editMode ? 'Edit Tasbih' : 'Add Tasbih'}
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Tasbih Name Arabic"
                value={currentTasbih.name}
                onChangeText={text =>
                  setCurrentTasbih({...currentTasbih, name: text})
                }
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Tasbih English"
                value={currentTasbih.nameEnglish}
                onChangeText={text =>
                  setCurrentTasbih({...currentTasbih, nameEnglish: text})
                }
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Target"
                keyboardType="numeric"
                value={currentTasbih.target.toString()}
                onChangeText={text =>
                  setCurrentTasbih({
                    ...currentTasbih,
                    target: parseInt(text) || 0,
                  })
                }
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => handleCancel()}
                  style={styles.editButton}>
                  <Text style={styles.editButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSaveTasbih()}
                  style={styles.editButton}>
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <></>
          )}
          {tasbihs.map(tasbih => (
            <View key={tasbih.id} style={styles.dhikrContainer}>
              <View>
                <Text style={styles.dhikrText}>{tasbih.name}</Text>
                <Text style={styles.dhikrCountText}>
                  {tasbih.count}/{tasbih.target}
                </Text>
              </View>
              <View style={styles.dhikrActions}>
                <TouchableOpacity
                  onPress={() => handleEditTasbih(tasbih)}
                  style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteTasbih(tasbih.id)}
                  style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {!addEditMode ? (
            <>
              <TouchableOpacity
                style={styles.addNewButton}
                onPress={() => {
                  setAddEditMode(true);
                }}>
                <Text style={styles.addNewText}>Add New Tasbih</Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ManageTasbihModal;

const styles = StyleSheet.create({});
