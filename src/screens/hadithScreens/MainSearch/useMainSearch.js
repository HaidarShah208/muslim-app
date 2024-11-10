import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import sahihBukhari from '../../../constants/sahih-bukhari.json';
import sahihMuslim from '../../../constants/sahih-muslim.json';
import alTirmidhi from '../../../constants/al-tirmidhi.json';
import abuDawood from '../../../constants/al-tirmidhi.json';
import SunanNasai from '../../../constants/al-tirmidhi.json';
import ibneMajah from '../../../constants/al-tirmidhi.json';

const useMainSearch = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [book, setBook] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState(false);

  const options = ['Arabic', 'English', 'Number', 'Narrator'];
  const Books = [
 
    'sahih al-Bukhari',
    'sahih Muslim',
    'Jami at-Tirmidhi',
    'Sunan Abu-Dawood',
    'Sunan An-Nasai',
    'Sunan Ibn Majah',
  ];

  
  useEffect(() => {
    if (book =='All') { // If all books are selected
      const allData = [];

      Books.forEach(book => {
        switch (book) {
          case 'sahih al-Bukhari':
            allData.push(sahihBukhari);
            break;
          case 'sahih Muslim':
            allData.push(sahihMuslim);
            break;
          case 'Jami at-Tirmidhi':
            allData.push(jamiTirmidhi);
            break;
          case 'Sunan Abu-Dawood':
            allData.push(sunanAbuDawood);
            break;
          case 'Sunan An-Nasai':
            allData.push(SunanNasai);
            break;
          case 'Sunan Ibn Majah':
            allData.push(sunanIbnMajah);
            break;
          default:
            break;
        }
      });

      setFileContent(allData); // Combine data into one state
    }
  }, [Books]);

  useEffect(() => {
    if(book =='sahih al-Bukhari'){
      setFileContent(sahihBukhari)
    }else if(book=='sahih Muslim'){
      setFileContent(sahihMuslim)

    }else if(book=='Jami at-Tirmidhi'){
      setFileContent(alTirmidhi)

    }
    else if(book=='Sunan Abu-Dawood'){
      setFileContent(abuDawood)

    }
    else if(book=='Sunan An-Nasai'){
      setFileContent(SunanNasai)

    } else if(book=='Sunan Ibn Majah'){
      setFileContent(ibneMajah)
    }else{
    const readFileAsBinary = async filePath => {
      try {
        // Read the file as binary (base64 encoded string)
        const fileContent = await RNFS.readFile(filePath, 'base64');
        return fileContent;
      } catch (error) {
        throw new Error(`Failed to read the downloaded file: ${error.message}`);
      }
    };
    const decodeBase64 = base64String => {
      // Decode base64 to UTF-8 string
      return decodeURIComponent(escape(atob(base64String)));
    };

    const readAndParseFile = async () => {
      if (book) {
        const filePath = `${RNFS.DocumentDirectoryPath}/${book}.json`;

        try {
          const exists = await RNFS.exists(filePath);
          if (exists) {
            try {
              const fileContent = await readFileAsBinary(filePath);
              const data = decodeBase64(fileContent);
              const jsonObject = JSON.parse(data);

              //   console.log("cached Data >>>>>>>>>>>>>>>>>>>>", jsonObject)
              setFileContent(jsonObject);
              // Alert.alert('Success', 'File content parsed and saved to AsyncStorage.');
            } catch (error) {
              Alert.alert(
                'Read Error',
                "You You havn't downloaded this book Please download first",
              );
            }
          } else {
            Alert.alert(
              "You havn't downloaded this book Please download first",
            );
          }
        } catch {
          Alert.alert(
            'Error',
            `An error occurred while downloading the file: ${error.message}`,
          );
        }
      }
    };
     // readAndParseFile();
  
  }
   
  }, [book]);

const handleSearch = ()=>{
    if (!fileContent){
        Alert.alert("you have not select the book")
       
    }else if(!searchText){
        Alert.alert("you havenot provide the search text")
    }else{
        setSearch(!search)
    }
}

  return {
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
    handleSearch
  };
};

export default useMainSearch;
