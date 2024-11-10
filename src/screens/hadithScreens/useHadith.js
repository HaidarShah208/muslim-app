import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNFS, { exists } from 'react-native-fs';

import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useHadith = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const[books,setBooks] = useState()
 const[bookName,setBookName] =useState([])
 const [fileExistence, setFileExistence] = useState({});
 const [isLoading,setIsLoading]=useState(false)
const [started,setStarted]=useState(false)

 const foryou = [
  {
    title: 'sahih al-Bukhari',
    books: 97,
    hadiths: 7275,
    pic: require('../../assets/hadith/bukhari.png'),
    isDownloadAble:false,
    url:
      'https://firebasestorage.googleapis.com/v0/b/muslim-application-801c3.appspot.com/o/hadithbooks%2Fsahih-bukhari.json?alt=media&token=a1acaa53-50db-4b39-9834-db0a60751616',
 
    },
  {
    title: 'sahih Muslim',
    books: 54,
    hadiths: 7563,
    pic: require('../../assets/hadith/muslim.png'),
    isDownloadAble:false,
    url:'https://firebasestorage.googleapis.com/v0/b/muslim-application-801c3.appspot.com/o/hadithbooks%2Fsahih-muslim.json?alt=media&token=0508fe16-209c-4973-bc8c-ce580f1c9165'
  },
  {
    title: 'Jami at-Tirmidhi',
    books: 48,
    hadiths: 3956,
    isDownloadAble:false,
    pic: require('../../assets/hadith/tarmidhi.png'),
    url:'https://firebasestorage.googleapis.com/v0/b/muslim-application-801c3.appspot.com/o/hadithbooks%2Fal-tirmidhi.json?alt=media&token=ef345070-c287-4d59-a829-860f2d518654'
  },
  {
    title: 'Sunan Abu-Dawood',
    books: 43,
    hadiths: 5274,
    isDownloadAble:false,
    pic: require('../../assets/hadith/dawood.png'),
    url:'https://firebasestorage.googleapis.com/v0/b/muslim-application-801c3.appspot.com/o/hadithbooks%2Fabu-dawood.json?alt=media&token=16494378-08f6-4100-ae16-d9616e958f91'
  },
  {
    title: 'Sunan An-Nasai',
    books: 51,
    hadiths: 5760,
    isDownloadAble:false,
    pic: require('../../assets/hadith/nasai.png'),
    url:'https://firebasestorage.googleapis.com/v0/b/muslim-application-801c3.appspot.com/o/hadithbooks%2Fsunan-nasai.json?alt=media&token=25597d1d-4c22-442d-95e4-dcac557536ee'
  },
  {
    title: 'Sunan Ibn Majah',
    books: 37,
    hadiths: 4341,
    isDownloadAble:false,
    pic: require('../../assets/hadith/majah.png'),
    url:'https://firebasestorage.googleapis.com/v0/b/muslim-application-801c3.appspot.com/o/hadithbooks%2Fibn-e-majah.json?alt=media&token=0b3fce2e-d1a0-45ec-95e3-b35d89ad14ff'
  },
];
  useEffect(() => {
  setBooks(foryou)
  }, [])

 
  const checkFileExistence = async (title) => {
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${title}.json`;
    try {
      const exists = await RNFS.exists(localFilePath);
      const savedState = await AsyncStorage.getItem(`fileState_${title}`);
      const isSaved = savedState === 'true'; // Retrieve saved state from AsyncStorage
  
      console.log(`Checking existence for ${localFilePath}: ${exists}, Saved State: ${savedState}`);
      return exists && isSaved;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  };
  
  useEffect(() => {
    const checkAllFiles = async () => {
      const existence = {};
      for (const book of books) {
        existence[book.title] = await checkFileExistence(book.title);
      }   
      setFileExistence(existence);
      setIsLoading(false); // Set loading state to false after all checks are complete
    };
    if (books?.length > 0) { // Only run if books array is not empty
      checkAllFiles();
    }
    console.log("Loading files existence check...");
    setDownloadProgress(0); // Reset download progress
  }, [books,isLoading]);
  
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState.match(/inactive/)) {
        // App is in background or closed, handle file cleanup or save state
        console.log('App in background or closed. Saving state...');
        await AsyncStorage.setItem('fileExistence', JSON.stringify(fileExistence));
        await AsyncStorage.setItem('isLoading', JSON.stringify(isLoading));
        await AsyncStorage.setItem('downloadProgress', JSON.stringify(downloadProgress));
      }
    };
  
   const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup function to remove the event listener
    return () => {
      appStateSubscription.remove();
    };
  }, [fileExistence, isLoading, downloadProgress]);
  
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedFileExistence = await AsyncStorage.getItem('fileExistence');
        const savedIsLoading = await AsyncStorage.getItem('isLoading');
        // const savedDownloadProgress = await AsyncStorage.getItem('downloadProgress');
  
        if (savedFileExistence) {
          setFileExistence(JSON.parse(savedFileExistence));
        }
        if (savedIsLoading) {
          setIsLoading(JSON.parse(savedIsLoading));
        }
       
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };
  
    loadSavedState();
  }, []);
  
  const downloadAndSaveFile = async (fileUrl, title) => {
    setBookName(title);
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${title}.json`;
    let downloadProgress = 0;
    let downloadCompleted = false;
  
    try {
      const exists = await RNFS.exists(localFilePath);
  
      if (!exists) {
        const downloadOptions = {
          fromUrl: fileUrl,
          toFile: localFilePath,
          begin: (res) => {
            console.log('Download started:', res);
          },
          progress: (res) => {
            downloadProgress = (res.bytesWritten / res.contentLength) * 100;
            setDownloadProgress(Math.floor(downloadProgress));
            setStarted(true)
            console.log(`Download Progress: ${Math.floor(downloadProgress)}%`);
          },
          background: true,
        };
  
        const ret = RNFS.downloadFile(downloadOptions);
        const result = await ret.promise;
  
        if (result.statusCode === 200) {
          if (downloadProgress >= 99) {
            const fileStat = await RNFS.stat(localFilePath);
            if (fileStat.size > 0) {
              downloadCompleted = true;
              Alert.alert('Success', 'File downloaded and saved successfully!');
              console.log('File downloaded to:', localFilePath);
              setIsLoading(true);
              setStarted(false)
              await AsyncStorage.setItem(`fileState_${title}`, 'true'); // Mark file as downloaded
            } else {
              await RNFS.unlink(localFilePath);
              Alert.alert('Error', 'File downloaded but has zero size. Download might be incomplete.');
              await AsyncStorage.removeItem(`fileState_${title}`); // Remove file state
            }
          } else {
            await RNFS.unlink(localFilePath);
            Alert.alert('Error', 'File not fully downloaded. Download progress was less than 99%');
            await AsyncStorage.removeItem(`fileState_${title}`); // Remove file state
          }
        } else {
          Alert.alert('Error', `Failed to download file. Status code: ${result.statusCode}`);
          await AsyncStorage.removeItem(`fileState_${title}`); // Remove file state
        }
      } else {
        // Alert.alert('');
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred while downloading the file: ${error.message}`);
      await AsyncStorage.removeItem(`fileState_${title}`); // Remove file state
    } finally {
      if (!downloadCompleted && await RNFS.exists(localFilePath)) {
        await RNFS.unlink(localFilePath);
        Alert.alert('Removing partially downloaded file and  Downloading it again');
        await AsyncStorage.removeItem(`fileState_${title}`); // Remove file state
        downloadAndSaveFile(fileUrl, title);
      }
    }
  };
   const removeBook = async (title)=>{
    try{

    
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${title}.json`;
    if (await RNFS.exists(localFilePath)) {
      await RNFS.unlink(localFilePath);
      Alert.alert('Removing the file');
      await AsyncStorage.removeItem(`fileState_${title}`); // Remove file state
      setIsLoading(true)
    }
    }catch(error){
      Alert.alert('Error', `An error occurred while downloading the file: ${error.message}`);
    }
   }

  return {
    downloadAndSaveFile,downloadProgress,books,bookName,fileExistence,started,removeBook
  }
}

export default useHadith

const styles = StyleSheet.create({})