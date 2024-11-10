// CircularProgressComponent.js
import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLORS } from '../constants/COLORS';

const CircularProgressComponent = ({ fillValue, maxValue }) => {
  const percentage = (fillValue / maxValue) * 100;

  return (
    <View style={{ alignItems: 'center' }}>
      <AnimatedCircularProgress
        size={150}
        width={15}
        fill={percentage}
        tintColor={COLORS.PRIMARYGREEN}
        backgroundColor="#EDEDED"
        rotation={0} // To start the progress from the top
        lineCap="round"
      >
        {() => (
          <React.Fragment>
            <Text style={{ fontWeight: '800', color: COLORS.PRIMARYGREEN , fontSize: 25, }}>{fillValue}</Text>
            <Text style={{ fontSize: 12, color: 'black', textAlign: 'center',  }}>
              books read from your list
            </Text>
          </React.Fragment>
        )}
      </AnimatedCircularProgress>
    
    </View>
  );
};

export default CircularProgressComponent;
