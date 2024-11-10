import Geolocation from 'react-native-geolocation-service';
import {
  SensorTypes,
  setUpdateIntervalForType,
  magnetometer,
} from 'react-native-sensors';
import PropTypes from 'prop-types';
import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const useQiblaCompass = () => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometerData, setMagnetometerData] = useState(0);
  const [qiblad, setQiblad] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const initCompass = useCallback(async () => {
    const permission = await requestLocationPermission();
    if (!permission) {
      setError('Location permission not granted');
      setIsLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        calculate(latitude, longitude);
        subscribe();
        setIsLoading(false);
      },
      error => {
        setError(error.message);
        setIsLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    initCompass();

    return () => {
      unsubscribe();
    };
  }, []);

  const subscribe = () => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 100);
    const subscription = magnetometer.subscribe(
      data => {
        setMagnetometerData(angle(data));
      },
      error => {
        setError(error.message);
      },
    );
    setSubscription(subscription);
  };

  const unsubscribe = () => {
    subscription && subscription.unsubscribe();
    setSubscription(null);
  };

  const angle = magnetometer => {
    let angle = 0;
    if (magnetometer) {
      const {x, y} = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const direction = degree => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    } else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    } else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    } else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    } else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    } else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    } else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    } else {
      return 'N';
    }
  };

  const degree = magnetometer => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const calculate = (latitude, longitude) => {
    const PI = Math.PI;
    const latk = (21.4225 * PI) / 180.0;
    const longk = (39.8264 * PI) / 180.0;
    const phi = (latitude * PI) / 180.0;
    const lambda = (longitude * PI) / 180.0;
    const qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );
    setQiblad(qiblad);
  };

  const compassDirection = direction(degree(magnetometerData));
  const compassDegree = degree(magnetometerData);
  const compassRotate = 360 - degree(magnetometerData);
  const kabaRotate = 360 - degree(magnetometerData) + qiblad;

  return {
    qiblad,
    compassDirection,
    compassDegree,
    compassRotate,
    kabaRotate,
    error,
    isLoading,
    reinitCompass: initCompass,
  };
};

const QiblaCompass = forwardRef(
  (
    {
      backgroundColor = 'transparent',
      color = '#000',
      textStyles = {},
      compassImage,
      kaabaImage,
    },
    ref,
  ) => {
    const {
      qiblad,
      compassDirection,
      compassDegree,
      compassRotate,
      kabaRotate,
      error,
      isLoading,
      reinitCompass,
    } = useQiblaCompass();

    useImperativeHandle(
      ref,
      () => {
        return {
          reinitCompass,
        };
      },
      [],
    );

    if (isLoading) {
      return (
        <View style={[styles.container, {backgroundColor}]}>
          <ActivityIndicator size={50} color={color} />
        </View>
      );
    }

    return (
      <View style={[styles.container, {backgroundColor}]}>
        {error && (
          <Text
            style={{
              color: '#f00',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingHorizontal: 20,
              fontSize: moderateScale(16, 0.25),
              ...textStyles,
            }}>
            Error: {error}
          </Text>
        )}
        <View style={styles.direction}>
          <Text style={[styles.directionText, {color, ...textStyles}]}>
            {compassDirection}
          </Text>
          <Text style={[styles.directionText, {color, ...textStyles}]}>
            {compassDegree}°
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: moderateScale(300, 0.25),
            position: 'relative',
          }}>
          <Image
            source={compassImage || require('../assets/images/compass.png')}
            style={[
              styles.image,
              {
                transform: [
                  {
                    rotate: `${compassRotate}deg`,
                  },
                ],
                zIndex: 100,
              },
            ]}
          />
          <View
            style={{
              width: moderateScale(300, 0.25),
              height: moderateScale(300, 0.25),
              position: 'absolute',
              alignSelf: 'center',
              transform: [
                {
                  rotate: `${kabaRotate}deg`,
                },
              ],
              flexDirection: 'row',
              justifyContent: 'center',
              zIndex: 999,
              elevation: 999,
            }}>
            <Image
              source={kaabaImage || require('../assets/icons/qibla.png')}
              style={{
                resizeMode: 'center',
                height: 100,
                width: 40,
                zIndex: 1000,
              }}
            />
          </View>
        </View>
        <View style={styles.qiblaDirection}>
          <Image
            source={require('../assets/icons/qibla.png')}
            style={{
              width: moderateScale(35, 0.25),
              height: moderateScale(35, 0.25),
            }}
          />
          <Text style={[styles.directionText, {color, ...textStyles}]}>
            {qiblad.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  },
);

QiblaCompass.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  textStyles: PropTypes.object,
  compassImage: PropTypes.any,
  kaabaImage: PropTypes.any,
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    width: moderateScale(300, 0.25),
    height: moderateScale(300, 0.25),
  },
  container: {
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  direction: {
    textAlign: 'center',
    zIndex: 300,
  },
  directionText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#468773',
  },
  qiblaDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QiblaCompass;
