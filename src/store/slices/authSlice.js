import {createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {ToastAndroid} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

GoogleSignin.configure({
  webClientId:
    '602313098761-gmltt1q5vgdg4c2198p9sh20efs8nfek.apps.googleusercontent.com',
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateWishlist: (state, action) => {
      if (state.user) {
        state.user.wishlist = action.payload;
      }
    },
  },
});

export const {setUser, setLoading, setError, updateWishlist} =
  authSlice.actions;

// Initialize the auth state by checking if a user is already logged in
export const initializeAuthState = () => async dispatch => {
  dispatch(setLoading(true));
  // auth().onAuthStateChanged(async user => {
  //   if (user) {
  //     try {
  //       const userDoc = await firestore()
  //         .collection('users')
  //         .doc(user.uid)
  //         .get();
  //       const userData = userDoc.data();
  //       dispatch(
  //         setUser({
  //           displayName: userData?.displayName || '',
  //           email: userData?.email || '',
  //           location: userData?.location || '',
  //           description: userData?.description || '',
  //           photoURL: userData?.photoURL || '',
  //           wishlist: userData?.wishlist || [],
  //           PlanType: userData?.PlanType || '',
  //           // startDate: userData?.startDate || '',
  //           // expiryDate: userData?.expiryDate,
  //           startDate: userData?.startDate?.seconds
  //             ? new Date(userData.startDate.seconds * 1000).toISOString()
  //             : '', // Convert to ISO string
  //           expiryDate: userData?.expiryDate?.seconds
  //             ? new Date(userData.expiryDate.seconds * 1000).toISOString()
  //             : '',
  //         }),
  //       );
  //     } catch (error) {
  //       console.error('Failed to fetch user data: ', error);
  //       dispatch(setError(error.message));
  //     }
  //   } else {
  //     dispatch(setUser(null));
  //   }
  //   dispatch(setLoading(false));
  // });

  auth().onAuthStateChanged(async user => {
    if (user) {
      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const userData = userDoc.data();

        // Dispatch only serializable parts of the user data
        dispatch(
          setUser({
            displayName: userData?.displayName || '',
            email: userData?.email || '',
            photoURL: userData?.photoURL || '',
            location: userData?.location || '',
            description: userData?.description || '',
            wishlist: userData?.wishlist || [],
            PlanType: userData?.PlanType || '',
            startDate: userData?.startDate
              ? new Date(userData.startDate.seconds * 1000).toISOString()
              : '',
            expiryDate: userData?.expiryDate
              ? new Date(userData.expiryDate.seconds * 1000).toISOString()
              : '',
            // Keep only the necessary and serializable properties from Firebase user
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
          }),
        );
      } catch (error) {
        console.error('Failed to fetch user data: ', error);
        dispatch(setError(error.message));
      }
    } else {
      dispatch(setUser(null));
    }
  });
};

// Register a new user
export const registerUser =
  ({displayName, email, password}) =>
  async dispatch => {
    dispatch(setLoading(true));
    if (!displayName || !email || !password) {
      ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
      dispatch(setLoading(false));
      return;
    }
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          result.user.sendEmailVerification();
        });
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({displayName});
        await firestore().collection('users').doc(currentUser.uid).set({
          displayName,
          email,
        });
        dispatch(
          setUser({
            displayName,
            email,
          }),
        );
        ToastAndroid.show('User registered successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show('This email is already in use', ToastAndroid.SHORT);
      } else if (error.code === 'auth/invalid-email') {
        ToastAndroid.show('This email is invalid', ToastAndroid.SHORT);
      } else if (error.code === 'auth/weak-password') {
        ToastAndroid.show('Password is too weak', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Registration failed', ToastAndroid.SHORT);
      }
      console.error('Registration error: ', error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Login a user
export const loginUser =
  ({email, password}) =>
  async dispatch => {
    dispatch(setLoading(true));
    if (!email || !password) {
      ToastAndroid.show(
        'Please enter your email and password correctly',
        ToastAndroid.SHORT,
      );
      dispatch(setLoading(false));
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .get();
        const userData = userDoc.data();
        dispatch(
          setUser({
            displayName: userData?.displayName || '',
            email: userData?.email || '',
            location: userData?.location || '',
            description: userData?.description || '',
            photoURL: userData?.photoURL || '',
            wishlist: userData?.wishlist || [],
            PlanType: userData?.PlanType || '',
            // startDate: userData?.startDate || '',
            // expiryDate: userData?.expiryDate,
            startDate: userData?.startDate?.seconds
              ? new Date(userData.startDate.seconds * 1000).toISOString()
              : '', // Convert to ISO string
            expiryDate: userData?.expiryDate?.seconds
              ? new Date(userData.expiryDate.seconds * 1000).toISOString()
              : '',
          }),
        );
        ToastAndroid.show('User logged in!', ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        ToastAndroid.show('User not found', ToastAndroid.SHORT);
      } else if (error.code === 'auth/invalid-credential') {
        ToastAndroid.show('Invalid password or email', ToastAndroid.SHORT);
      } else if (error.code === 'auth/invalid-email') {
        ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Login failed', ToastAndroid.SHORT);
      }
      console.error('Login error: ', error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Update Profile with Image Upload
export const updateProfile =
  ({displayName, email, location, description, profileImage}) =>
  async dispatch => {
    dispatch(setLoading(true));
    try {
      const currentUser = auth().currentUser;
      let photoURL = currentUser.photoURL;

      if (currentUser) {
        // If a new image is provided, upload it to Firebase Storage
        if (profileImage) {
          const imagePath = `profile_pictures/${currentUser.uid}.jpg`;
          const reference = storage().ref(imagePath);
          await reference.putFile(profileImage.uri);
          photoURL = await reference.getDownloadURL();
        }

        // Update Firebase Auth profile
        await currentUser.updateProfile({displayName, photoURL});
        await currentUser.updateEmail(email);

        // Update Firestore document
        await firestore().collection('users').doc(currentUser.uid).update({
          displayName,
          email,
          location,
          description,
          photoURL,
        });

        // Dispatch updated user info to the store
        dispatch(
          setUser({
            displayName,
            email,
            location,
            description,
            photoURL,
          }),
        );

        ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Profile update error: ', error.message);
      dispatch(setError(error.message));
      if (error.code === 'auth/requires-recent-login') {
        ToastAndroid.show('Please re-login and try again', ToastAndroid.SHORT);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

// Add to Wishlist
export const addToWishlist = item => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {user} = getState().auth;
  const newWishlist = [...user.wishlist, item];

  try {
    await firestore().collection('users').doc(auth().currentUser?.uid).update({
      wishlist: newWishlist,
    });
    dispatch(updateWishlist(newWishlist));
    ToastAndroid.show('Item added to wishlist!', ToastAndroid.SHORT);
  } catch (error) {
    console.error('Error adding to wishlist: ', error.message);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Remove from Wishlist
export const removeFromWishlist = itemId => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {user} = getState().auth;
  const newWishlist = user.wishlist.filter(
    wishlistItem => wishlistItem?.data?.id !== itemId,
  );

  try {
    await firestore().collection('users').doc(auth().currentUser?.uid).update({
      wishlist: newWishlist,
    });
    dispatch(updateWishlist(newWishlist));
    ToastAndroid.show('Item removed from wishlist!', ToastAndroid.SHORT);
  } catch (error) {
    console.error('Error removing from wishlist: ', error.message);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const googleLoginUser = () => async dispatch => {
  dispatch(setLoading(true));

  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    const currentUser = userCredential.user;

    if (currentUser) {
      const userDocRef = firestore().collection('users').doc(currentUser.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        const newUser = {
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
        };
        await userDocRef.set(newUser);
        dispatch(setUser(newUser));
      } else {
        const userData = userDoc.data();
        dispatch(
          setUser({
            displayName: userData?.displayName || '',
            email: userData?.email || '',
            location: userData?.location || '',
            description: userData?.description || '',
            photoURL: userData?.photoURL || '',
            wishlist: userData?.wishlist || [],
            PlanType: userData?.PlanType || '',
            // startDate: userData?.startDate || '',
            // expiryDate: userData?.expiryDate,
            startDate: userData?.startDate?.seconds
              ? new Date(userData.startDate.seconds * 1000).toISOString()
              : '', // Convert to ISO string
            expiryDate: userData?.expiryDate?.seconds
              ? new Date(userData.expiryDate.seconds * 1000).toISOString()
              : '',
          }),
        );
      }

      ToastAndroid.show('Google login successful!', ToastAndroid.SHORT);
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      ToastAndroid.show('User not found', ToastAndroid.SHORT);
    } else if (error.code === 'auth/invalid-credential') {
      ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
    } else if (error.code === 'auth/invalid-email') {
      ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Google login failed', ToastAndroid.SHORT);
    }
    console.error('Google login error: ', error.message);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
