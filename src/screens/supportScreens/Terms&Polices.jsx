import {StyleSheet} from 'react-native';
import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import MainNavigator from '../../components/MainNavigator';
import {COLORS} from '../../constants/COLORS';

export default function TermsAndPolicies() {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <MainNavigator heading="Terms & Policies" />
          <View style={styles.main}>
            {/* Section 1: Introduction */}
            <Text style={styles.heading}>1. Introduction</Text>
            <Text style={styles.description}>
              Welcome to our platform. By accessing or using our services, you
              agree to comply with and be bound by the following terms and
              policies. Please review these carefully before using our app. If
              you do not agree with these terms, you should not use our
              services.
            </Text>

            {/* Section 2: User Responsibilities */}
            <Text style={styles.heading}>2. User Responsibilities</Text>
            <Text style={styles.description}>
              As a user, you agree to use our app responsibly and in compliance
              with all applicable laws and regulations. You are solely
              responsible for the content you upload or share on the platform.
              Any illegal or unauthorized activities, including but not limited
              to hacking, fraud, or harassment, are strictly prohibited.
            </Text>

            {/* Section 3: Privacy and Data Usage */}
            <Text style={styles.heading}>3. Privacy and Data Usage</Text>
            <Text style={styles.description}>
              We are committed to protecting your privacy. We collect and use
              your data in accordance with our Privacy Policy. By using the app,
              you consent to the collection and use of your personal data for
              providing and improving our services. For more details on how we
              handle your data, please refer to our Privacy Policy.
            </Text>

            {/* Section 4: Intellectual Property */}
            <Text style={styles.heading}>4. Intellectual Property</Text>
            <Text style={styles.description}>
              All content, designs, logos, and materials on this platform are
              the intellectual property of our company and are protected by
              copyright laws. You may not reproduce, distribute, or use any
              materials without our explicit permission.
            </Text>

            {/* Section 5: Termination of Use */}
            <Text style={styles.heading}>5. Termination of Use</Text>
            <Text style={styles.description}>
              We reserve the right to terminate or suspend your access to the
              app without prior notice if we believe you have violated these
              terms or engaged in any unlawful or harmful activities. Upon
              termination, your right to use the app will immediately cease.
            </Text>

            {/* Section 6: Changes to Terms */}
            <Text style={styles.heading}>6. Changes to Terms and Policies</Text>
            <Text style={styles.description}>
              We may update these terms and policies from time to time. Any
              changes will be posted on this page, and your continued use of the
              app constitutes acceptance of the revised terms. We encourage you
              to review this page periodically for any updates.
            </Text>

            {/* Section 7: Contact Us */}
            <Text style={styles.heading}>7. Contact Us</Text>
            <Text style={styles.description}>
              If you have any questions or concerns regarding these terms and
              policies, please feel free to contact our support team at
              support@example.com.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  main: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'justify',
    color: COLORS.BLACK,
    marginBottom: 20,
  },
});
