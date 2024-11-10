import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../assets/logo.svg';
import GoogleIcon from '../../../assets/icons/google.svg';

import useSignup from './useSignup';
import {COLORS} from '../../../constants/COLORS';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    loading,
  } = useSignup();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Logo width={46} height={93} />
        <Text style={styles.headingText}>Get started</Text>

        <CustomTextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Name"
          style={styles.input}
          containerStyle={styles.inputContainer}
          keyboardType="default"
          autoCapitalize="words"
          color='black'
          placeholderTextColor='black'
          placeholderFontSize={14}
          placeholderFontWeight="700"
        />
        <CustomTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          containerStyle={styles.inputContainer}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor='black'
          color='black'
          placeholderFontSize={14}
          placeholderFontWeight="700"
        />
        <CustomTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Create Password"
          style={styles.input}
          containerStyle={styles.inputContainer}
          secureTextEntry
          autoCapitalize="none"
          color='black'
          placeholderTextColor='black'
          placeholderFontSize={14}
          placeholderFontWeight="700"
        />
        <CustomTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          style={styles.input}
          containerStyle={styles.inputContainer}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor='black'
          placeholderFontSize={14}
          placeholderFontWeight="700"
        />

        <CustomButton
          onPress={handleRegister}
          title={loading ? <ActivityIndicator color={'white'} width={30} height={30}/> : 'Sign Up'}
          style={styles.customButton}
        />

        <Text style={styles.orText}>or</Text>
        <View style={styles.GoogleContainer}>
          <TouchableOpacity>
            <GoogleIcon width={36} height={36} />
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>
          By clicking Sign Up, you agree to our terms & privacy policy
        </Text>
        <View style={styles.linkContainer}>
          <Text style={{color: COLORS.LINGHTGREEN}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: COLORS.PRIMARYGREEN, marginLeft: 3}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 35,
    marginBottom: 30,
    color: COLORS.PRIMARYGREEN,
  },
  inputContainer: {
    marginBottom: 15,
    borderColor: COLORS.PRIMARYGREEN,
    borderBottomWidth: 1,
  },
  input: {
    width: '100%',
  },
  customButton: {
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '700',
    height: 56,
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.PRIMARYGREEN,
    fontSize: 14,
    fontWeight: '700',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  GoogleContainer: {
    alignItems: 'center',
  },
});
