import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import book from '../../../assets/images/book.png'
import { COLORS } from '../../../constants/COLORS';
import NavButton from '../../../components/navButton';
import Counter from '../../../assets/icons/counter.svg'
import NoteBook from '../../../assets/icons/NoteBook.svg'
const QuranTrackerScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Top Section with Progress and Chapter Info */}
            <View style={styles.topSection}>
                <View style={styles.chapterContainer}>
                    <Progress.Bar
                        progress={0.65}
                        width={150}
                        color="white"
                        style={styles.progressBar}
                    />
                    <Text style={styles.chapterTitle}>Ch 7. The Heights (Al-A'raf)</Text>
                    <Text style={styles.chapterSubtitle}>
                        "Indeed, your Lord is Allah, who created the heavens and the earth in six days." (Quran 7:54)
                    </Text>
                </View>

            </View>

            {/* Quran Image */}
            <View style={styles.quranContainer}>

                {/* Placeholder for Quran image */}
                <View style={styles.quranImagePlaceholder}>

                    <Image
                        source={book}
                        style={{
                            width: 200,
                            height: 200,
                            resizeMode: 'contain',
                            margin: 'auto',
                        }}
                    />
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>00:15:45</Text>
                    </View>

                </View>
            </View>

            {/* Tracker Title */}
            <View style={styles.trackerTitleContainer}>
                <Text style={styles.trackerTitle}>Tracker</Text>
                <Text style={styles.trackerSubtitle}>Real time tracking as you read</Text>
            </View>

            {/* Counters */}
            <View style={{
                borderWidth: 1,
                borderColor: COLORS.PRIMARYGREEN,
                borderWidth: 2,
                padding: 5,
                borderRadius: 8,
                marginBottom: 20,
                justifyContent: 'space-around',
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}>
                <View>
                    <Text style={styles.counterTitle}>Hasanat Counter</Text>
                    <Text style={styles.counterValue}>10</Text>
                </View>
                <Counter/>
            </View>
            <View style={{
                borderWidth: 1,
                borderColor: COLORS.PRIMARYGREEN,
                borderWidth: 2,
                padding: 5,
                borderRadius: 8,
                marginBottom: 20,
                justifyContent: 'space-around',
                display: 'flex',
                flexDirection: 'row',
                gap: 10
            }}>
                <View>
                    <Text style={styles.counterTitle}>Verses Read</Text>
                    <Text style={styles.counterValue}>08</Text>
                </View>
                <NoteBook/>
            </View>
            {/* Navigation Buttons */}
            <NavButton navigationNext={() => {
                navigation.navigate('challenge');
            }} />
        </View>
    );
};

export default QuranTrackerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom:30

    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 1,
        width: 250,
        padding: 10,
        borderRadius: 8,
    },
    chapterContainer: {
        flex: 1,
        marginRight: 20,
        backgroundColor: COLORS.PRIMARYGREEN,
        width: 150,
        padding: 10,
        borderRadius: 8,
        // height: 180,
    },
    progressBar: {
        marginBottom: 10,
    },
    chapterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    chapterSubtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: 'white',
    },
    timerContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        position: 'absolute',
        top: 50,
        right: 5,
        zIndex: 1,
    },
    timerText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    quranContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    quranImagePlaceholder: {
        width: 300,
        height: 300,
        backgroundColor: '#F2F2F5',
        borderRadius: 150,
        position: 'relative',
        marginTop: 70,
    },
    trackerTitleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    trackerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    trackerSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#555',
    },
    countersContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginBottom: 20,
    },
    counterTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    
    },
    counterValue: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
});
