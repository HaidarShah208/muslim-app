import React from 'react';
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/COLORS';
import SearchIcon from '../assets/icons/search.svg';


const SearchModal = ({ visible, onClose, onSearch }) => {
    if (!visible) return null;
  return (
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
         <View style={styles.searchInputContainer}>
            <SearchIcon width={20} height={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search surah..."
              placeholderTextColor={COLORS.DARKGREEN}
              onChangeText={onSearch}
              autoFocus={true}
            />
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        
      </View>
  );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255,1)',
        zIndex: 1000,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
 
      modalContent: {
        backgroundColor: COLORS.WHITE,
        paddingBottom: 10,
        borderRadius: 130,
        width: '90%',
        marginTop: 20, 

      },
      searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.LIGHTGRAY,
        borderRadius: 5,
        paddingHorizontal: 10,
      },
      searchIcon: {
        marginRight: 10,
      },
      searchInput: {
        flex: 1,
        padding: 10,
        color:COLORS.DARKGREEN
      },
      closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.PRIMARYGREENSHADE2,
        borderRadius: 5,
        alignItems: 'center',
      },
      closeButtonText: {
        color: COLORS.WHITE,
        fontSize: 16,
      },
});

export default SearchModal;