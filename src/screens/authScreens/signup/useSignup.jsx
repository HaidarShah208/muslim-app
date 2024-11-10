// useSignup.js
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../store/slices/authSlice';
import {ToastAndroid} from 'react-native';

const useSignup = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!displayName || !email || !password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    await dispatch(registerUser({displayName, email, password}));
    setLoading(false);
  };

  return {
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    loading,
  };
};

export default useSignup;
