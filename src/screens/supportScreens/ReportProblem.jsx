import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/COLORS';
import {ScrollView} from 'react-native-gesture-handler';
import FileUpload from '../../assets/icons/fileUpload.svg';
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!problem || problem.length > 150) {
      Alert.alert(
        'Please describe the problem with fewer than 150 characters.',
      );
      return;
    }

    if (!image) {
      Alert.alert('Please upload a screenshot of the problem.');
      return;
    }

    setLoading(true); // Show loading indicator
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
          screenshot: photoURL,
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
      Alert.alert('Error', 'There was a problem submitting the report');
    } finally {
      setLoading(false); // Hide loading indicator
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IonIcon
                name="arrow-back-circle-outline"
                size={32}
                color={COLORS.PRIMARYGREENSHADE2}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Report a Problem</Text>
          </View>

          <Text style={styles.subHeading}>
            Choose the category that best describes your issue.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}>
            {options.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setActiveTab(item)}
                style={[
                  styles.tabItem,
                  {
                    backgroundColor:
                      activeTab === item
                        ? COLORS.PRIMARYGREENSHADE2
                        : COLORS.PRIMARYWHITE,
                  },
                ]}>
                <Text style={styles.tabText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>
            Describe the <Text style={styles.labelHighlight}>Problem</Text>
          </Text>

          <TextInput
            style={styles.textArea}
            placeholderTextColor={COLORS.GRAY}
            placeholder="Describe the issue (Max 150 characters)"
            multiline
            maxLength={150}
            value={problem}
            onChangeText={setProblem}
          />

          <View style={styles.info}>
            <TouchableOpacity onPress={handleImagePicker}>
              <FileUpload width={150} />
            </TouchableOpacity>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>
                Contact Information (Optional)
              </Text>

              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={COLORS.WHITE}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={COLORS.WHITE}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color={COLORS.WHITE} />
              ) : (
                <Text style={styles.submitText}>Submit Report</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportProblem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    color: COLORS.PRIMARYGREENSHADE2,
    fontSize: 22,
    fontWeight: '700',
    marginLeft: -10,
    fontFamily: 'Poppins',
  },
  subHeading: {
    color: COLORS.GRAY,
    fontSize: 18,
    marginBottom: 10,
  },
  tabsContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
    marginRight: 10,
  },
  tabText: {
    color: COLORS.BLACK,
    fontSize: 15,
    fontWeight: '400',
  },
  label: {
    color: COLORS.GRAY,
    fontSize: 18,
    marginBottom: 10,
  },
  labelHighlight: {
    color: COLORS.PRIMARYGREENSHADE2,
  },
  textArea: {
    backgroundColor: COLORS.BACKGROUND,
    padding: 15,
    borderRadius: 10,
    textAlignVertical: 'top',
    height: 150,
    fontSize: 14,
    color: COLORS.BLACK,
  },
  info: {
    flexDirection: 'row',
    marginTop: 20,
  },
  contactInfo: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 10,
    padding: 10,
  },
  contactText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },
  inputLabel: {
    color: COLORS.WHITE,
    fontWeight: '700',
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 40,
  },
  submitContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 25,
    width: '60%',
    height: 50,
    justifyContent: 'center',
  },
  submitText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
