import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainNavigator from '../../components/MainNavigator';
import Icons from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/COLORS';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../store/slices/userSlice'; 

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { photoURL, displayName, email, status, error } = useSelector(state => state?.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const user = useSelector(state => state?.auth?.user);

    // Calculate profile completion
    const calculateProfileCompletion = () => {
        let completedFields = 0;
        if (user?.photoURL) completedFields++;
        if (user?.displayName) completedFields++;
        if (user?.email) completedFields++;
        if (user?.description) completedFields++;
        if (user?.location) completedFields++;
        return (completedFields / 5) * 100; 
    };

    const profileCompletion = calculateProfileCompletion();

    const handleImagePress = (imageUri) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };

    const fetchProfile = useCallback(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useFocusEffect(
        useCallback(() => {
            fetchProfile();
        }, [fetchProfile])
    );

    return (
        <ScrollView style={styles.container}>
            <MainNavigator heading={'profile'} />
            <View style={styles.profileInfo}>
                <AnimatedCircularProgress
                    size={145}
                    width={4}
                    fill={profileCompletion}
                    tintColor={COLORS.PRIMARYGREEN}
                    backgroundColor="#F2F2F5"
                >
                    {() => (
                        <Image
                            style={styles.profileImage}
                            source={{ uri: user?.photoURL || 'https://tse2.mm.bing.net/th?id=OIP.8Rbxh5xsE6cPuk5jCeo6jAHaHa&pid=Api&P=0&h=220' }}
                        />
                    )}
                </AnimatedCircularProgress>
                <Text style={styles.completion}>{Math.round(profileCompletion)}% Complete</Text>
                <Text style={styles.name}>
                    {user?.displayName} <Icon name="checkmark-circle" size={16} color="green" />
                </Text>
                <Text style={styles.username}>{email}</Text>
                <Text style={styles.location}>{user?.location ? user.location : "Add your location"}</Text>
                <Text style={styles.bio}>
                    {user?.description ? user.description : 'No bio provided'}
                </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
                <TouchableOpacity style={styles.tab}><Text style={styles.text}>Connections</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tab}><Text style={styles.text}>Saved</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tab}><Text style={styles.text}>Achievements</Text></TouchableOpacity>
            </ScrollView>

            <View style={styles.mediaHeader}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Media </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white' }}>404 Posts</Text>
                    <Text style={{ color: 'white' }}>1.6k Likes</Text>
                </View>
            </View>

            <View style={styles.mediaContainer}>
                {['https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg', 'https://i.pinimg.com/236x/12/47/73/124773e6a3e0c147c2d82960304d46af.jpg', 'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg', 'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg'].map((imageUri, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(imageUri)}>
                        <Image style={styles.mediaImage} source={{ uri: imageUri }} />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('editUser')}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
                <Icons name="arrow-up-right" size={36} color="white" />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {selectedImage && (
                                <Image style={styles.modalImage} source={{ uri: selectedImage }} />
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileInfo: {
        alignItems: 'center',
        padding: 16,
        position: 'relative',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 70,
    },
    completion: {
        marginTop: 8,
        color: COLORS.PRIMARYWHITE,
        backgroundColor: COLORS.PRIMARYGREEN,
        position: 'absolute',
        top: '45%',
        width: 150,
        height: 30,
        borderRadius: 15,
        textAlign: 'center',
        paddingTop: 3,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 28,
        color: 'black'
    },
    username: {
       
        color: 'black'
    },
    location: {
        
        color: 'black'
    },
    bio: {
        textAlign: 'center',
        marginTop: 8,
        color: 'black'
    },
    tabs: {},
    tab: {
        padding: 5,
        borderColor: COLORS.PRIMARYGREEN,
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 25,
        marginHorizontal: 10,
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
        marginHorizontal: 3,
        marginBottom:7

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
        marginRight: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    text: {
        color: 'black',
        fontWeight: '400',
        fontSize: 16
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
});

export default ProfileScreen;
