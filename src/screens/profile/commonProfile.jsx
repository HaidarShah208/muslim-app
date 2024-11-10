import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import img from '../../assets/images/compass.png'
import { COLORS } from '../../constants/COLORS';
// import { ScrollView } from 'react-native/types';

const ProfileScreen = () => {
  const images = [
    require('../../assets/images/compass.png'),
    require('../../assets/images/compass.png'),
    require('../../assets/images/compass.png'),
    require('../../assets/images/compass.png'),
  ];

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/compass.png')} 
        style={styles.coverImage}
      />
      <View style={styles.profileInfo}>
        <Image 
          source={require('../../assets/images/compass.png')} 
          style={styles.profileImage}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Aisha Karim</Text>
          <Icon name="check-circle" size={18} color="#4CAF50" style={styles.verifiedIcon} />
        </View>
        <Text style={styles.username}>@aishak</Text>
        <Text style={styles.location}>Istanbul, Turkey</Text>
        <Text style={styles.bio}>
          Faith-driven, fashion lover, and food enthusiast. Sharing my journey in Islam. 🌸
        </Text>
        <Text style={styles.stats}>404 Posts · 1.6k Likes</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaContainer}>
                {['https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg', 'https://i.pinimg.com/236x/12/47/73/124773e6a3e0c147c2d82960304d46af.jpg', 'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg', 'https://w0.peakpx.com/wallpaper/390/549/HD-wallpaper-new-whatsapp-dp-flowers-whats-app-dp.jpg'].map((imageUri, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(imageUri)}>
                        <Image style={styles.mediaImage} source={{ uri: imageUri }} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileInfo: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  username: {
    color: 'gray',
  },
  location: {
    color: 'gray',
    marginTop: 5,
  },
  bio: {
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  stats: {
    color: 'gray',
    marginBottom: 20,
  },
//   mediaContainer: {
//     marginHorizontal: 20,
//   },
//   mediaImage: {
//     width: '48%',
//     height: 150,
//     margin: '1%',
//     borderRadius: 10,
//   },
  mediaHeader: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor:COLORS.PRIMARYGREEN,
    marginBottom: 16,

},
mediaContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
},
mediaImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
},
});

export default ProfileScreen;
