import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import MainNavigator from '../../components/MainNavigator';
import {COLORS} from '../../constants/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HelpCenter() {
  // Extended FAQ data
  const faqData = [
    {
      question: 'How can I reset my password?',
      answer:
        'To reset your password, go to the settings page and select "Reset Password".',
    },
    {
      question: 'How do I report a problem?',
      answer:
        'You can report a problem by clicking the link below or contacting our support team via email.',
    },
    {
      question: 'How do I change my notification settings?',
      answer:
        'Navigate to the settings menu and select "Notification Settings" to make changes.',
    },
    {
      question: 'How do I find a nearby mosque?',
      answer:
        'Use the mosque finder feature under the "Find Mosques" tab in the app to locate mosques near you.',
    },
    {
      question: 'How do I enable location services?',
      answer:
        'Go to your device settings, find our app, and enable location services to use features like the mosque finder and Qibla direction.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can reach our support team via email at support@example.com for any inquiries or assistance.',
    },
  ];

  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleQuestionPress = index => {
    if (index === expandedQuestion) {
      setExpandedQuestion(null); // Collapse if already expanded
    } else {
      setExpandedQuestion(index); // Expand the selected question
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MainNavigator heading="Help & Support" />

          <View style={styles.main}>
            {/* Report a problem */}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('mailto:kudu.appdevelopment@gmail.com')
              }>
              <Text style={styles.linkText}>Report a Problem</Text>
            </TouchableOpacity>

            {/* FAQ Section */}
            <View style={styles.faqContainer}>
              <Text style={styles.subHeading}>Frequently Asked Questions</Text>
              {faqData.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.questionContainer}
                    onPress={() => handleQuestionPress(index)}>
                    <Text style={styles.questionText}>{faq.question}</Text>
                    <Icon
                      name={
                        expandedQuestion === index
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={24}
                      color={COLORS.BLACK}
                    />
                  </TouchableOpacity>
                  {expandedQuestion === index && (
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARYWHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 15,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARYGREEN,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  faqContainer: {
    marginTop: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 15,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  answerText: {
    fontSize: 14,
    color: COLORS.GRAY,
    marginTop: 10,
    paddingLeft: 10,
  },
});
