import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../store/slices/authSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {googleLoginUser} from '../../../store/slices/authSlice';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '602313098761-gmltt1q5vgdg4c2198p9sh20efs8nfek.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    dispatch(googleLoginUser());
  }

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = password => {
    return password.length >= 8;
  };

  const handleEmailChange = email => {
    setEmail(email);
  };

  const handlePasswordChange = password => {
    setPassword(password);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    await dispatch(loginUser({email, password}));
    setLoading(false);
  };

  return {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    onGoogleButtonPress,
    loading,
  };
};

export default useLogin;
