import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import sahihBukhari from '../../../constants/sahih-bukhari.json';
import sahihMuslim from '../../../constants/sahih-muslim.json';
import alTirmidhi from '../../../constants/al-tirmidhi.json';
import abuDawood from '../../../constants/abu-dawood.json';
import SunanNasai from '../../../constants/sunan-nasai.json';
import ibneMajah from '../../../constants/ibn-e-majah.json';
import RNFS, {exists} from 'react-native-fs';

const useChapter = ({title}) => {
    const [fileContentCache, setFileContentCache] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredChapters, setFilteredChapters] = useState(null);
    const [isSearch, setIsSearch] = useState(false);

console.log("chapter screen",title)
    useEffect(() => {
        if(title =='sahih al-Bukhari'){
          setFileContentCache(sahihBukhari)
        }else if(title=='sahih Muslim'){
          setFileContentCache(sahihMuslim)
    
        }else if(title=='Jami at-Tirmidhi'){
          setFileContentCache(alTirmidhi)
    
        }
        else if(title=='Sunan Abu-Dawood'){
          setFileContentCache(abuDawood)
    
        }
        else if(title=='Sunan An-Nasai'){
          setFileContentCache(SunanNasai)
    
        } else if(title=='Sunan Ibn Majah'){
          setFileContentCache(ibneMajah)
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
          const filePath = `${RNFS.DocumentDirectoryPath}/${title}.json`;
    
          if (fileContentCache !== null) {
            return;
          }
    
          if (filePath) {
            try {
              const fileContent = await readFileAsBinary(filePath);
              const data = decodeBase64(fileContent);
              const jsonObject = JSON.parse(data);
    
              setFileContentCache(jsonObject);
            } catch (error) {
              console.error(
                'Read Error',
                `Failed to process the downloaded file: ${error.message}`,
              );
            }
          } else {
            Alert.alert('File Not Found', 'No file has been downloaded yet.');
          }
        };
      }
        if (searchQuery == '') {
          // readAndParseFile();
          setFilteredChapters(null);
        }
      }, [searchQuery]);

      const handleSearch = text => {
        setSearchQuery(text);
        filterChapters(text);
      };
    
      const filterChapters = text => {
        const filtered = fileContentCache?.hadiths?.chapters?.filter(item => {
          return (
            item.chapterEnglish.toLowerCase().includes(text.toLowerCase()) ||
            item.chapterNumber.includes(text)
          );
        });
        setFilteredChapters(filtered);
      };

  return {
    handleSearch,fileContentCache,setSearchQuery,filteredChapters,searchQuery, setSearchQuery,isSearch, setIsSearch
  }
}

export default useChapter