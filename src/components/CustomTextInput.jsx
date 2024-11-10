import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const CustomTextInput = ({
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  placeholder,
  containerStyle,
  style,
  value,
  icon,
  placeholderTextColor = '#A9A9A9', // Default placeholder text color
  placeholderFontSize = 14, // Default placeholder font size
  placeholderFontWeight = 'normal', // Default placeholder font weight
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        style={[styles.textInput, style]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16, // Default font size for input text
  },
  iconContainer: {
    paddingRight: 10,
  },
});

export default CustomTextInput;
