import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CheckBox = ({title, style}) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={style}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: isChecked ? 'green' : 'gray',
            marginRight: 10,
          }}>
          {isChecked && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  backgroundColor: 'green',
                }}
              />
            </View>
          )}
        </View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
