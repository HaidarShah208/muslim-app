import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/COLORS';
import {ScrollView} from 'react-native-gesture-handler';
import FileUpload from '../../../assets/icons/fileUpload.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ReportProblem = ({navigation}) => {
  const options = [
    'App Crash',
    'Login Issues',
    'Content Error',
    'Feature Request',
    'Performance Issues',
  ];
  const [activeTab, setActiveTab] = useState(options[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (problem == '') {
      Alert.alert('please specify your problem so that we can take action');
      return;
    }
    if (problem.length >150) {
        Alert.alert('words limits should be less than 150 charactars');
        return;
      }
    if (image == null) {
      Alert.alert(
        'please give any screenShot of your problem so that we can take action',
      );
      return;
    }
   try {
    let photoURL = '';
    if (image.uri) {
      const imagePath = `reports_pictures/${auth().currentUser.uid}.jpg`; 
      const reference = storage().ref(imagePath);
      await reference.putFile(image.uri);
      photoURL = await reference.getDownloadURL(); 
    }

    if (photoURL) {
    
      await firestore().collection('reports').add({
        name,
        email,
        problem,
        screenshot: photoURL || '', 
        createdAt: firestore.FieldValue.serverTimestamp(), 
      });

      Alert.alert('Success', 'Report submitted successfully!');
      setName('');
      setEmail('');
      setProblem('');
      setImage(null);
    }
  } catch (error) {
    console.error('Error submitting report:', error); 
    Alert.alert('Error', 'There was a problem in submitting the report');
  }
  };

  const handleImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const source = {uri: response.assets[0].uri};
        setImage(source);
      }
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 10,
        gap: 10,
        backgroundColor: COLORS.WHITE,
      }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon
            name="arrow-back-circle-outline"
            size={32}
            color={COLORS.PRIMARYGREENSHADE2}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.PRIMARYGREENSHADE2,
            fontSize: 22,
            fontWeight: '700',
            marginLeft: -10,
            fontFamily: 'Poppins',
          }}>
          Report a Problem
        </Text>
        <View></View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={{color: COLORS.GRAY, fontSize: 22, fontFamily: 'Poppins'}}>
          Choose the category that best describes your issue.
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20}}>
          {options.map(item => (
            <TouchableOpacity
              onPress={() => setActiveTab(item)}
              style={[
                styles.tabItem,
                {
                  backgroundColor:
                    activeTab == item
                      ? COLORS.PRIMARYGREENSHADE2
                      : COLORS.WHITE,
                },
              ]}>
              <Text style={styles.tabText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{paddingLeft: 20}}>
        <Text style={{color: COLORS.GRAY, fontSize: 22, fontFamily: 'Poppins'}}>
          Describe the{' '}
          <Text style={{color: COLORS.PRIMARYGREENSHADE2}}>Problem</Text>
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '30%',
          backgroundColor: COLORS.BACKGROUND,
        }}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={COLORS.BLACK}
          placeholder="Search"
          onChangeText={text => setProblem(text)}
          value={problem}
        />
      </View>

      <View style={styles.info}>
        <TouchableOpacity onPress={() => handleImagePicker()}>
          <FileUpload width={150} />
        </TouchableOpacity>
        <View style={styles.contactInfo}>
          <Text style={{color: COLORS.WHITE, textAlign: 'center'}}>
            Contact Information
          </Text>
          <Text style={{color: COLORS.WHITE, textAlign: 'center'}}>
            Optional
          </Text>
          <Text
            style={{
              color: COLORS.WHITE,
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
            }}>
            Name
          </Text>
          <TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.WHITE}
              //   placeholder="Search"
              onChangeText={text => setName(text)}
              value={name}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.WHITE,
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
            }}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.WHITE}
            //   placeholder="Search"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            width: '60%',
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.PRIMARYGREENSHADE2,
            justifyContent: 'center',
            marginHorizontal: 'auto',
          }}>
          <Text
            style={{
              color: COLORS.WHITE,
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Submit Report
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReportProblem;

const styles = StyleSheet.create({
  tabItem: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
    marginRight: 10,
  },
  tabText: {
    color: COLORS.BLACK,
    fontSize: 15,
    fontWeight: '400',
    padding: 10,
  },
  textInput: {
    color: 'black',
    fontSize: 14,
    height: '100%', // Make sure the text input takes full height of its container
    width: '85%',
  },
  info: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  contactInfo: {
    width: '50%',
    height: '90%',
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: COLORS.WHITE,
    marginHorizontal: 10,
  },
});
