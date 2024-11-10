import React, {useEffect, useRef, useState} from 'react';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {COLORS} from '../../constants/COLORS';
import CustomButton from '../../components/CustomButton';

const PaymentScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {plan, planTitle} = route.params;

  const handleCheckout = () => {
    navigation.navigate('Checkout', {plan, planTitle});
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '500'}}>
          My Cart
        </Text>
        <View
          style={{
            marginTop: 51,
            width: 223,
            height: 270,
            borderWidth: 3,
            borderColor: COLORS.PRIMARYGREEN,
            alignSelf: 'center',
            borderRadius: 16,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: COLORS.PRIMARYGREEN,
              top: -14,
              borderRadius: 50,
            }}>
            <Text style={{color: 'white', padding: 7}}>Best Value</Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 43,
              color: COLORS.BLACK,
            }}>{`${planTitle}`}</Text>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              fontWeight: 'bold',
              color: COLORS.BLACK,
            }}>{`Pay ${planTitle}`}</Text>
          <Text
            style={{
              fontSize: 57,
              textAlign: 'center',
              fontWeight: 'bold',
              color: COLORS.BLACK,
            }}>{`$${plan}`}</Text>
        </View>
        <View style={{marginTop: 60}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: COLORS.BLACK}}>Order Subtotal</Text>
            <Text style={{color: COLORS.BLACK}}>${plan}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: COLORS.BLACK}}>Discount</Text>
            <Text style={{color: COLORS.BLACK}}>$0</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#C7C7C7',
              marginVertical: 10,
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 26, fontWeight: '600', color: COLORS.BLACK}}>
              Total
            </Text>
            <Text
              style={{fontSize: 26, fontWeight: '600', color: COLORS.BLACK}}>
              ${plan}
            </Text>
          </View>
        </View>
        <CustomButton
          onPress={handleCheckout}
          title="Complete Payment"
          style={styles.customButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  customButton: {
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    fontSize: 14,
    fontWeight: '700',
    height: 56,
  },
});

export default PaymentScreen;
