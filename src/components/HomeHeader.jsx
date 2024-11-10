import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {COLORS} from '../constants/COLORS';
import BellIcon from '../assets/icons/bell.svg';
import {
  fetchUserProfile,
  updateUserProfile,
} from '../store/slices/userSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const {photoURL, displayName, email, status, error} = useSelector(
    state => state?.user,
  );
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user);
  const fetchProfile = useCallback(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile]),
  );

  // const formattedStartDate = user?.expiryDate
  //   ? moment(user?.expiryDate?.toDate()).format('MMMM D, YYYY [at] h:mm:ss A')
  //   : '';
  const formattedExpiryDate = user?.expiryDate
    ? moment(user?.expiryDate).format('MMMM D, YYYY [at] h:mm:ss A') // expiryDate should be a string or milliseconds now
    : '';

  return (
    <View style={styles.userSection}>
      <View style={styles.UserProfileSection}>
        <View style={styles.outerRing}>
          <TouchableOpacity
            style={styles.innerRing}
            onPress={() => {
              navigation.navigate('profile');
            }}>
            <Image
              source={{
                uri:
                  user?.photoURL ||
                  'https://tse2.mm.bing.net/th?id=OIP.8Rbxh5xsE6cPuk5jCeo6jAHaHa&pid=Api&P=0&h=220',
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.salamText}>Assalam o Alakum!</Text>
          <Text style={styles.userNameText}>{user?.displayName}</Text>
          <Text style={styles.userNameText}>{user?.PlanType}</Text>
          <Text style={styles.userNameText}>{formattedExpiryDate}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <BellIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.PRIMARYGREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  greetingContainer: {
    marginLeft: 10,
  },
  salamText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  userNameText: {
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  UserProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
