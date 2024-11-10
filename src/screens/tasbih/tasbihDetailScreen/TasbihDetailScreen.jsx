import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../constants/COLORS';
import ActionsHeader from '../../../components/ActionsHeader';
import SearchIcon from '../../../assets/icons/searchWithPadding.svg';
import MenuIcon from '../../../assets/icons/burgerMenuIcon.svg';
import ArrowRight from '../../../assets/icons/arrowRightLongGreen.svg';
import WhiteCircle from '../../../assets/icons/whiteCircle.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import ResetIcon from '../../../assets/icons/resetIcon.svg';
import SaveIcon from '../../../assets/icons/save.svg';
import GraphsIcon from '../../../assets/icons/graphs.svg';
import {useDispatch, useSelector} from 'react-redux';
import {saveOrUpdateTasbih} from '../../../store/slices/tasbihSlice';

const TasbihDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {tasbih} = route.params;
  const {tasbihs} = useSelector(state => state.tasbih);
  const currentTasbih = tasbihs.find(t => t.id === tasbih.id);

  const [timer, setTimer] = useState(0);
  const [setNumber, setSetNumber] = useState(
    Math.floor((currentTasbih?.count || 0) / currentTasbih?.target) + 1,
  );
  const [tasbihCount, setTasbihCount] = useState(currentTasbih?.count || 0);

  const intervalRef = useRef(null);

  useEffect(() => {
    // Start the timer
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    setSetNumber(
      Math.floor((currentTasbih?.count || 0) / currentTasbih?.target) + 1,
    );
  }, [currentTasbih]);

  const handleIncrement = () => {
    if (tasbihCount < currentTasbih.target) {
      const newCount = tasbihCount + 1;
      setTasbihCount(newCount);
      let tasbihId = currentTasbih?.id;
      let tasbihData = {
        name: currentTasbih.name,
        nameEnglish: currentTasbih.nameEnglish,
        count: newCount,
        target: currentTasbih.target,
      };
      dispatch(saveOrUpdateTasbih({tasbihId, tasbihData}));
    } else {
      ToastAndroid.show('You have reached your target', ToastAndroid.SHORT);
    }
  };

  const handleReset = () => {
    let tasbihId = currentTasbih?.id;
    let tasbihData = {
      name: currentTasbih.name,
      nameEnglish: currentTasbih.nameEnglish,
      count: 0,
      target: currentTasbih.target,
    };
    setTimer(0);
    setTasbihCount(0);
    dispatch(saveOrUpdateTasbih({tasbihId, tasbihData})); // Pass correct ID
    ToastAndroid.show('Progress reset successfully', ToastAndroid.SHORT);
  };

  const handleSave = () => {
    let tasbihId = currentTasbih?.id;
    let tasbihData = {
      name: currentTasbih.name,
      nameEnglish: currentTasbih.nameEnglish,
      count: tasbihCount,
      target: currentTasbih.target,
    };
    dispatch(saveOrUpdateTasbih({tasbihId, tasbihData})); // Pass correct ID
    ToastAndroid.show('Progress saved successfully', ToastAndroid.SHORT);
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <ActionsHeader
        secondIcon={<MenuIcon width={30} height={30} />}
        firstIcon={<SearchIcon width={30} height={30} />}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Set: {setNumber}</Text>
        <Text style={styles.infoText}>Range: {currentTasbih?.target}</Text>
      </View>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.selectText}>Select a Dhikr</Text>
        <ArrowRight width={50} height={30} />
      </TouchableOpacity>

      <View style={styles.imagecontainer}>
        <Text style={styles.tasbihArabic}>{tasbih.name}</Text>
        <Text style={styles.tasbihEng}>{tasbih.nameEnglish}</Text>
        {/* <Text style={styles.tasbihMeans}>Praise be to Allah</Text> */}
      </View>
      <View style={styles.counterContainer}>
        {/* <Text style={styles.counterText}>{currentTasbih?.count || 0}</Text> */}
        {/* <Text style={styles.counterText}>{currentTasbih?.count || 0}</Text> */}
        <Text style={styles.counterText}>{tasbihCount}</Text>
        <Text style={styles.counterLable}>Tasbih Counter</Text>

        <TouchableOpacity
          style={styles.counterButton}
          onPress={handleIncrement}>
          <Text style={styles.counterNumber}>{formatTime(timer)}</Text>
          <WhiteCircle height={64} width={64} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleReset}>
          <ResetIcon width={50} height={50} style={styles.actionButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <SaveIcon width={50} height={50} style={styles.actionButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <GraphsIcon width={50} height={50} style={styles.actionButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TasbihDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHTGREEN15,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  infoContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectButton: {
    backgroundColor: COLORS.PRIMARYWHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    maxWidth: '75%',
    height: 50,
    marginHorizontal: 'auto',
    gap: 20,
  },
  selectText: {
    fontSize: 20,
    color: COLORS.PRIMARYGREEN,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  imagecontainer: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 30,
  },
  tasbihArabic: {
    fontSize: 50,
    color: COLORS.PRIMARYGREEN,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'AmiriQuran',
    lineHeight: 90,
  },
  tasbihEng: {
    fontSize: 30,
    color: COLORS.BLACK,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: 30,
  },
  tasbihMeans: {
    fontSize: 20,
    color: COLORS.GRAY,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: 30,
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  counterText: {
    fontSize: 75,
    color: COLORS.GRAY,
    fontWeight: '700',
    lineHeight: 73,
  },
  counterLable: {
    fontSize: 15,
    color: COLORS.BLACK,
    fontWeight: '700',
    fontFamily: 'Poppins',
    lineHeight: 15,
  },
  counterButton: {
    height: 69,
    width: 210,
    backgroundColor: COLORS.PRIMARYGREENSHADE2,
    borderRadius: 58,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  circleButton: {
    height: 64,
    width: 62,
    backgroundColor: COLORS.PRIMARYWHITE,
    borderRadius: 50,
    position: 'absolute',
    right: 10,
  },
  counterNumber: {
    color: COLORS.PRIMARYWHITE,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
    lineHeight: 20,
    paddingLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    gap: 5,
  },
  actionButton: {},
  actionButtonText: {
    color: COLORS.WHITE,
    fontWeight: '700',
    fontSize: 15,
  },
});
