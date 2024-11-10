import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LockIcon from '../../../assets/icons/lock.svg';
import GoogleIcon from '../../../assets/icons/google.svg';
import Navigator from '../../../components/Navigator';
import CustomTextInput from '../../../components/CustomTextInput';
import useForgetPassword from './useForgetPassword';
import CustomButton from '../../../components/CustomButton';
import {COLORS} from '../../../constants/COLORS';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const {email, setEmail, handleEmailChange, handleSubmit} =
    useForgetPassword();

  return (
    <View style={styles.container}>
      <Navigator />
      <View style={styles.LockContainer}>
        <LockIcon width={95} height={95} />
        <Text style={styles.headingText}>Forgot Password?</Text>
        <Text style={styles.baseText}>
          Please enter the Email associated with your account and you will
          receive a Reset Password link.
        </Text>
      </View>
      <CustomTextInput
        value={email}
        onChangeText={handleEmailChange}
        placeholder="Email"
        style={styles.input}
        containerStyle={styles.inputContainer}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={COLORS.PRIMARYGREEN}
        placeholderFontSize={14}
        placeholderFontWeight="700"
      />
      <CustomButton
        onPress={handleSubmit}
        title="Send Link"
        style={styles.customButton}
      />
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>
      <CustomButton
        onPress={() => {
          // handle Google button press
        }}
        style={styles.customButton}
        icon={<GoogleIcon width={36} height={36} />}
        title="Continue with Google"
      />
      <View style={styles.linkContainer}>
        <Text style={{color: COLORS.LINGHTGREEN}}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{color: COLORS.PRIMARYGREEN, marginLeft: 3}}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  LockContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  headingText: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 35,
    marginBottom: 30,
    color: COLORS.PRIMARYGREEN,
  },
  baseText: {
    fontSize: 15,
    color: COLORS.PRIMARYGREEN,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 24,
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
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.PRIMARYGREEN,
    marginHorizontal: 10,
  },
  orText: {
    marginHorizontal: 10,
    color: COLORS.PRIMARYGREEN,
    fontSize: 14,
    fontWeight: '700',
  },
  GoogleContainer: {
    alignItems: 'center',
  },
});
