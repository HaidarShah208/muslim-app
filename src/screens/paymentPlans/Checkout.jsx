import React, {useEffect, useRef, useState} from 'react';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../store/slices/authSlice';
import {COLORS} from '../../constants/COLORS';
import CustomButton from '../../components/CustomButton';
import {fetchTime} from '../../store/slices/TimeSlice';
import moment from 'moment';

const Checkout = ({navigation, route}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);
  const [planType, setPlanType] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const cardFieldRef = useRef(null);
  const {confirmPayment} = useConfirmPayment();
  const {plan, planTitle} = route.params;
  const amountInCents = Math.round(plan * 100);
  const time = useSelector(state => state?.time?.time);

  useEffect(() => {
    dispatch(fetchTime());
  }, []);

  useEffect(() => {
    const updateUserPlan = async () => {
      if (!planType) return;
      try {
        if (!time) {
          return;
        }
        const currentUser = auth().currentUser;
        if (currentUser) {
          const startDate = moment(time).toDate();
          const expiryDate = new Date(startDate);
          if (planType === 'monthly') {
            expiryDate.setMonth(startDate.getMonth() + 1);
          } else if (planType === 'yearly') {
            expiryDate.setFullYear(startDate.getFullYear() + 1);
          }
          const userDocRef = firestore()
            .collection('users')
            .doc(currentUser.uid);
          const updatedData = {
            PlanType: planType,
            startDate: firestore.Timestamp.fromDate(startDate),
            expiryDate: firestore.Timestamp.fromDate(expiryDate),
          };
          await userDocRef.update(updatedData);
          const updatedUser = {
            ...user,
            PlanType: planType,
            startDate: firestore.Timestamp.fromDate(startDate),
            expiryDate: firestore.Timestamp.fromDate(expiryDate),
          };
          dispatch(setUser(updatedUser));
          Alert.alert('Success', 'Your plan has been updated.');
          navigation.navigate('Main');
        } else {
          console.log('No user is currently signed in');
        }
      } catch (error) {
        console.error('Error updating user data: ', error);
      }
    };
    updateUserPlan();
  }, [planType]);

  const handlePayPress = async () => {
    setLoading(true);
    const billingDetails = {
      name: auth().currentUser?.displayName || 'User',
      email: auth().currentUser?.email || 'email@example.com',
    };
    try {
      const response = await fetch(
        'https://muslim-app-admin.vercel.app/api/stripe',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({amount: amountInCents, currency: 'usd'}),
        },
      );

      const {clientSecret} = await response.json();
      if (!clientSecret) throw new Error('Failed to retrieve client secret.');

      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          card: cardFieldRef.current,
          billingDetails,
        },
      });

      if (error) {
        Alert.alert('Payment Error', error.message);
        console.log('Payment confirmation error', error);
      } else {
        Alert.alert('Payment Successful', `Payment succeeded`);
        setPlanType(paymentIntent?.amount === 19500 ? 'yearly' : 'monthly');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
      console.log('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={styles.title}>{planTitle || 'Select Your Plan'}</Text>
        <Text style={styles.instructions}>
          Please enter your card details below. Your card number is typically
          found on the front of your card, while the CVV is a 3-digit code on
          the back.
        </Text>
        <CardField
          ref={cardFieldRef}
          placeholder={{number: '4242 4242 4242 4242'}}
          cardStyle={styles.cardField}
          style={styles.cardFieldContainer}
        />
        <CustomButton
          onPress={handlePayPress}
          title={
            loading ? <ActivityIndicator color={'white'} size={30} /> : 'Pay'
          }
          style={styles.customButton}
        />
        <TouchableOpacity onPress={handleShowModal} style={styles.helpButton}>
          <Text style={styles.helpText}>Need help with card details?</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                How to find your card details
              </Text>
              <Text style={styles.modalText}>
                1. **Card Number**: This is the long number on the front of your
                card.
                {'\n'}2. **Card CVV**: This is the 3-digit number on the back of
                your card, typically found near the signature strip.
                {'\n'}3. **Expiration Date**: This is the date when your card
                expires, usually found on the front of your card.
              </Text>
              <Image
                source={require('../../assets/images/cardfront.png')}
                style={styles.modalImage}
              />
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardField: {
    backgroundColor: 'white',
    textColor: 'black',
    borderWidth: 2,
    borderColor: '#004d40',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Courier New',
    placeholderColor: 'black',
    placeholderFontSize: 14,
  },
  cardFieldContainer: {
    width: '100%',
    height: 110,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  helpButton: {
    marginTop: 20,
  },
  helpText: {
    color: COLORS.PRIMARYGREEN,
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 250,
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  closeButton: {
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Checkout;
