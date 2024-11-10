import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconz from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import { setUser, setError } from '../../store/slices/authSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  SkypeIndicator
} from 'react-native-indicators';
const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  // const loading = useSelector(state => state.auth.loading);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(user?.displayName || '');
  const [location, setLocation] = useState(user?.location || '');
  const [description, setDescription] = useState(user?.description || '');
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = auth().currentUser;

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    let completedFields = 0;
    if (profileImage || user?.photoURL) completedFields++;
    if (name) completedFields++;
    if (location) completedFields++;
    if (description) completedFields++;
    return (completedFields / 4) * 100; // Calculate percentage
  };

  const profileCompletion = calculateProfileCompletion();

  const handleImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const source = {uri: response.assets[0].uri};
        setProfileImage(source);
      }
    });
  };

  const toggleEdit = field => {
    setEditingField(field === editingField ? null : field);
  };

  const saveChanges = async () => {
    setLoading(true);
    // dispatch();
    try {
      let photoURL = user?.photoURL;

      if (profileImage) {
        const imagePath = `profile_pictures/${currentUser?.uid}.jpg`;
        const reference = storage().ref(imagePath);
        await reference.putFile(profileImage.uri);
        photoURL = await reference.getDownloadURL();
      }

      await firestore().collection('users').doc(currentUser?.uid).set(
        {
          displayName: name,
          email: currentUser?.email,
          photoURL,
          location,
          description,
        },
        {merge: true},
      );

      dispatch(
        setUser({...user, displayName: name, photoURL, location, description}),
      );
      Alert.alert('Profile Updated', 'Your changes have been saved.');
    } catch (error) {
      console.error('Error updating profile: ', error);
      dispatch(setError('There was a problem updating your profile.'));
      Alert.alert('Error', 'There was a problem updating your profile.');
    } finally {
      setLoading(false);
    }

    setEditingField(null);
  };

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setLocation(user.location || '');
      setDescription(user.description || '');
    }
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <MainNavigator heading={'profile'} />
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImagePicker}>
            <AnimatedCircularProgress
              size={145}
              width={4}
              fill={profileCompletion}
              tintColor={COLORS.PRIMARYGREEN}
              backgroundColor="#F2F2F5">
              {() => (
                <Image
                  source={
                    profileImage
                      ? profileImage
                      : {
                          uri:
                            user?.photoURL ||
                            'https://tse2.mm.bing.net/th?id=OIP.8Rbxh5xsE6cPuk5jCeo6jAHaHa&pid=Api&P=0&h=220',
                        }
                  }
                  style={styles.profileImage}
                />
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusIcon} onPress={handleImagePicker}>
            <Icon name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.completion}>
          {Math.round(profileCompletion)}% Complete
        </Text>
        <TouchableOpacity onPress={() => toggleEdit('name')}>
          {editingField === 'name' ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onBlur={() => setEditingField(null)}
              autoFocus
            />
          ) : (
            <View style={styles.Icons}>
              <Iconz
                name="edit"
                color={COLORS.PRIMARYGREEN}
                size={20}
                style={{marginTop: 30}}
              />
              <Text style={styles.name}>{user?.displayName}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.username}>{user?.email}</Text>
        <TouchableOpacity onPress={() => toggleEdit('location')}>
          {editingField === 'location' ? (
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              onBlur={() => setEditingField(null)}
              autoFocus
            />
          ) : (
            <View style={styles.Icons}>
              <Iconz name="edit" color={COLORS.PRIMARYGREEN} size={20} />
              <Text style={styles.location}>
                {location ? location : 'add your current location'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleEdit('description')}>
          {editingField === 'description' ? (
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              onBlur={() => setEditingField(null)}
              autoFocus
              multiline
            />
          ) : (
            <View style={styles.Icons}>
              <Iconz name="edit" color={COLORS.PRIMARYGREEN} size={20} />
              <Text style={styles.description}>
                {description ? description : 'add your bio'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.text}>Connections</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.text}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.text}>Achievements</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.mediaHeader}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
          Media{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white'}}>404 Posts</Text>
          <Text style={{color: 'white'}}>1.6k Likes</Text>
        </View>
      </View>
      <View
        style={styles.mediaContainer}>
        {[
          'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg',
          'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg',
          'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg',
          'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg',
        ].map((imageUri, index) => (
          <Image style={styles.mediaImage} source={{uri: imageUri}} />
        ))}
      </View>
      <TouchableOpacity style={styles.editProfileButton} onPress={saveChanges}>
        <Text style={styles.editProfileText}>
          {loading ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Text style={styles.editProfileText}>updating .....</Text>
                <SkypeIndicator color="white" />
              </View>
            </>
          ) : (
            'save updates'
          )}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
    resizeMode: 'cover',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARYGREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
      color: 'black'
  },
  username: {
    fontSize: 14,
     color: 'black'
  },
  location: {
    fontSize: 14,
     
    marginTop: 5,
      color: 'black'
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
      color: 'black'
  },
  completion: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARYGREEN,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
      color: 'black'
  },
  tab: {
    padding: 5,
    borderColor: COLORS.PRIMARYGREEN,
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 25,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  mediaHeader: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.PRIMARYGREEN,
    marginBottom: 16,
  },
  mediaContainer: {
    paddingHorizontal: 6,
    marginTop: 16,
    display: "flex",
    flexDirection:'row',
    flexWrap:'wrap'
},
  mediaImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 7,
    marginHorizontal: 3,

  },
  editProfileButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARYGREEN,
    padding: 10,
    borderRadius: 15,
    margin: 26,
    width: 225,
    alignSelf: 'center',
  },
  editProfileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
    
  },
  Icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});

export default EditUser;
