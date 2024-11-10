import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PDF from 'react-native-pdf';
import { PDFDocument } from 'pdf-lib';

const PDFViewer = ({ pdfUri, onTextExtracted }) => {
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const extractText = async () => {
      try {
        const response = await fetch(pdfUri);
        const arrayBuffer = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        let fullText = '';

        const pages = pdfDoc.getPages();
        for (const page of pages) {
          const text = await page.getTextContent();
          fullText += text.items.map(item => item.str).join(' ');
        }

        onTextExtracted(fullText);
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    extractText();
  }, [pdfUri, onTextExtracted]);

  return (
    <View style={styles.container}>
      {!loading && (
        <PDF
        trustAllCerts={false}
          source={{ uri: pdfUri }}
          spacing={0}
          // enablePaging={true}
          style={styles.pdf}
          onError={(error) => {
            console.log(error);
          }}  
        />
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFViewer;
