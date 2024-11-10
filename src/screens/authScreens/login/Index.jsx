import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../../components/CustomTextInput';
import useLogin from './useLogin';
import Logo from '../../../assets/logo.svg';
import GoogleIcon from '../../../assets/icons/google.svg';
import {COLORS} from '../../../constants/COLORS';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    onGoogleButtonPress,
    loading,
  } = useLogin();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Logo width={46} height={93} />
        <Text style={styles.headingText}>Welcome Back!</Text>
        <CustomTextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          placeholderTextColor="black"
          style={styles.input}
          containerStyle={styles.inputContainer}
          keyboardType="email-address"
          autoCapitalize="none"
          color="black"
          placeholderFontSize={14}
          placeholderFontWeight="700"
        />
        <CustomTextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Type Your Password"
          style={styles.input}
          containerStyle={styles.inputContainer}
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="black"
          color="black"
          placeholderFontSize={14}
          placeholderFontWeight="700"
        />
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxItem}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              tintColors={{
                true: COLORS.PRIMARYGREEN,
                false: COLORS.LINGHTGREEN,
              }}
            />
            <Text style={styles.checkboxText}>Remember Me</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgetPasswordScreen')}>
            <Text
              style={styles.forgetPasswordText}
              onPress={() => {
                navigation.navigate('forgetPassword');
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          onPress={handleLogin}
          title={
            loading ? (
              <ActivityIndicator color={'white'} width={30} height={30} />
            ) : (
              'Login'
            )
          }
          style={styles.customButton}
        />
        <Text style={styles.orText}>or</Text>
        <View style={styles.GoogleContainer}>
          <TouchableOpacity onPress={onGoogleButtonPress}>
            <GoogleIcon width={36} height={36} />
          </TouchableOpacity>
        </View>
        <View style={styles.linkContainer}>
          <Text style={{color: COLORS.LINGHTGREEN}}>
            Don't have an account?
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
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
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
    marginTop: 150,
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: COLORS.LINGHTGREEN,
    fontSize: 14,
    fontWeight: '500',
  },
  forgetPasswordText: {
    color: COLORS.PRIMARYGREEN,
    fontSize: 14,
    fontWeight: '700',
  },
});
