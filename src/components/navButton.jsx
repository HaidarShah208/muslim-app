import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/COLORS';

const NavButton = ({ navigationNext }) => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}
                style={styles.button}
            >
                <Icon name="arrow-back" size={24} color="white" />
                <Text style={styles.buttonText}> move back</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={navigationNext} style={styles.button}>

                <Text style={styles.buttonText}> move next</Text>
                <Icon name="arrow-forward" size={24} color="white" />

            </TouchableOpacity>

        </View>
    );

};

export default NavButton;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    button: {
        backgroundColor: COLORS.PRIMARYGREEN,
        padding: 5,
        borderRadius: 10,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop : 30,
        height: 39,
        gap :5

    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'

    }
});