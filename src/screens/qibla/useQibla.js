import React, {useState, useEffect} from 'react';
import CompassHeading from 'react-native-compass-heading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pointer1 from '../../assets/icons/pointer1.svg';
import Pointer2 from '../../assets/icons/pointer2.svg';
import Pointer3 from '../../assets/icons/pointer3.svg';
import Pointer4 from '../../assets/icons/pointer4.svg';
import Pointer5 from '../../assets/icons/pointer4.svg';

const useQibla = () => {
  const [compassHeading, setCompassHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [distanceToKaaba, setDistanceToKaaba] = useState(0);
  const [location, setLocation] = useState();
  const [isAligned, setIsAligned] = useState(false);
  const [image, setImage] = useState({
    uri: require('../../assets/images/compass1.png'),
    // pointer: require('../../assets/images/qibla.png'),
    pointer: Pointer1,
    kaaba: true,
    road: true,
  });
  const [difference, setDifference] = useState(0);
  useEffect(() => {
    const degree_update_rate = 1;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setCompassHeading(heading);
    });

    const getLocation = async () => {
      const currentLocation = await AsyncStorage.getItem('location');
      const parsedLocation = JSON.parse(currentLocation);
      setLocation(parsedLocation);
      calculateQiblaDirection(
        parsedLocation.latitude,
        parsedLocation.longitude,
      );
      calculateDistanceToKaaba(
        parsedLocation.latitude,
        parsedLocation.longitude,
      );
    };

    getLocation();

    return () => {
      CompassHeading.stop();
    };
  }, [compassHeading]);
  useEffect(() => {
    // Calculate the difference between the heading and Qibla direction
    const diff = Math.abs(qiblaDirection - compassHeading);
    const adjustedDiff = diff > 360 ? 360 - diff : diff;
    setDifference(adjustedDiff);
  }, [compassHeading, qiblaDirection]);
  useEffect(() => {
    if (difference >= -1 && difference <= 5) {
      setIsAligned(true);
    } else {
      setIsAligned(false);
    }
  }, [difference]);

  const changeImage = value => {
    switch (value) {
      case 1:
        setImage({
          uri: require('../../assets/images/compass1.png'),
          pointer: Pointer1,
          kaaba: true,
          road: true,
        });
        break;
      case 2:
        setImage({
          uri: require('../../assets/images/Compass2.png'),
          pointer: Pointer2,
          kaaba: false,
          position: true,
          road: false,
        });
        break;
      case 3:
        setImage({
          uri: require('../../assets/images/compass1.png'),
          pointer: Pointer3,
          kaaba: false,
          road: false,
        });
        break;
      case 4:
        setImage({
          uri: require('../../assets/images/compass4.png'),
          pointer: Pointer4,
          kaaba: false,
          road: false,
        });
        break;
      case 5:
        setImage({
          uri: require('../../assets/images/compass5.png'),
          pointer: Pointer5,
          kaaba: false,
          road: false,
        });

        break;
      default:
        setImage({
          uri: require('../../assets/images/compass1.png'),
          pointer: Pointer1,
          kaaba: true,
          road: true,
        });
    }
  };

  const calculateQiblaDirection = (latitude, longitude) => {
    const PI = Math.PI;
    const latk = (21.4225 * PI) / 180.0; // Kaaba latitude
    const longk = (39.8264 * PI) / 180.0; // Kaaba longitude
    const phi = (latitude * PI) / 180.0;
    const lambda = (longitude * PI) / 180.0;

    const qiblaDirection =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );

    setQiblaDirection((qiblaDirection + 360) % 360); // Ensure the angle is in 0-360 range
  };

  const calculateDistanceToKaaba = (latitude, longitude) => {
    const toRadians = degrees => degrees * (Math.PI / 180);
    const earthRadiusMiles = 3958.8; // Earth's radius in miles

    const lat1 = toRadians(latitude);
    const lon1 = toRadians(longitude);
    const lat2 = toRadians(21.4225); // Latitude of Kaaba
    const lon2 = toRadians(39.8262); // Longitude of Kaaba

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusMiles * c;
    setDistanceToKaaba(distance);
  };

  return {
    compassHeading,
    distanceToKaaba,
    location,
    image,
    setImage,
    difference,
    qiblaDirection,
    isAligned,
    changeImage,
  };
};

export default useQibla;
