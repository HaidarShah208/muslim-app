import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/COLORS';
import Star from '../../../assets/hadith/Star.svg';
import Dot from '../../../assets/hadith/Dot.svg';
import SelectDropdown from 'react-native-select-dropdown';
import useMainSearch from './useMainSearch';
import SearchScreen from '../../../components/SearchScreen';
const Index = ({navigation}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false); // State to track keyboard visibility

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Set state to true when keyboard is shown
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Set state to false when keyboard is hidden
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const {
    options,
    Books,
    setSelectedOption,
    selectedOption,
    fileContent,
    book,
    setBook,
    searchText,
    setSearchText,
    search,
    setSearch,
    handleSearch,
  } = useMainSearch();

  if (search) {
    return (
      <SearchScreen
        searchText={searchText}
        setsetSearchText={setSearchText}
        setSearch={setSearch}
        data={fileContent}
        selectedOption={selectedOption}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="arrow-back-circle-outline"
            size={40}
            color={COLORS.PRIMARYGREENSHADE2}
          />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Search</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 30}}>
        <Text style={{color: COLORS.BLACK, fontSize: 30,fontFamily:'Poppins'}}>
          Explore Hadith Insights
          <View style={{marginLeft: 5}}>
            <Star width={25} height={25} />
          </View>
        </Text>
      </View>
      <View
        style={[styles.searchContainer, keyboardVisible && {height: '72%'}]}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={COLORS.BLACK}
            placeholder="Search..."
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity>
            <Text style={{color: COLORS.BLACK}}></Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <View
            style={{
              width: '50%',
              height: '100%',
              borderRadius: 10,
              backgroundColor: COLORS.WHITE,
              marginLeft: 10,
              padding: 10,
            }}>
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 15,
                fontWeight: '600',
                marginLeft: 5,
              }}>
              Discover in
            </Text>
            {options.map(item => (
              <TouchableOpacity
                key={item}
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.PRIMARYGREENSHADE2,
                  padding: 5,
                  borderRadius: 10,
                  marginTop: 5,
                  backgroundColor:
                    selectedOption == item ? COLORS.PRIMARYGREENSHADE2 : COLORS.WHITE,
                }}
                onPress={() => setSelectedOption(item)}>
                <Text
                  style={{
                    color: selectedOption == item ? COLORS.WHITE : COLORS.BLACK,
                    fontSize: 15,
                    fontWeight: '600',
                    marginLeft: 5,
                    textAlign: 'center',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={{
              width: '45%',
              height: 50,
              borderRadius: 10,
              backgroundColor: COLORS.WHITE,
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <SelectDropdown
              data={Books}
              onSelect={(selectedItem, index) => {
                setBook(selectedItem);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    {selectedItem && (
                      <Icon
                        name={selectedItem.icon}
                        style={styles.dropdownButtonIconStyle}
                      />
                    )}
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem) || 'Select Book'}
                    </Text>
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      style={styles.dropdownButtonArrowStyle}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && {backgroundColor: '#D2D9DF'}),
                    }}>
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
              defaultValue={selectedOption}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleSearch()}
          style={{
            width: '60%',
            height: 50,
            borderRadius: 15,
            backgroundColor: COLORS.PRIMARYGREENSHADE2,
            justifyContent: 'center',
            marginHorizontal: 'auto',
          }}>
          <Text
            style={{
              color:COLORS.WHITE,
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      {!keyboardVisible && (
        <KeyboardAvoidingView style={styles.description}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 7, marginRight: 5}}>
              <Dot />
            </View>
            <Text
              style={{
                color: COLORS.BLACK,
                marginBottom: 5,
                fontWeight: '400',
                fontSize: 15,
                fontFamily:'Poppins'
              }}>
              To search for any topic, type the words and press the search
              button.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 7, marginRight: 5}}>
              <Dot />
            </View>
            <Text
              style={{
                color: COLORS.BLACK,
                marginBottom: 5,
                fontWeight: '400',
                fontSize: 15,
                fontFamily:'Poppins'

              }}>
              Search for multiple words for same content, Separate the words
              with (space) and press search. Example: “Prayers Patiences{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 7, marginRight: 5}}>
              <Dot />
            </View>
            <Text style={{color: COLORS.BLACK, fontWeight: '400', fontSize: 15, fontFamily:'Poppins'}}>
              {' '}
              For Matching the whole phrase, type the phrase inside the
              quotation(“”). Example: “Faith in Allah”
            </Text>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  headerTitle: {
    marginLeft: -30,
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    color: COLORS.DARKGREEN,
    fontSize: 22,
    fontWeight: '600',
    fontFamily:'Poppins'
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    borderRadius: 20,
    marginTop: 5,
    width: '95%',
    height: '49%',
    backgroundColor: COLORS.BACKGROUND,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: 50, // Set a fixed height for the container
    borderRadius: 20,
    justifyContent: 'space-between', // Center the text input vertically
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  textInput: {
    color: 'black',
    fontSize: 14,
    height: '100%', // Make sure the text input takes full height of its container
    width: '85%',
  },
  description: {
    marginTop: 10,
    backgroundColor: COLORS.BACKGROUND,
  
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    marginBottom: 30,
  },

  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: COLORS.BLACK,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
