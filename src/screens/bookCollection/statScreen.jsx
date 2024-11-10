
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BarChartComponent from '../../components/barChart';
import CircularProgressComponent from '../../components/circularChart';
import MainNavigator from '../../components/MainNavigator';
import { COLORS } from '../../constants/COLORS';
import { BarChart } from 'react-native-gifted-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const StatisticsScreen = ({ navigation }) => {
    const [barData, setBarData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [dailyReadingTime, setDailyReadingTime] = useState(0);
    const [totalOpenedPdfs, setTotalOpenedPdfs] = useState(0);
    const readingProgress = useSelector((state) => state.pdfProgress.progress);

    useEffect(() => {
        const fetchWeeklyReadingTime = async () => {
            try {
                const storedWeeklyData = await AsyncStorage.getItem('weeklyTimeSpent');
                const weeklyData = storedWeeklyData ? JSON.parse(storedWeeklyData) : {};

                const last7Days = getLast7Days();
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const updatedData = last7Days.map((date, index) => {
                    const dayLabel = daysOfWeek[new Date(date).getDay()];
                    const timeSpent = weeklyData[date] ? Math.floor(parseInt(weeklyData[date]) / 60000) : 0;
                    return {
                        value: timeSpent,
                        label: dayLabel,
                        frontColor: dayLabel === daysOfWeek[new Date().getDay()] ? COLORS.PRIMARYGREEN : '#D3D3D3',
                    };
                });

                setBarData(updatedData);

                const today = new Date().toISOString().split('T')[0];
                setDailyReadingTime(weeklyData[today] ? Math.floor(parseInt(weeklyData[today]) / 60000) : 0);

                const todayIndex = updatedData.findIndex(item => item.label === daysOfWeek[new Date().getDay()]);
                setSelectedIndex(todayIndex);
            } catch (error) {
                console.error('Error fetching reading time:', error);
            }
        };

        const fetchOpenedPdfs = async () => {
            try {
                const storedPdfs = await AsyncStorage.getItem('openedPdfs');
                const openedPdfs = storedPdfs ? JSON.parse(storedPdfs) : [];
                setTotalOpenedPdfs(openedPdfs.length);
            } catch (error) {
                console.error('Error fetching opened PDFs:', error);
            }
        };

        fetchWeeklyReadingTime();
        fetchOpenedPdfs();
    }, []);

    const handleBarClick = (index) => {
        const updatedData = barData.map((item, i) => ({
            ...item,
            frontColor: i === index ? COLORS.PRIMARYGREEN : '#D3D3D3',
        }));
        setBarData(updatedData);
        setSelectedIndex(index);
    };

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

    return (
        <ScrollView style={styles.container}>
            <MainNavigator heading="Statistics" />

            <View style={styles.statsContainer}>
                <View style={styles.bookStats}>
                  
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 5
                    }}>
                        <Text style={styles.booksReadText}>{totalOpenedPdfs}</Text>
                        <Text style={styles.booksLabel}>books read this year</Text>
                    </View>
                    <BarChart
                        data={barData}
                        barWidth={10}
                        spacing={10}
                        roundedTop
                        hideRules
                        roundedBottom
                        yAxisThickness={0}
                        yAxisLabelWidth={0}
                        xAxisLabelsHeight={0}
                        xAxisLabelTextStyle={{ color: 'black', fontWeight: '400' }}
                        xAxisThickness={0}
                        height={100}
                    />
                </View>

                <CircularProgressComponent fillValue={totalOpenedPdfs} maxValue={200} />
            </View>

            <View style={styles.readingTimeContainer}>
                <Text style={styles.readingTimeLabel}>Average Reading Time</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    gap: 5
                }}>
                    <Text style={styles.readingTimeValue}>{dailyReadingTime}</Text>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 30,
                        color: 'black'
                    }}>min</Text>
                </View>

                <BarChartComponent
                    data={barData}
                    onBarClick={handleBarClick}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    bookStats: {
        alignItems: 'center',
    },
    booksReadText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    booksLabel: {
        fontSize: 14,
        color: 'black',
        width: 115,
    },
    readingTimeContainer: {
        backgroundColor: '#F7F7F7',
        padding: 20,
        borderRadius: 10,
    },
    readingTimeLabel: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
    },
    readingTimeValue: {
        fontSize: 88,
        fontWeight: '600',
        color: '#000',
        marginBottom: 20,
    },
});

export default StatisticsScreen;
