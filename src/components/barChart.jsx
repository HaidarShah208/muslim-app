import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const BarChartComponent = ({ data, onBarClick }) => {
  return (
    <View>
      <BarChart
        data={data}
        barWidth={25}
        spacing={12}
        roundedTop
        hideRules
        roundedBottom
        yAxisThickness={0}  // Hides the Y-axis
        yAxisLabelWidth={0}  // Hides the Y-axis labels
        xAxisLabelTextStyle={{ color: 'black' ,  fontWeight:'400'}}
        xAxisThickness={0}
        renderTooltip={(item) => (
          <Text style={{ color: '#000', marginBottom: 5 , fontWeight:'500' }}>{item.value} '</Text>
        )}
        renderBarLabel={(item) => (
          <Text style={{ color: 'blue', fontSize: 12, marginTop: 4 }}>
            {item.value}
          </Text>
        )}
        onPress={(item, index) => onBarClick(index)}
      />
    </View>
  );
};

export default BarChartComponent;
