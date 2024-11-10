import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PDFViewer from '../../components/pdfViewer';
import AudioPlayer from '../../components/tts';
import { COLORS } from '../../constants/COLORS';

const BookScreen = () => {
  const pdfUri = 'https://pdfobject.com/pdf/sample.pdf'; 
  const [text, setText] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const handleTextExtracted = (text) => {
    setSelectedText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sahih Al-Bukhari</Text>
        <Text style={styles.chapter}>Chapter 2</Text>
      </View>
      <PDFViewer pdfUri={pdfUri} onTextExtracted={handleTextExtracted} />
      <AudioPlayer text={selectedText} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARYGREEN,
  },
  chapter: {
    fontSize: 16,
    color: '#718096',
  },
});

export default BookScreen;
