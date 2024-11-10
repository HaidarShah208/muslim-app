import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {initializeAuthState, setUser} from '../store/slices/authSlice';
import HomeScreen from '../screens/home/Index';
import WelcomeScreen1 from '../screens/starterScreens/WelcomeScreen1';
import WelcomeScreen2 from '../screens/starterScreens/WelcomeScreen2';
import RegisterScreen from '../screens/authScreens/signup/Index';
import LoginScreen from '../screens/authScreens/login/Index';
import ForgetPasswordScreen from '../screens/authScreens/forgetPassword/Index';
import QuranScreen from '../screens/quran/Index';
import MoreScreen from '../screens/more/Index';
import QiblaScreen from '../screens/qibla/Index';
import QuranPage from '../screens/quran/detailsScreen/QuranPage';
import GeneralSetting from '../screens/setting/Index';
import HadithSetting from '../screens/setting/HadithSetting/Index';
import PrayerTimeSetting from '../screens/setting/PyayerTimeSetting/Index';
import QuranSetting from '../screens/setting/QuranSetting/Index';
import CalendarSetting from '../screens/setting/calendar/Index';
import GallerySetting from '../screens/setting/gallery/Index';
import NamazTiming from '../screens/namazTimings/Index';
import HijriCalendar from '../screens/hijriCalendar/Index';
import HijriCalendarHome from '../screens/hijriCalendar/home';
import CalendarEvent from '../components/CalendarEvent';
import Tasbih from '../screens/tasbih/Index';
import TasbihDetailScreen from '../screens/tasbih/tasbihDetailScreen/TasbihDetailScreen';
import Mosque from '../screens/mosque';
import MosqueDetail from '../screens/mosque/mosqueDetail/MosqueDetail';
import {COLORS} from '../constants/COLORS';
import FindMosque from '../screens/mosque/findMosque/Index';
import MosqueDeatils from '../screens/mosque/findMosque/mosqueDetails/MosqueDeatils';
import ProfileScreen from '../screens/profile/userProfile';
import EditUser from '../screens/profile/editUser';
import WelcomeScreen3 from '../screens/starterScreens/Welcome3';
import WelcomeScreen4 from '../screens/starterScreens/Welcome4';
import WelcomeScreen5 from '../screens/starterScreens/Welcome5';
import HabitScreen from '../screens/starterScreens/HabitScreen';
import LocationScreen from '../screens/starterScreens/LocationScreen';
import BooksScreen from '../screens/bookCollection';
import CollectionsScreen from '../screens/bookCollection/CollectionScreen';
import ReadingNowScreen from '../screens/bookCollection/ReadingNow';
import ScreenStatics from '../screens/bookCollection/statScreen';
import BookScreen from '../screens/bookCollection/ReadScreen';
import ShowAllScreen from '../screens/bookCollection/showAllBook';
import PdfDetailScreen from '../screens/bookCollection/pdfDetailScreen';
import HadithBooks from '../screens/hadithScreens/Index';
import ChapterScreen from '../screens/hadithScreens/ChapterScreen/Index';
import HadeesScreen from '../screens/hadithScreens/hadithScreen/Index';
import ReadMore from '../screens/hadithScreens/readMore/Index';
import StarterMosque from '../screens/mosque/starterScreen';
import QuranWelcomeScreen from '../screens/quran/starterScreen/StarterScreen';
import QuranFontSelector from '../screens/quran/starterScreen/fontSelector';
import FontSizeAdjuster from '../screens/quran/starterScreen/fontsizeAdjuster';
import QuranTrackerScreen from '../screens/quran/starterScreen/trackerScreen';
import ChallengesScreen from '../screens/quran/starterScreen/ChallengeScreen';
import ReciterScreen from '../screens/quran/starterScreen/reciterScreen';
import TranslationScreen from '../screens/quran/starterScreen/languageSelection';
import ReminderScreen from '../screens/quran/starterScreen/reminderScreen';
import PricingScreen from '../screens/paymentPlans/PaymentPlanScreen';
import PaymentScreen from '../screens/paymentPlans/PaymentScreen';
import MainSearch from '../screens/hadithScreens/MainSearch/Index';
import DownnLoadScreen from '../screens/downloads/Index';

import BooksByCategoryScreen from '../screens/bookCollection/CollectionScreen';
import FavoriteBooksList from '../screens/bookCollection/favouriteBooksList';
import DisciplineBooksScreen from '../screens/bookCollection/disciplineBook';
import BoardsScreen from '../screens/gallery/Index';
import ImageGridScreen from '../screens/gallery/imageGridScreen';
import ImageDetailScreen from '../screens/gallery/imageDetailScreen';
import moment from 'moment';

import QuranBottom from '../assets/menuIcons/quranBottom.svg';
import TrackerBottom from '../assets/menuIcons/trackerBottom.svg';
import HidathBottom from '../assets/menuIcons/hidathBottom.svg';
import HomeBottom from '../assets/menuIcons/homeBottom.svg';
import MoreBottom from '../assets/menuIcons/moreBottom.svg';
import HomeFocused from '../assets/menuIcons/homeFocused.svg';
import QuranFocused from '../assets/menuIcons/quranFocused.svg';
import MoreFocused from '../assets/menuIcons/moreFocused.svg';
import HidathFocused from '../assets/menuIcons/hidathFocused.svg';
import QiblaFocus from '../assets/icons/qiblaTabIconGreen.svg';
import Qibla from '../assets/icons/qiblaTabIcon.svg';
import TermsAndPolices from '../screens/supportScreens/Terms&Polices';
import ReportProblem from '../screens/supportScreens/ReportProblem';
import {ActivityIndicator, Text, View} from 'react-native';
import BookmarkScreen from '../screens/bookmarks/Index';
import QuranBookmark from '../screens/bookmarks/quranBookmarks/Index';
import HadithBookmark from '../screens/bookmarks/hadithBookmarks/Index';
import GalleryBookmark from '../screens/bookmarks/galleryBookmarks/Index';
import MosqueBookmark from '../screens/bookmarks/mosqueBookmarks/Index';
import HelpCenter from '../screens/supportScreens/HelpCenter';
import {getFirestore} from '@react-native-firebase/firestore';
import Checkout from '../screens/paymentPlans/Checkout';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <HomeFocused width={30} height={30} />
              ) : (
                <HomeBottom width={22} height={22} />
              )}
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.PRIMARYGREEN : 'black',
                fontSize: 10,
              }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Hadith"
        component={HadithBooks}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <HidathFocused width={30} height={30} />
              ) : (
                <HidathBottom width={22} height={22} />
              )}
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.PRIMARYGREEN : 'black',
                fontSize: 10,
              }}>
              Hadith
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Quran"
        component={QuranScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <QuranFocused width={40} height={40} />
              ) : (
                <QuranBottom width={30} height={30} />
              )}
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.PRIMARYGREEN : 'black',
                fontSize: 10,
              }}>
              Quran
            </Text>
          ),
          tabBarIconStyle: {
            backgroundColor: ({focused}) =>
              focused ? COLORS.PRIMARYGREEN : '#888',
          },
        }}
      />
      <Tab.Screen
        name="qiblaScreen"
        component={QiblaScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <QiblaFocus width={30} height={30} />
              ) : (
                <Qibla width={22} height={22} />
              )}
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.PRIMARYGREEN : 'black',
                fontSize: 10,
              }}>
              Qibla
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <MoreFocused width={30} height={30} />
              ) : (
                <MoreBottom width={22} height={22} />
              )}
            </View>
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.PRIMARYGREEN : 'black',
                fontSize: 10,
              }}>
              More
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const user = useSelector(state => state?.auth?.user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setAuthUser(user);
      // dispatch(setUser(user));
      dispatch(initializeAuthState());
      if (initializing) setInitializing(false);
    });
    return subscriber; // Unsubscribe on unmount
  }, [initializing]);

  useEffect(() => {
    if (user?.PlanType) {
      const {PlanType, expiryDate} = user;
      const expiryTimestamp = new Date(expiryDate?.seconds * 1000);
      const currentDate = new Date();

      if (moment(currentDate).isAfter(expiryTimestamp)) {
        setShowPricing(true);
      } else {
        setShowPricing(false);
      }
    } else {
      setShowPricing(true);
    }
  }, [user]);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {authUser ? (
          <>
            {showPricing ? (
              <Stack.Screen
                name="Pricing"
                component={PricingScreen}
                options={{headerShown: false}}
              />
            ) : (
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{headerShown: false}}
              />
            )}

            {/* <Stack.Screen
              name="qiblaScreen"
              component={QiblaScreen}
              options={{headerShown: false}}
            /> */}
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QuranPage"
              component={QuranPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Pay"
              component={PricingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="generalSetting"
              component={GeneralSetting}
            />
            <Stack.Screen
              name="hadithSetting"
              component={HadithSetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="prayerTimeSetting"
              component={PrayerTimeSetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="quranSetting"
              component={QuranSetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="calendarSetting"
              component={CalendarSetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="gallerySetting"
              component={GallerySetting}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="namazTiming"
              component={NamazTiming}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="termAndPolices"
              component={TermsAndPolices}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="helpCenter"
              component={HelpCenter}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="hijriCalendarHome"
              component={HijriCalendarHome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="hijriCalendar"
              component={HijriCalendar}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="calendarEvent"
              component={CalendarEvent}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="tasbih"
              component={Tasbih}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="tasbihDetailScreen"
              component={TasbihDetailScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="mosqueStart"
              component={Mosque}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="mosque"
              component={StarterMosque}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="mosqueDetail"
              component={MosqueDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="findMosque"
              component={FindMosque}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="mosqueDetails"
              component={MosqueDeatils}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="profile"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="editUser"
              component={EditUser}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="book"
              component={BooksScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="collection"
              component={CollectionsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="readCollection"
              component={ReadingNowScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="charts"
              component={ScreenStatics}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="read"
              component={BookScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="showAll"
              component={ShowAllScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="PdfDetail"
              component={PdfDetailScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Hadith"
              component={HadithBooks}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HadithChapters"
              component={ChapterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HadithScreen"
              component={HadeesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MainSearch"
              component={MainSearch}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="readMore"
              component={ReadMore}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="reportProblem"
              component={ReportProblem}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="startQuran"
              component={QuranWelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="QuranFont"
              component={QuranFontSelector}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="fontAdjust"
              component={FontSizeAdjuster}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="trackQuran"
              component={QuranTrackerScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="challenge"
              component={ChallengesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Reciter"
              component={ReciterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Translation"
              component={TranslationScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Reminder"
              component={ReminderScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="bookmark"
              component={BookmarkScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="quranBookmark"
              component={QuranBookmark}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="hadithBookmark"
              component={HadithBookmark}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="galleryBookmark"
              component={GalleryBookmark}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="mosqueBookmark"
              component={MosqueBookmark}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cat"
              component={BooksByCategoryScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FavBook"
              component={FavoriteBooksList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DisciplineBooks"
              component={DisciplineBooksScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="gallery"
              component={BoardsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ImageGridScreen"
              component={ImageGridScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ImageDetail"
              component={ImageDetailScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="welcome"
              component={WelcomeScreen1}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="welcome2"
              component={WelcomeScreen2}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="welcome3"
              component={WelcomeScreen3}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="welcome4"
              component={WelcomeScreen4}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="welcome5"
              component={WelcomeScreen5}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="locationScreen"
              component={LocationScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="welcome6"
              component={HabitScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="forgetPassword"
              component={ForgetPasswordScreen}
              options={{headerShown: false}}
            />
            {/* Add other unauthenticated screens here */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
