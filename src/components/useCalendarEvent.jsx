import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addEvent, handleUpdateEvent} from '../store/slices/eventSlice';
import {Alert} from 'react-native';

const useCalendarEvent = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const events = useSelector(state => state.events.events);
  const navigation = useNavigation();
  const route = useRoute();
  const {day, id} = route.params;
  const email = user?.email;
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');
  const [video, setVideo] = useState('');
  const [attach, setAttachment] = useState('');
  const [invites, setInvites] = useState('');
  const [world, setWorld] = useState('');
  const [category, setCategory] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [eventid, setEventId] = useState('');
  const [time, setTime] = useState(new Date());
  const [endtime, setEndTime] = useState(new Date());
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const event = events.find(event => event.id === id);
      if (event) {
        setEventId(event.id);
        setTitle(event.title);
        setLocation(event.location);
        setType(event.type);
        setNotes(event.notes);
        setVideo(event.video);
        setAttachment(event.attach);
        setInvites(event.invites);
        setWorld(event.world);
        setCategory(event.category);
        setIsEnabled(event.allDay);
        setNotification(event.notification);
        setTime(new Date());
        setEndTime(new Date());
      }
    }
  }, [id, events]);

  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  const handleSave = async () => {
    setLoading(true);
    const newEvent = {
      id: eventid || `${Date.now()}-${Math.random()}`,
      title,
      location,
      type,
      email: user?.email,
      notes,
      video,
      attach,
      invites,
      world,
      category,
      day,
      time: time.toTimeString().slice(0, 5),
      endtime: endtime.toTimeString().slice(0, 5),
      allDay: isEnabled,
      notification,
    };

    try {
      if (id) {
        dispatch(handleUpdateEvent(newEvent, navigation.goBack));
      } else {
        dispatch(addEvent(newEvent, navigation.goBack));
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the event.');
    } finally {
      setLoading(false);  
    }
  };

  return {
    title,
    setTitle,
    location,
    setLocation,
    type,
    setType,
    notes,
    setNotes,
    video,
    setVideo,
    attach,
    setAttachment,
    invites,
    setInvites,
    world,
    setWorld,
    category,
    setCategory,
    isEnabled,
    toggleSwitch,
    time,
    setTime,
    endtime,
    setEndTime,
    handleSave,
    notification,
    setNotification,
    email,
    day,
    loading
  };
};

export default useCalendarEvent;
