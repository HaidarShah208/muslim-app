// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import FeatureMenu from '../../components/featureMenu';
// import MainNavigator from '../../components/MainNavigator';
// import SwiperComponent from '../../components/swiper';
// import {ScrollView} from 'react-native-gesture-handler';
// import {COLORS} from '../../constants/COLORS';

// const Index = () => {
//   return (
//     <ScrollView style={styles.scrollContainer}>
//       <View style={styles.container}>
//         <MainNavigator heading="Features" />
//         <SwiperComponent />
//         <FeatureMenu />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.PRIMARYWHITE,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: COLORS.PRIMARYWHITE,
//   },
// });

// export default Index;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import FeatureMenu from '../../components/featureMenu';
import MainNavigator from '../../components/MainNavigator';
import SwiperComponent from '../../components/swiper';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../constants/COLORS';
import HorizontalScrollMenu from '../../components/HorizontalScrollMenu';

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <MainNavigator heading="Features" />
        <SwiperComponent />
        {/* <FeatureMenu /> */}
        <HorizontalScrollMenu />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
});

export default Index;
