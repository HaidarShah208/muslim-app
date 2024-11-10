import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const CustomButton = ({onPress, title, style, titleStyle, icon, children}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {children}
      {title && <Text style={[styles.buttonText, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
