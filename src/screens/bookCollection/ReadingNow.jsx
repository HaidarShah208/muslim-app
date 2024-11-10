import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainNavigator from '../../components/MainNavigator';
import { COLORS } from '../../constants/COLORS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { initializeReadingProgress } from '../../store/slices/readingProgress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import EYE from '../../assets/icons/view.svg';
import Stat from '../../assets/icons/stat.svg';

const ReadingNowScreen = ({ navigation }) => {
    const [dailyReadingTime, setDailyReadingTime] = useState(0);
    const [weeklyData, setWeeklyData] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [day, setDay] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [showLastOnly, setShowLastOnly] = useState(false); // New state to handle eye filter click
    const dispatch = useDispatch();
    const readingProgress = useSelector((state) => state.pdfProgress.progress);
    const openedBooks = useSelector((state) => state.openedBooks.books);

    const currentYear = new Date().getFullYear();

    const booksOpenedThisYear = useMemo(() => {
        return openedBooks.filter((book) => {
            const openedYear = new Date(book.openedDate).getFullYear();
            return openedYear === currentYear;
        }).length;
    }, [openedBooks, currentYear]);

    useEffect(() => {
        dispatch(initializeReadingProgress());
    }, [dispatch]);

    useEffect(() => {
        const fetchWeeklyReadingTime = async () => {
            try {
                const storedWeeklyData = await AsyncStorage.getItem('weeklyTimeSpent');
                const weeklyData = storedWeeklyData ? JSON.parse(storedWeeklyData) : {};

                const last7Days = getLast7Days();
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const updatedData = last7Days.map((date) => {
                    const dayLabel = daysOfWeek[new Date(date).getDay()];
                    const timeSpent = weeklyData[date] ? Math.floor(parseInt(weeklyData[date]) / 60000) : 0;
                    return {
                        value: timeSpent,
                        label: dayLabel,
                        frontColor: dayLabel === daysOfWeek[new Date().getDay()] ? COLORS.PRIMARYGREEN : '#D3D3D3',
                    };
                });

                setWeeklyData(updatedData);

                const today = new Date().toISOString().split('T')[0];
                setDailyReadingTime(weeklyData[today] ? Math.floor(parseInt(weeklyData[today]) / 60000) : 0);
            } catch (error) {
                console.error('Error fetching reading time:', error);
            }
        };

        fetchWeeklyReadingTime();
    }, []);

    useEffect(() => {
        const getCurrentDate = () => {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const date = new Date();
            const dayName = daysOfWeek[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            return {
                day: dayName,
                formattedDate: `${day} ${month} ${year}`
            };
        };

        const { day: currentDay, formattedDate: currentFormattedDate } = getCurrentDate();
        setDay(currentDay);
        setFormattedDate(currentFormattedDate);
    }, []);

    const getLast7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            days.push(day.toISOString().split('T')[0]);
        }
        return days;
    };

    const formatReadingTime = (minutes) => {
        const h = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${h > 0 ? `${h} hour${h !== 1 ? 's' : ''} and ` : ''}${mins} minute${mins !== 1 ? 's' : ''}`;
    };

    const renderReadingItem = (bookId, progressData) => {
        const pdf = progressData.pdf;
        const title = pdf?.title || 'Unknown Title';
        const mediaFile = pdf?.mediaFile || '';

        return (
            <View key={bookId} style={styles.hadithCard}>
                <View style={styles.flexRow}>
                    <Text style={styles.readingStatus}>Reading Progress</Text>
                    <Text style={styles.progressPercentage}>
                        {progressData.pagesRead > 0 ? Math.round((progressData.pagesRead / progressData.totalPages) * 100) : 0}%
                    </Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${progressData.pagesRead > 0 ? Math.round((progressData.pagesRead / progressData.totalPages) * 100) : 0}%` }]} />
                </View>
                <Text style={styles.hadithText}> {title}</Text>
                <Text style={styles.hadithSource}>Pages Read: {progressData.pagesRead} / {progressData.totalPages}</Text>
                <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => pdf ? navigation.navigate('PdfDetail', { pdf }) : null}
                >
                    <Icon name="arrow-forward-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        );
    };

    const toggleShowLastOnly = () => {
        setShowLastOnly(!showLastOnly);
    };

    const getLastReadingProgress = () => {
        const bookIds = Object.keys(readingProgress);
        if (bookIds.length === 0) return null;
        const lastBookId = bookIds[bookIds.length - 1];
        return renderReadingItem(lastBookId, readingProgress[lastBookId]);
    };

    return (
        <View style={styles.container}>
            <MainNavigator heading="Reading Now" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.currentDate}>{currentDate}</Text>

                <View style={styles.goalsSection}>
                    <Text style={styles.sectionTitle}>My Goals</Text>
                    <View style={styles.goalCard}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.currentDay}>it's {day}</Text>
                            <Text style={styles.currentDate}>{formattedDate}</Text>
                            <Text style={styles.currentDate}>{openedBooks}</Text>
                        </View>
                        <Text style={styles.goalTime}>{formatReadingTime(dailyReadingTime)}</Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${(dailyReadingTime / 120) * 100}%` }]} />
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {weeklyData.map((item, index) => (
                                <View key={index} style={styles.circularProgressContainer}>
                                    <AnimatedCircularProgress
                                        size={60}
                                        width={5}
                                        fill={(item.value / 120) * 100}
                                        tintColor={COLORS.PRIMARYGREEN}
                                        backgroundColor="#E0E0E0"
                                    >
                                        {() => (
                                            <Text style={styles.circularProgressText}>{item.label}</Text>
                                        )}
                                    </AnimatedCircularProgress>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.statsButton} onPress={() => navigation.navigate('charts')}>
                            <Stat />
                            <Text style={styles.statsButtonText}> View all time statistics</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.continueReadingSection}>
                    <View style={styles.filterSection}>
                        <Text style={styles.sectionTitle}>Continue Reading</Text>
                        <TouchableOpacity onPress={toggleShowLastOnly}>
                            <EYE />
                        </TouchableOpacity>
                    </View>

                    {readingProgress && Object.keys(readingProgress).length > 0 ? (
                        showLastOnly ? (
                            getLastReadingProgress()
                        ) : (
                            Object.keys(readingProgress).map(bookId =>
                                renderReadingItem(bookId, readingProgress[bookId])
                            )
                        )
                    ) : (
                        <Text style={styles.noReadingText}>No readings available.</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    content: {
        padding: 16,
    },
    currentDate: {
        fontSize: 16,
        color: '#111827',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
    },
    goalsSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1F2937',
    },
    goalCard: {
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        padding: 16,
    },
    goalTime: {
        fontSize: 20,
        color: COLORS.PRIMARYGREEN,
        marginBottom: 12,
        fontWeight: '700',
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginBottom: 12,
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.PRIMARYGREEN,
        borderRadius: 2,
    },
    statsButton: {
        backgroundColor: COLORS.PRIMARYGREEN,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 16,
        alignSelf: 'center',
        paddingHorizontal: 16,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    statsButtonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    circularProgressContainer: {
        marginRight: 16,
    },
    circularProgressText: {
        fontSize: 12,
        color: '#1F2937',
    },
    continueReadingSection: {
        marginBottom: 24,
    },
    hadithCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    hadithText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    hadithSource: {
        fontSize: 14,
        color: '#6B7280',
    },
    readMoreButton: {
        alignSelf: 'flex-end',
        marginTop: 12,
        padding: 8,
        borderRadius: 8,
        // backgroundColor: '#E5E7EB',
        borderColor: 'black',
        borderWidth: 3,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 50,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressPercentage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PRIMARYGREEN,
    },
    noReadingText: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    dateContainer: {
        // alignItems: 'center',
        marginBottom: 20,
    },
    currentDay: {
        fontSize: 18,
        color: COLORS.PRIMARYGREEN,
        fontWeight: '600',
    },
    currentDate: {
        fontSize: 16,
        color: '#94A3B8',
        marginTop: 4,
    },
    filterSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

export default ReadingNowScreen;
