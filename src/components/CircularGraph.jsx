import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {COLORS} from '../constants/COLORS';

// Get the device screen width for responsive design
const screenWidth = Dimensions.get('window').width;

const CircularGraph = ({
  target,
  progress,
  backgroundColor,
  progressColor,
  showPercentageSign,
  
}) => {
  // Calculate the percentage progress
  const progressPercent = (progress / target) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={screenWidth / 4} // Size of the circle
        width={8} // Stroke width of the progress circle
        fill={progressPercent} // Progress percentage
        tintColor={progressColor} // Progress circle color
        backgroundColor={backgroundColor} // Background circle color
        rotation={0} // To start the progress from the top
        lineCap="round" // Round the ends of the progress circle
      >
        {fill => (
          <Text style={styles.progressText}>
            {Math.round(progressPercent)}
            {showPercentageSign ? '%' : ''}
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

// Styles for the CircularGraph component
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});

export default CircularGraph;
