import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  loadTasbihs,
  deleteTasbih,
  saveOrUpdateTasbih,
  saveOrUpdateTarget,
  loadTarget,
} from '../../store/slices/tasbihSlice';

const useTasbih = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state selectors
  const tasbihs = useSelector(state => state?.tasbih?.tasbihs);
  const totalCount = useSelector(state => state?.tasbih?.totalCount);
  const tasbihTargets = useSelector(state => state?.tasbih?.tasbihTargets);
  // Local state
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addEditMode, setAddEditMode] = useState(false);
  const [currentTasbih, setCurrentTasbih] = useState({
    id: '',
    name: '',
    nameEnglish: '',
    count: 0,
    target: 100,
  });

  const [targetTasbihFormValues, setTargetTasbihFormValues] = useState({
    daily: tasbihTargets.daily,
    weekly: tasbihTargets.weekly,
    monthly: tasbihTargets.monthly,
  });

  const [showTargetFrom, setShowTargetFrom] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadTasbihs());
      // dispatch(loadTotalCount());
      dispatch(loadTarget());
    }, []),
  );

  const calculateProgress = (target, count) => {
    if (!target || !count || target === 0 || count === 0) return 0;
    const progress = (count / target) * 100;
    return Math.min(progress, 100);
  };

  const dailyProgress = calculateProgress(tasbihTargets.daily, totalCount);
  const weeklyProgress = calculateProgress(tasbihTargets.weekly, totalCount);
  const monthlyProgress = calculateProgress(tasbihTargets.monthly, totalCount);

  const onTasbihTargetChange = (name, value) => {
    setTargetTasbihFormValues({...targetTasbihFormValues, [name]: value});
  };

  const handleSearchChange = value => {
    setSearch(value);
  };
  const filteredTasbihs = tasbihs.filter(tasbih =>
    tasbih.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handleLinkPress = link => {
    setActiveLink(link);
  };

  const handleEmptyTasbihInput = () => {
    setCurrentTasbih({
      id: '',
      name: '',
      nameEnglish: '',
      count: 0,
      target: 100,
    });
  };

  const handleSaveTasbih = () => {
    if (!currentTasbih.name) return;

    if (editMode) {
      // dispatch(updateTasbih(currentTasbih));
      const tasbihId = currentTasbih.id;
      const tasbihData = {
        name: currentTasbih.name,
        nameEnglish: currentTasbih.nameEnglish,
        count: currentTasbih.count,
        target: currentTasbih.target,
      };
      dispatch(saveOrUpdateTasbih({tasbihId, tasbihData}));
      ToastAndroid.show('Tasbih updated successfully', ToastAndroid.SHORT);
      handleEmptyTasbihInput();
    } else {
      let tasbihId = Date.now().toString();
      let tasbihData = {
        id: tasbihId,
        name: currentTasbih.name,
        nameEnglish: currentTasbih.nameEnglish,
        count: currentTasbih.count,
        target: currentTasbih.target,
      };
      dispatch(saveOrUpdateTasbih({tasbihId, tasbihData}));
      ToastAndroid.show('Tasbih added successfully', ToastAndroid.SHORT);
      handleEmptyTasbihInput();
    }

    setAddEditMode(false);
    setModalVisible(false);
  };

  const handleEditTasbih = tasbih => {
    setCurrentTasbih(tasbih);
    setAddEditMode(true);
    setEditMode(true);
    setModalVisible(true);
  };

  const handleDeleteTasbih = id => {
    dispatch(deleteTasbih(id));
    ToastAndroid.show('Tasbih deleted successfully', ToastAndroid.SHORT);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setAddEditMode(false);
    setShowTargetFrom(false);
    setEditMode(false);
    handleEmptyTasbihInput();
  };
  const handleSaveTargets = () => {
    let targetData = {
      ...targetTasbihFormValues,
    };
    if (
      targetTasbihFormValues.daily == '' ||
      targetTasbihFormValues.monthly == '' ||
      targetTasbihFormValues.monthly == ''
    ) {
      ToastAndroid.show('All fields are Required', ToastAndroid.SHORT);
      return;
    }
    dispatch(saveOrUpdateTarget({targetData}));
    ToastAndroid.show('Targets saved successfully', ToastAndroid.SHORT);
    setShowTargetFrom(false);
    setModalVisible(false);
  };

  return {
    search,
    tasbihs,
    modalVisible,
    editMode,
    addEditMode,
    currentTasbih,
    handleSearchChange,
    handleLinkPress,
    handleSaveTasbih,
    handleEditTasbih,
    handleDeleteTasbih,
    handleCancel,
    navigation,
    setAddEditMode,
    setCurrentTasbih,
    setModalVisible,
    tasbihTargets,
    onTasbihTargetChange,
    showTargetFrom,
    setShowTargetFrom,
    handleSaveTargets,
    totalCount,
    targetTasbihFormValues,
    setTargetTasbihFormValues,
    dailyProgress,
    weeklyProgress,
    monthlyProgress,
    filteredTasbihs,
  };
};

export default useTasbih;
