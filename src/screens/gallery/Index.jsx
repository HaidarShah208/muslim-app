import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import MainNavigator from '../../components/MainNavigator';
import {fetchImagesByCategory} from '../../store/slices/gallerySlice';
import Search from '../../assets/icons/search.svg';
import Fav from '../../assets/icons/fav.svg';

const Index = ({navigation}) => {
  const disciplines = ['ramadan', 'quotes', 'others', 'other islamic events'];
  const dispatch = useDispatch();
  const {Images, status, error} = useSelector(state => state.gallery);

  const [didFetch, setDidFetch] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (status === 'idle' && !didFetch) {
      disciplines.forEach(discipline => {
        dispatch(fetchImagesByCategory(discipline));
      });
      setDidFetch(true);
    }
  }, [status, dispatch, didFetch]);

  const filteredDisciplines = disciplines.filter(discipline =>
    discipline.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (status === 'failed') {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <MainNavigator
        otherIcon={
          <Fav
            onPress={() => {
              navigation.navigate('galleryBookmark');
            }}
            width={20}
          />
        }
      />

      <View style={styles.header}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: 'black',
          }}>
          Gallery
        </Text>
        <Text
          style={styles.subtitle}
          onPress={() => {
            navigation.navigate('favImage');
          }}>
          Discover These Galleries to Elevate Your Art Journey
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search width={20} height={20} fill={COLORS.PRIMARY} />
          <TextInput
            placeholder="Islamic, Hadith, Quotes"
            style={styles.searchText}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterChips}>
          {filteredDisciplines.map(discipline => (
            <View key={discipline} style={styles.chip}>
              <Text style={styles.chipText}>{discipline}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {filteredDisciplines.map(discipline => {
        const disciplineImages = Images.filter(
          image => image.collection === discipline,
        );
        const remainingCount = disciplineImages.length - 3;

        return (
          <TouchableOpacity
            key={discipline}
            style={styles.boardContainer}
            onPress={() =>
              navigation.navigate('ImageGridScreen', {discipline})
            }>
            <View style={styles.boardSection}>
              <View style={styles.imageGrid}>
                {disciplineImages.length >= 3 && (
                  <>
                    <Image
                      source={{
                        uri:
                          disciplineImages[0].featuredImage ||
                          'fallback-image-url',
                      }}
                      style={styles.largeImage}
                    />
                    <View style={styles.smallImagesColumn}>
                      <Image
                        source={{
                          uri:
                            disciplineImages[1].featuredImage ||
                            'fallback-image-url',
                        }}
                        style={styles.smallImage}
                      />
                      <View style={styles.overlayContainer}>
                        <Image
                          source={{
                            uri:
                              disciplineImages[2].featuredImage ||
                              'fallback-image-url',
                          }}
                          style={styles.smallImage}
                        />
                        {remainingCount > 0 && (
                          <View style={styles.overlay}>
                            <Text style={styles.overlayText}>
                              +{remainingCount}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </>
                )}
                {disciplineImages.length === 1 && (
                  <Image
                    source={{
                      uri:
                        disciplineImages[0].featuredImage ||
                        'fallback-image-url',
                    }}
                    style={[styles.largeImage, {width: '100%'}]}
                  />
                )}
              </View>
            </View>
            <Text style={styles.boardTitle}>{discipline}</Text>
          </TouchableOpacity>
        );
      })}

      {Images.length === 0 && <Text>No Images found for any discipline.</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBox: {
    backgroundColor: '#F2F2F5',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    gap: 10,
  },
  searchText: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  filterChips: {
    flexDirection: 'row',
    marginTop: 10,
  },
  chip: {
    backgroundColor: COLORS.PRIMARYGREEN,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // width:130
  },
  chipText: {
    fontSize: 14,
    color: 'white',
  },
  boardContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingBottom: 20,
    margin: 20,
  },
  boardSection: {
    backgroundColor: 'white',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    overflow: 'hidden',
  },
  imageGrid: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  largeImage: {
    width: '66%',
    height: 200,
    marginRight: '1%',
  },
  smallImagesColumn: {
    flexDirection: 'column',
    width: '33%',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  smallImage: {
    width: '100%',
    height: 98,
    overflow: 'hidden',
  },
  overlayContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  boardTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    textTransform: 'capitalize',
    paddingHorizontal: 20,
    lineHeight: 27,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Index;
