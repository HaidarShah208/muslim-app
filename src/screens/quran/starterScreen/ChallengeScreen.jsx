import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import RamadanChallengeCard from '../../../components/ChallengeCrd'; // Import the custom card component
import NavButton from '../../../components/navButton';
import { COLORS } from '../../../constants/COLORS';
import ramdan from '../../../assets/images/ramdan.png';


const ChallengesScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.headerTitle}>Challenges</Text>
      <Text style={styles.headerSubtitle}>Challenges that you can enter and track</Text>
      
      {/* Swiper Section */}
      <Swiper
        style={styles.wrapper}
        showsButtons={false}  // Hide default navigation buttons
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        loop={false}
        autoplay={true}
        >
        <View style={styles.slide}>
          <RamadanChallengeCard 
            title="Ramadan Challenge"
            subtitle="Recite Surah Kahf"
            progress={0.5}
            juz="2/30 Juz"
            bg={COLORS.PRIMARYGREEN}
            imageSource={ramdan} // Replace with your image path or URL
          />
        </View>
        <View style={styles.slide}>
          <RamadanChallengeCard 
            title="Another Challenge"
            subtitle="Example Subtitle"
            progress={0.2}
            juz="8/30 Juz"
            imageSource={ramdan} 
            bg={'#8E3A00'}
          />
        </View>
        <View style={styles.slide}>
          <RamadanChallengeCard 
            title="Another Challenge"
            subtitle="Example Subtitle"
            progress={0.7}
            juz="8/30 Juz"
            bg={'#182B3F'}
            imageSource={ramdan}  // Replace with your image path or URL
          />
        </View>
        {/* Add more slides as needed */}
      </Swiper>
      
      <NavButton navigationNext={()=>{
        navigation.navigate('QuranFont'); // Replace with your actual navigation logic
      }} />
      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffffff',
    // alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 30,
    color: 'black',
    textAlign: 'center',
    lineHeight: 30,

  },
  headerSubtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 25,
  },
  wrapper: {
    height: 500, // Adjust the height as needed
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#CCCCCC',
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    // padding:  10,
  },
  activeDot: {
    backgroundColor: COLORS.PRIMARYGREEN,
    width: 15,  // Increase width for active dot
    height: 15, // Increase height for active dot
    borderRadius: 15,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 2, // Add border width
    borderColor: COLORS.PRIMARYGREEN,
  
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#2CA97A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChallengesScreen;
