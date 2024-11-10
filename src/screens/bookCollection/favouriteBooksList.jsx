import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorites, removeFavorite, initializeFavorites } from '../../store/slices/favoriteBookSlice';
import MainNavigator from '../../components/MainNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
const FavoriteBooksList = ({ navigation }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favoriteBook.favorites);
    const status = useSelector((state) => state.favoriteBook.status);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                await dispatch(initializeFavorites());
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        fetchFavorites();
    }, [dispatch, status]);
    const handleRemoveFavorite = (pdf) => {
        dispatch(removeFavorite(pdf));
        ToastAndroid.show('Favorite removed!', ToastAndroid.SHORT);
    };
    //   <Icon name="map-outline" size={28} color='white' />
    return (
        <View style={styles.container}>
            <MainNavigator heading='Favorite Books' />
            <ScrollView showsVerticalScrollIndicator={false}>
            {favorites.length > 0 ? (
                favorites.map((pdf) => (
                    <View >
                        <TouchableOpacity
                            style={styles.itemContainer}
                            key={pdf.id}
                            onPress={() => navigation.navigate('PdfDetail', { pdf: pdf })}
                        >
                            <View style={styles.bookCard}>
                                <Image
                                    source={{ uri: pdf.featuredImage }}
                                    style={styles.bookImage}
                                />
                                <View style={styles.bookInfo}>
                                    <Text style={styles.bookTitle}>{pdf.title}</Text>

                                </View>
                                <Text
                                    style={styles.removeButton}
                                    onPress={() => handleRemoveFavorite(pdf)}
                                > <Icon name="trash" size={28} color='red' /></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyMessage}>No favorites added yet.</Text>
            )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexWrap: 'wrap',

    },
    itemTitle: {
        fontSize: 18,
    },
    itemCategory: {
        fontSize: 16,
        color: '#555',
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#888',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
    },
    bookCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    bookImage: {
        width: 80,
        height: 85,
        marginRight: 16,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: "black"
    },
    bookAuthors: {
        fontSize: 14,
        color: '#555',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavoriteBooksList;
