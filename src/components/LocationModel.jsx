import {
  Button,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LocationIcon from '../assets/icons/location.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {COLORS} from '../constants/COLORS';
const LocationModel = ({visible, setVisible}) => {
  const [add, setAdd] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}>
        {!add ? (
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.location}>
                <LocationIcon width={25} height={25} />
                <View style={{marginLeft: 3}}>
                  <Text style={styles.locationText1}>Use Current Location</Text>
                  <Text style={styles.locationText2}>
                    Sahiwal, Punjab, Pakistan
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.location}>
                <LocationIcon width={25} height={25} />
                <View style={{marginLeft: 3}}>
                  <Text style={styles.locationText1}>Use Current Location</Text>
                  <Text style={styles.locationText2}>Islamabad, Pakistan</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => setVisible(!visible)}
                  style={styles.save}>
                  <Text
                    style={{
                      color: COLORS.DARKGREEN,
                      fontWeight: '700',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAdd(!add)}
                  style={styles.add}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <KeyboardAvoidingView style={styles.modal}>
            <View style={styles.addModalContainer}>
              <View style={styles.header}>
                <Icon
                  name="arrow-back-circle-outline"
                  color={COLORS.DARKGREEN}
                  size={32}
                  onPress={() => setAdd(!add)}
                />
                <Text style={styles.headerText}>Add Location</Text>
                <TouchableOpacity onPress={() => setAdd(!add)}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.addLocationContainer}>
                <View style={styles.searchContainer}>
                  <Icon name="menu-outline" color="gray" size={30} />
                  <TextInput
                    placeholder="Search Location"
                    placeholderTextColor="gray"
                    style={styles.searchInput}
                  />
                </View>

                <View style={styles.previousLocations}>
                  <View style={styles.locationRow}>
                    <Icon name="time-outline" size={25} color="gray" />
                    <Text style={styles.locationText}>
                      Sahiwal, Punjab, Pakistan
                    </Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Icon name="time-outline" size={25} color="gray" />
                    <Text style={styles.locationText}>
                      Sahiwal, Punjab, Pakistan
                    </Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Icon name="time-outline" size={25} color="gray" />
                    <Text style={styles.locationText}>
                      Sahiwal, Punjab, Pakistan
                    </Text>
                  </View>
                </View>

                <Text style={styles.historyText}>More From Recent History</Text>
              </View>

              {/* Map component here */}
              <View style={styles.mapContainer}>
                {/* Add your map component */}
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Modal>
    </View>
  );
};

export default LocationModel;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
    margin: 10,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  modalContainer: {
    width: '90%',
    height: '35%',
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  location: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText1: {
    color: '#000',
    fontWeight: '700',
  },
  locationText2: {
    color: '#000',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  save: {
    borderColor: COLORS.DARKGREEN,
    borderWidth: 1,
    paddingVertical: 15,
    marginRight: 8,
    width: 130,
    borderRadius: 10,
  },
  add: {
    borderColor: COLORS.DARKGREEN,
    borderWidth: 1,
    paddingVertical: 15,
    width: 130,
    backgroundColor: COLORS.LINGHTGREEN,
    borderRadius: 10,
  },

  addModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  saveText: {
    color: COLORS.DARKGREEN,
    fontSize: 18,
    fontWeight: '700',
  },
  addLocationContainer: {
    minHeight: 150,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.DARKGREEN,
    borderRadius: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    fontSize: 18,
    flex: 1,
    paddingLeft: 10,
    color: '#000',
  },
  previousLocations: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  historyText: {
    color: COLORS.DARKGREEN,
    textAlign: 'center',
    marginVertical: 10,
  },
  mapContainer: {
    height: 300, // Adjust according to your map height
    backgroundColor: '#ccc', // Just for visibility; use your map component here
    borderRadius: 10,
  },
});
