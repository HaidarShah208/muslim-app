import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';  // Importing the progress library

const RamadanChallengeCard = ({ title, subtitle, progress, juz, imageSource , bg}) => {
  return (
    <View style={[styles.card, {backgroundColor:bg}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={progress}
          width={230}
          color="white"
          unfilledColor="#000000"
          borderWidth={0}
          borderRadius={25}
          height={10}
       
        />
        <View style={styles.progressTextContainer}>
          <Text style={styles.juzText}>{juz}</Text>
          <Text style={styles.percentageText}>{`${(progress * 100).toFixed(0)}%`}</Text>
        </View>
      </View>
      
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor:'',   // Green background color
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: 280,
    height : 280
    
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign:'left'
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
     textAlign:'justify'
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 5,
  },
  juzText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  image: {
    // marginTop: 10,
    width: 200, // Adjust the size as needed
    height: 180,
    resizeMode: 'cover',
    position: 'absolute',
    bottom:-60,
    borderRadius: 100,
    alignSelf: 'center',
    marginHorizontal :'auto'

 },
});

export default RamadanChallengeCard;
