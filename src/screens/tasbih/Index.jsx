import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';
import CustomTextInput from '../../components/CustomTextInput';
import SearchIcon from '../../assets/icons/search.svg';

import ShowAllNavigator from '../../components/ShowAllNavigator';
import useTasbih from './useTasbih';
import CircularGraph from '../../components/CircularGraph';

const Index = () => {
  const {
    search,
    tasbihs,
    modalVisible,
    editMode,
    addEditMode,
    currentTasbih,
    handleSearchChange,
    handleSaveTasbih,
    handleEditTasbih,
    handleDeleteTasbih,
    handleCancel,
    navigation,
    setAddEditMode,
    setCurrentTasbih,
    setModalVisible,
    tasbihTargets,
    onTasbihTargetChange,
    showTargetFrom,
    setShowTargetFrom,
    handleSaveTargets,
    totalCount,
    handleIncrementTotalCount,
    targetTasbihFormValues,
    setTargetTasbihFormValues,
    dailyProgress,
    weeklyProgress,
    monthlyProgress,
    filteredTasbihs,
  } = useTasbih();
  console.log('totalCount', editMode);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <MainNavigator heading={'Tasbih'} />
        <CustomTextInput
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Search Tasbih"
          style={styles.input}
          containerStyle={styles.inputContainer}
          autoCapitalize="none"
          placeholderTextColor={COLORS.PRIMARYGREEN}
          placeholderFontSize={14}
          placeholderFontWeight="700"
          icon={<SearchIcon width={30} height={30} />}
        />
        <Text style={styles.heading}>Progress</Text>
        <View style={styles.progressParent}>
          <View style={styles.progressContainer}>
            <Text style={styles.targetType}>Daily</Text>
            <Text style={styles.targetNumber}>{tasbihTargets?.daily}</Text>
            <CircularGraph
              target={100}
              progress={dailyProgress}
              progressColor={COLORS.PRIMARYGREENSHADE2}
              backgroundColor={COLORS.PRIMARYWHITE}
              showPercentageSign={true}
            />
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.targetType}>Weekly</Text>
            <Text style={styles.targetNumber}>{tasbihTargets?.weekly}</Text>
            <CircularGraph
              target={100}
              progress={weeklyProgress}
              progressColor={COLORS.PRIMARYGREENSHADE2}
              backgroundColor={COLORS.PRIMARYWHITE}
              showPercentageSign={true}
            />
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.targetType}>Monthly</Text>
            <Text style={styles.targetNumber}>{tasbihTargets?.monthly}</Text>
            <CircularGraph
              target={100}
              progress={monthlyProgress}
              progressColor={COLORS.PRIMARYGREENSHADE2}
              backgroundColor={COLORS.PRIMARYWHITE}
              showPercentageSign={true}
            />
          </View>
        </View>
        <View>
          <View style={styles.actionParent}>
            <TouchableOpacity
              style={styles.actionContainer2}
              onPress={() => {
                setModalVisible(true);
                setAddEditMode(true);
              }}>
              <Text style={styles.actionText}>Add New Tasbih</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionContainer2}
              onPress={() => {
                setModalVisible(true);
                setShowTargetFrom(true);
              }}>
              <Text style={styles.addNewText}>Manage Targets</Text>
            </TouchableOpacity>
          </View>
          <ShowAllNavigator
            label="My Dhikr"
            linkText="See All"
            labelStyle={styles.customLableStyle}
            linkTextStyle={styles.customLinkTextStyle}
          />
          <View style={styles.tasbihMap}>
            {filteredTasbihs.length > 0 ? (
              filteredTasbihs.map(tasbih => (
                <TouchableOpacity
                  key={tasbih.id}
                  style={styles.dhikrContainer}
                  onPress={() => {
                    navigation.navigate('tasbihDetailScreen', {
                      tasbih,
                      tasbihs,
                    });
                  }}>
                  <View style={styles.tasbihCard}>
                    <Text style={styles.dhikrText}>{tasbih.name}</Text>
                    <Text style={styles.dhikrCountText}>
                      {tasbih.count}/{tasbih.target}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.notFound}>Tasbih not exist</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {/* Modal for Adding/Editing Tasbih */}
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
                  placeholderTextColor={COLORS.BLACK}
                  value={currentTasbih.name}
                  onChangeText={text =>
                    setCurrentTasbih({...currentTasbih, name: text})
                  }
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Tasbih English"
                  placeholderTextColor={COLORS.BLACK}
                  value={currentTasbih.nameEnglish}
                  onChangeText={text =>
                    setCurrentTasbih({...currentTasbih, nameEnglish: text})
                  }
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Target"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.BLACK}
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
            {showTargetFrom ? (
              <>
                <View style={styles.tasbihTargetSet}>
                  <Text style={styles.modalTitle}>Set Target</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="set Daily Target"
                    placeholderTextColor={COLORS.BLACK}
                    value={targetTasbihFormValues?.daily?.toString()}
                    onChangeText={text =>
                      setTargetTasbihFormValues({
                        ...targetTasbihFormValues,
                        daily: text,
                      })
                    }
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="set Weekly Target"
                    placeholderTextColor={COLORS.BLACK}
                    value={targetTasbihFormValues?.weekly?.toString()}
                    onChangeText={text =>
                      setTargetTasbihFormValues({
                        ...targetTasbihFormValues,
                        weekly: text,
                      })
                    }
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="set Monthly Target"
                    placeholderTextColor={COLORS.BLACK}
                    value={targetTasbihFormValues?.monthly?.toString()}
                    onChangeText={text =>
                      setTargetTasbihFormValues({
                        ...targetTasbihFormValues,
                        monthly: text,
                      })
                    }
                  />
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => handleCancel()}
                    style={styles.editButton}>
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSaveTargets()}
                    style={styles.editButton}>
                    <Text style={styles.editButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
      </Modal>
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
  inputContainer: {
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    color: COLORS.BLACK,
  },
  notFound: {
    color: COLORS.BLACK,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 30,
  },
  quickLinkCard: {
    height: 26,
    width: 'auto',
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeQuickLinkCard: {
    backgroundColor: COLORS.PRIMARYGREEN,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linktext: {
    color: COLORS.BLACK,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  activeLinkText: {
    color: COLORS.PRIMARYWHITE,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginTop: 20,
    fontFamily: 'Poppins',
  },
  progressParent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressContainer: {
    height: 148,
    backgroundColor: COLORS.LIGHTGREEN15,
    borderRadius: 10,
    marginTop: 20,
    flexBasis: '32%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  actionParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  actionContainer: {
    height: 54,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 10,
    flexBasis: '49%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  actionContainer2: {
    height: 54,
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
    flexBasis: '49%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  actionText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  customLableStyle: {
    color: COLORS.BLACK,
    fontSize: 20,
    fontWeight: '700',
  },
  customLinkTextStyle: {
    color: COLORS.PRIMARYGREEN,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  dhikrContainer: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.LIGHTGREEN15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  dhikrText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  dhikrCountText: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  dhikrActions: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 5,
  },
  editButtonText: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 12,
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.PRIMARYRED,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: COLORS.BLACK,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.PRIMARYWHITE,
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderColor: COLORS.PRIMARYGREENSHADE2,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tasbihCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  addNewButton: {
    marginTop: 20,
    height: 50,
    width: '50%',
    maxWidth: '100%',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addNewText: {
    color: COLORS.PRIMARYWHITE,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '700',
  },
  tasbihMap: {
    marginBottom: 30,
  },
  targetType: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  targetNumber: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: COLORS.PRIMARYGREENSHADE2,
  },
  tasbihTargetSet: {
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
