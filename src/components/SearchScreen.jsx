import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState,useCallback} from 'react';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';

const Index = ({searchText,setsetSearchText,setSearch,data,selectedOption}) => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [filteredData, setFilteredData] = useState(null);
  const handleSearch = useCallback(
    (text) => {
      setSearchQuery(text);
      if (text === '') {
        setFilteredData(null);
        setsetSearchText('');
        return;
      }
    },
    [setsetSearchText]
  );
let key = ''
  
  useEffect(() => {
    if (searchQuery !== '') {
      if(selectedOption=='Narrator'){
        key = `english${selectedOption}`
      }else{
        key = `hadith${selectedOption}`
      }
      console.log(key)
      const filterHadiths = () => {
        const filtered = data?.hadiths?.data
          .filter((item) => {
            
          
            if (typeof item.hadithEnglish === 'string') {
              if(selectedOption=='Number'){
                return item[key] == searchQuery
              }else if(item.englishNarrator && selectedOption=='Narrator' ){
                return item[key].toLowerCase().includes(searchQuery.toLowerCase()) 
              }
              else{
                return item[key]?.toLowerCase().includes(searchQuery.toLowerCase()) 
              }
            } else {
              return false;
            }
          })
          .map((item) => ({
            ...item,
            highlightedText: item[key].replace(
              new RegExp(searchQuery, 'gi'),
              (match) => `***${match}***`
            ),
          }));
        setFilteredData(filtered);
      };
      filterHadiths();
    } else {
      setFilteredData(null);
    }
  }, [searchQuery, data]);


  const renderItem = ({item}) => {
    let matchIndex
    // Find the index of the matched word in the original text
    if(selectedOption=="Narrator"){
       matchIndex = item.englishNarrator.toLowerCase()
      .indexOf(searchQuery.toLowerCase())
    }
     matchIndex = item.hadithEnglish.toLowerCase()
      .indexOf(searchQuery.toLowerCase()) ||
      item.hadithArabic.indexOf(searchQuery) ||
      item.hadithNumber.indexOf(searchQuery)
      ;

    let highlightedText = '';

    // If the match is found
    if (matchIndex !== -1 ) {
      // Extract the substring starting from the matched word
      highlightedText = item.hadithEnglish.substring(matchIndex);
    }

    return (
  
      <TouchableOpacity onPress={()=>navigation.navigate('readMore',{data:item,allData:filteredData})} style={{padding: 10}}>
        <Text
          style={{fontWeight: 'bold', fontSize: 16, color: COLORS.BLACK}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {highlightedText
            .split(new RegExp(`(${searchQuery})`, 'gi'))
            .map((part, index) =>
              part.toLowerCase() == searchQuery.toLowerCase() ? (
                <Text
                  key={index}
                  style={{
                    backgroundColor: COLORS.PRIMARYGREENSHADE2,
                    color: COLORS.WHITE,
                  }}>
                  {part}
                </Text>
              ) : (
                part
              ),
            )}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: COLORS.BLACK, fontSize: 14}}>_________ </Text>
          </View>
          <Text style={{color: COLORS.BLACK, fontSize: 14, fontWeight: '600'}}>
            {item.bookSlug}:{item.hadithNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="arrow-back-circle-outline"
            size={32}
            color={COLORS.PRIMARYGREENSHADE2}
          />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>{filteredData?.length} Hadees Found</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <IonIcon
              name="list-outline"
              size={32}
              color={COLORS.PRIMARYGREENSHADE2}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: COLORS.BLACK}}>search in Hadiths</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon3
                name="close"
                size={32}
                color={COLORS.PRIMARYGREENSHADE2}
                style={{marginRight: 10}}
              />
              <Icon2
                name="search"
                size={32}
                color={COLORS.PRIMARYGREENSHADE2}
                style={{marginRight: 10}}
              />
            </View>
          </View>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={COLORS.BLACK}
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            style={{
              width: '35%',
              height: 50,
              borderRadius: 10,
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.PRIMARYGREENSHADE2,
            }}>
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Similar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '35%',
              height: 50,
              borderRadius: 10,
              backgroundColor: COLORS.PRIMARYGREENSHADE2,
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Exact
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
    
      />
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
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 10,
  },
  headerTitle: {
    gap: 8,
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    color: COLORS.DARKGREEN,
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  searchBox: {
    backgroundColor: COLORS.BACKGROUND,
    width: '80%',
    height: 100, // Set a fixed height for the container
    borderRadius: 20,
    justifyContent: 'center', // Center the text input vertically
    paddingHorizontal: 10,
  },
  textInput: {
    color: 'black',
    fontSize: 14,
    height: '50%', // Make sure the text input takes full height of its container
    borderBottomWidth: 1,
  },
  Card: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  Hadith: {
    color:COLORS.BLACK,
    fontSize: 16,
    fontWeight: '500',
    maxWidth: '100%',
    overflow: 'hidden',
  },
});
