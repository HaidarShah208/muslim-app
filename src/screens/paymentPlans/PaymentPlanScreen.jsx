import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SignIn from '../../assets/icons/signIn.svg';
import {COLORS} from '../../constants/COLORS';
import Star from '../../assets/icons/star.svg';
import {BlurView} from '@react-native-community/blur';
import Help from '../../assets/images/helpus.png';
import Icon from 'react-native-vector-icons/dist/Feather';
import usePaymentPlanScreen from './usePaymentPlanScreen';
import {useSelector} from 'react-redux';

const PricingScreen = () => {
  const loading = useSelector(state => state?.auth?.isLoading);

  const {
    selectedPlan,
    isModalVisible,
    setModalVisible,
    isWarningModalVisible,
    setWarningModalVisible,
    plans,
    handleSelectPlan,
    handleFree,
    handleConfirmClick,
    getBackgroundColor,
    getTextColor,
    handleGetAppButtonClick,
  } = usePaymentPlanScreen();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          {/* Blur Effect */}
          <BlurView style={styles.blurView} blurType="light" blurAmount={10} />
          {/* Modal Content */}
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                This is between you and Allah, If you genuinely can’t afford it,
                You can have it for free! Allah is a sufficient witness.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonNo}
                  onPress={() => setModalVisible(false)}>
                  <Text style={[styles.modalButtonText, {color: 'black'}]}>
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={handleConfirmClick}>
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isWarningModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setWarningModalVisible(false)}>
          <BlurView style={styles.blurView} blurType="light" blurAmount={10} />

          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Warning: If you click on this, your account will 100% become
                free, and if you can afford this you are breaking a promise.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonNo}
                  onPress={() => setWarningModalVisible(false)}>
                  <Text style={[styles.modalButtonText, {color: 'black'}]}>
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={handleFree}>
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              marginBottom: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              gap: 10,
            }}>
            <Text style={styles.signIn}>Sign in</Text>
            <SignIn />
          </View>
          <Image
            source={Help}
            style={{
              alignSelf: 'center',
              width: 319,
              height: 300,
              paddingHorizontal: 0,
            }}
          />
          <Text style={styles.title}>
            Help <Text style={styles.highlight}>Us</Text>
          </Text>
          <Text style={styles.subtitle}>Grow & Stay Ad-Free Forever</Text>
        </View>
        <ScrollView
          style={styles.plansContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.plan,
                selectedPlan === plan.id && styles.selectedPlan,
                {backgroundColor: getBackgroundColor(index)}, // Dynamic background color
                index === 2 && styles.thirdPlanBorder,
              ]}
              onPress={() => handleSelectPlan(plan.id)}>
              <View
                style={[
                  styles.line1,
                  {backgroundColor: getTextColor(index)},
                ]}></View>
              <View
                style={[
                  styles.line2,
                  {backgroundColor: getTextColor(index)},
                ]}></View>
              <Text style={[styles.planTitle, {color: getTextColor(index)}]}>
                {plan.title}
              </Text>
              <Text
                style={[
                  styles.planDescription,
                  {color: getTextColor(index)},
                  index === 2 && styles.thirdPlanText,
                ]}>
                {plan.description}
              </Text>
              <Text style={[styles.planPrice, {color: getTextColor(index)}]}>
                ${plan.price}
              </Text>
              <View
                style={[
                  styles.arrowContainer,
                  {backgroundColor: getTextColor(index)},
                ]}>
                <Icon
                  name="arrow-up-right"
                  size={30}
                  style={{color: getBackgroundColor(index)}}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // borderWidth:1
            marginVertical: 10,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.LightGreen,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginBottom: 4,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 10,
            }}>
            <Star />
            <Text style={styles.freeTrialText}>
              15 Days Free Trial (No Card Needed)
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.getAppButton}
          onPress={handleGetAppButtonClick}>
          <Text style={styles.getAppButtonText}>Get App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default PricingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  signIn: {
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.PRIMARYGREEN,
  },
  highlight: {
    color: 'black',
    fontWeight: '700',
    fontSize: 30,
  },
  arrowContainer: {
    backgroundColor: 'red',
    width: 37,
    height: 37,
    borderRadius: 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: '400',
  },
  plansContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  plan: {
    width: '30%',
    paddingVertical: 15,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginHorizontal: 2,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  line1: {
    width: 66,
    height: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  line2: {
    width: 46,
    height: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: COLORS.PRIMARYGREEN,
    backgroundColor: '#23937133',
  },
  planTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  planDescription: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    // marginVertical: 5,
    color: 'black',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  thirdPlanText: {
    fontSize: 12,
    fontWeight: '700',
  },
  freeTrialContainer: {
    // backgroundColor: '#f5f5f5',
  },
  freeTrialText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  getAppButton: {
    backgroundColor: COLORS.PRIMARYGREEN,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 50,
    alignSelf: 'center',
  },
  getAppButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: 1,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 2,
  },
  thirdPlanBorder: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARYGREEN,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButtonNo: {
    padding: 10,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    borderColor: COLORS.PRIMARYGREEN,
    borderWidth: 1,
  },
  modalButtonConfirm: {
    backgroundColor: '#d5df63',
    padding: 10,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'black',
  },
});
