import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../store/slices/authSlice';
import moment from 'moment';
import {fetchTime} from '../../store/slices/TimeSlice';

const usePaymentPlanScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);
  const time = useSelector(state => state?.time?.time);
  useEffect(() => {
    dispatch(fetchTime());
  }, []);
  const navigation = useNavigation();
  const plans = [
    {
      id: 'lifetime',
      title: 'Lifetime',
      description: 'One Time for Unlimited Use',
      price: 195,
      buttonLabel: 'Get App',
    },
    {
      id: 'monthly',
      title: 'Monthly',
      description: 'Pay Monthly',
      price: 4.99,
      buttonLabel: 'Get App',
    },
    {
      id: 'free',
      title: 'I Can’t Afford It',
      description: 'Free',
      price: 0.0,
      buttonLabel: 'Get App',
    },
  ];

  const handleSelectPlan = planId => {
    setSelectedPlan(planId);
  };
  const handleFree = async () => {
    try {
      if (!time) {
        return;
      }
      const startDate = moment(time).toDate();
      const expiryDate = new Date(startDate);
      expiryDate.setDate(startDate.getDate() + 15);

      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDocRef = firestore().collection('users').doc(currentUser.uid);
        const updatedData = {
          PlanType: selectedPlan,
          startDate: firestore.Timestamp.fromDate(startDate),
          expiryDate: firestore.Timestamp.fromDate(expiryDate),
        };
        await userDocRef.update(updatedData);
        const updatedUser = {
          ...user,
          PlanType: selectedPlan,
          startDate: firestore.Timestamp.fromDate(startDate),
          expiryDate: firestore.Timestamp.fromDate(expiryDate),
        };
        dispatch(setUser(updatedUser));

        Alert.alert('User data updated successfully');
        setWarningModalVisible(false);
      } else {
        console.log('No user is currently signed in');
      }
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };

  const handleConfirmClick = () => {
    setModalVisible(false);
    setWarningModalVisible(true);
  };
  const getBackgroundColor = index => {
    const colors = [COLORS.PRIMARYGREEN, '#d5df63', 'white'];
    return colors[index % colors.length];
  };
  const getTextColor = index => {
    const textColors = ['white', '#333333', 'green'];
    return textColors[index % textColors.length];
  };

  const handleGetAppButtonClick = () => {
    if (selectedPlan === 'free') {
      setModalVisible(true);
    } else {
      navigation.navigate('PaymentScreen', {
        plan: plans.find(plan => plan.id === selectedPlan).price,
        planTitle: plans.find(plan => plan.id === selectedPlan).title,
      });
    }
  };

  return {
    selectedPlan,
    setSelectedPlan,
    isModalVisible,
    setModalVisible,
    isWarningModalVisible,
    setWarningModalVisible,
    user,
    time,
    plans,
    handleSelectPlan,
    handleFree,
    handleConfirmClick,
    getBackgroundColor,
    getTextColor,
    handleGetAppButtonClick,
  };
};
export default usePaymentPlanScreen;
