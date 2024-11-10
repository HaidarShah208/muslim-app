import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import { Alert, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';

const useForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handleSubmit = async () => {
    try {
      if (!email) {
        Alert.alert('Please enter your email address');
        return;
      }
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password reset email sent!');
      navigation.goBack();
    } catch (error) {
      let errorMessage =
        'An error occurred while sending the password reset email. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'That email address is not registered!';
      }
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      console.error(error);
    }
  };

  return {
    email,
    setEmail,
    handleEmailChange,
    handleSubmit,
  };
};

export default useForgetPassword;
