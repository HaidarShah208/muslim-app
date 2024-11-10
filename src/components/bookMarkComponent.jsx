import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Chip from '../assets/icons/chip.svg' 
const Bookmark = ({ category, title, subtitle, description, imageUrl, onPress }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
     <View style={styles.bookmarkItem} >
        <View style={styles.bookmarkIcon}>
          <Chip style={{
          
            marginTop: 10,
           
          }} />

        </View>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.bookmarkImage} />
        ) : null}
        <View style={styles.bookmarkDetails}>
        
          <View style={styles.textRow}>
            {/* <Text style={styles.dot}>•</Text> */}
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.textRow}>
            {/* <Text style={styles.dot}>•</Text> */}
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          {description && (
            <View style={styles.textRow}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          )}
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'green',
  },
  categoryTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 12,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  bookmarkItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 12,
    justifyContent  : 'space-between',
    
  },
  bookmarkImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
    marginLeft: 10,

  },
  bookmarkDetails: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 0,

  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 4,
  },
  dot: {
    fontSize: 18,
    color: '#000',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',

  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});

export default Bookmark;
