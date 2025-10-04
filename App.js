// App.js - German Flashcard App for React Native
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Force Roboto as default
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: 'Roboto' };

const { width } = Dimensions.get('window');

// Main App Component
export default function GermanFlashcardApp() {
  const [currentScreen, setCurrentScreen] = useState('front');
  const [points, setPoints] = useState(150);
  const [level, setLevel] = useState(3);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'front':
        return <FrontScreen points={points} setCurrentScreen={setCurrentScreen} />;
      case 'back':
        return <BackScreen level={level} setPoints={setPoints} points={points} setCurrentScreen={setCurrentScreen} />;
      case 'achievements':
        return <AchievementsScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <FrontScreen points={points} setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      <NavBar active={currentScreen} setCurrentScreen={setCurrentScreen} />
    </SafeAreaView>
    </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

// Front Screen Component
function FrontScreen({ points, setCurrentScreen }) {
  const words = [
    { word: 'TOMORROW', type: 'Adverb', color: '#F6AD55' },
    { word: 'DRIVE', type: 'Verb', color: '#FC8181' },
    { word: 'WE', type: 'Pronoun', color: '#63B3ED' },
    { word: 'TO', type: 'Prep.', color: '#68D391' },
    { word: 'BERLIN', type: 'Noun', color: '#FAF089' }
  ];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FRONT SIDE</Text>
        <Text style={styles.headerPoints}>⭐ {points} pts</Text>
      </View>

      {/* Sentence */}
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentenceText}>Tomorrow we drive to Berlin.</Text>
      </View>

      {/* Listen Button */}
      <TouchableOpacity style={styles.listenButton} onPress={() => console.log('Play English')}>
        <Text style={styles.buttonText}>🔊 Listen (English)</Text>
      </TouchableOpacity>

      {/* Label */}
      <Text style={styles.sectionLabel}>Literal English to German Word Order:</Text>

      {/* Word Grid */}
      <View style={styles.wordGrid}>
        {words.map((item, index) => (
          <View key={index} style={[styles.wordBox, { backgroundColor: item.color }]}>
            <Text style={styles.wordText}>{item.word}</Text>
            <Text style={styles.wordType}>{item.type}</Text>
          </View>
        ))}
      </View>

      {/* Analysis Box */}
      <View style={styles.analysisBox}>
        <Text style={styles.analysisTitle}>Analyse the sentence</Text>
        
        <Text style={styles.analysisLabel}>Clause type:</Text>
        <View style={styles.dropdownPlaceholder}>
          <Text style={styles.dropdownText}>Main clause</Text>
        </View>

        <Text style={styles.analysisLabel}>Case type:</Text>
        <View style={styles.caseGrid}>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Nominative</Text>
          </View>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Nominative</Text>
          </View>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Nominative</Text>
          </View>
        </View>

        <Text style={styles.analysisLabel}>German Sentence structure:</Text>
        <View style={styles.structureGrid}>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Time</Text>
          </View>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Verb</Text>
          </View>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Subject</Text>
          </View>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Object</Text>
          </View>
        </View>

        <View style={styles.complementContainer}>
          <View style={styles.dropdownSmall}>
            <Text style={styles.dropdownText}>Complement</Text>
          </View>
        </View>
      </View>

      {/* Flip Button */}
      <TouchableOpacity style={styles.flipButton} onPress={() => setCurrentScreen('back')}>
        <Text style={styles.flipButtonText}>🔄 Flip to Back</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// Back Screen Component
function BackScreen({ level, setPoints, points, setCurrentScreen }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordFeedback, setRecordFeedback] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);

  const germanWords = [
    { word: 'Morgen', type: 'Adverb', color: '#F6AD55' },
    { word: 'fahren', type: 'Verb', color: '#FC8181' },
    { word: 'wir', type: 'Pronoun', color: '#63B3ED' },
    { word: 'nach', type: 'Preposition', color: '#68D391' },
    { word: 'Berlin', type: 'Noun', color: '#FAF089' }
  ];

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordFeedback('✅ Good job! 85% accurate');
    }, 3000);
  };

  const handleCheckAnswer = () => {
    const answer = userAnswer.toLowerCase();
    if (answer.includes('morgen') || answer.includes('fahren') || answer.includes('wir')) {
      setAnswerFeedback('✅ Correct! +50 pts');
      setTaskCompleted(true);
      setPoints(points + 50);
    } else {
      setAnswerFeedback('❌ Try again!');
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BACK SIDE - ANSWER</Text>
        <Text style={styles.headerPoints}>🏆 Level {level}!</Text>
      </View>

      {/* Listen Button */}
      <TouchableOpacity style={styles.listenButton} onPress={() => console.log('Play German')}>
        <Text style={styles.buttonText}>🔊 Listen (German)</Text>
      </TouchableOpacity>

      {/* Translation Box */}
      <View style={styles.translationBox}>
        <Text style={styles.sectionTitle}>Actual German Translation:</Text>
        <View style={styles.germanWordGrid}>
          {germanWords.map((item, index) => (
            <View key={index} style={styles.germanWordContainer}>
              <Text style={styles.germanWord}>{item.word}</Text>
              <Text style={[styles.germanType, { color: item.color }]}>{item.type}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Speech Test Box */}
      <View style={styles.speechBox}>
        <Text style={styles.sectionTitle}>Speech Test:</Text>
        <Text style={styles.speechInstruction}>
          Press the record button and repeat the sentence.
        </Text>
        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={handleRecord}
          disabled={isRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? '⏸ Recording...' : '🎤 Click to record'}
          </Text>
        </TouchableOpacity>
        {recordFeedback ? (
          <Text style={styles.feedbackSuccess}>{recordFeedback}</Text>
        ) : null}
        <Text style={styles.helperText}>
          A pronunciation test, the word would be temporarily stored and after{'\n'}
          the AI analyze your pronunciation compared to the original, you get a{'\n'}
          feedback and then the record is deleted
        </Text>
      </View>

      {/* Correct Analysis */}
      <View style={styles.analysisResultBox}>
        <Text style={styles.sectionTitle}>Correct Analysis:</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>MAIN{'\n'}SENTENCE</Text>
          </View>
          <Text style={styles.badgeDescription}>
            This is a declarative main clause with{'\n'}subject-verb word order.
          </Text>
        </View>
      </View>

      {/* Detailed Analysis */}
      <View style={styles.detailedBox}>
        <Text style={styles.sectionTitle}>Detailed Analysis:</Text>
        <Text style={styles.detailedText}>
          <Text style={styles.bold}>Sentence Type:</Text> main clause (Subject-first sentence){'\n\n'}
          <Text style={styles.bold}>German Structure:</Text> Time adverb → Verb → Subject → Object/Complement{'\n\n'}
          <Text style={styles.bold}>Case type and why:</Text> Nominative case for "wir" (subject), accusative case not applicable here, dative case not applicable here.{'\n\n'}
          <Text style={styles.bold}>Key Difference:</Text> In German, when starting with a time adverb, the verb comes before the subject (inverted word order).
        </Text>
      </View>

      {/* Task Box */}
      <View style={styles.taskBox}>
        <Text style={styles.sectionTitle}>Task:</Text>
        <Text style={styles.taskInstruction}>
          Try making your own sentence using the same pattern! (Use a{'\n'}
          time adverb + verb + subject + destination)
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type your answer here:"
          value={userAnswer}
          onChangeText={setUserAnswer}
          multiline
        />
        <View style={styles.taskButtonRow}>
          <TouchableOpacity style={styles.checkButton} onPress={handleCheckAnswer}>
            <Text style={styles.buttonText}>Check Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToFrontButton} onPress={() => setCurrentScreen('front')}>
            <Text style={styles.backToFrontText}>Back to Front</Text>
          </TouchableOpacity>
        </View>
        {answerFeedback ? (
          <Text style={answerFeedback.includes('✅') ? styles.feedbackSuccess : styles.feedbackError}>
            {answerFeedback}
          </Text>
        ) : null}
        {taskCompleted && (
          <View style={styles.completedRow}>
            <Text style={styles.completedIcon}>✅</Text>
            <Text style={styles.completedText}>Task Completed! +50 pts</Text>
          </View>
        )}
        <Text style={styles.helperText}>
          You type your answer into the field provided below and the AI analyzes{'\n'}
          it for correction, if correct you get a feedback if it is good or wrong
        </Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// Achievements Screen Component
function AchievementsScreen({ setCurrentScreen }) {
  const achievements = [
    { icon: '🏆', title: 'Word Master', desc: 'Translate 50 words', color: '#FFD700' },
    { icon: '✅', title: 'Grammar Guru', desc: '90% accuracy', color: '#10B981' },
    { icon: '⚡', title: 'Speed Demon', desc: 'Lesson in 2 mins', color: '#FF4500' },
    { icon: '🎓', title: 'Language Learner', desc: '10 lessons done', color: '#6B46C1' }
  ];

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitleLarge}>ACHIEVEMENTS</Text>
      </View>

      <Text style={styles.achievementsSectionTitle}>Your Achievements</Text>

      {/* Achievements Grid */}
      <View style={styles.achievementsGrid}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.achievementCard}>
            <Text style={[styles.achievementIcon, { color: item.color }]}>{item.icon}</Text>
            <Text style={styles.achievementTitle}>{item.title}</Text>
            <Text style={styles.achievementDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.achievementsSectionTitle}>Your Progress</Text>

      {/* Progress Box */}
      <View style={styles.progressBox}>
        <Text style={styles.progressLabel}>Vocabulary Mastery: 75%</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '75%', backgroundColor: '#6B46C1' }]} />
        </View>

        <Text style={styles.progressLabel}>Grammar Accuracy: 92%</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '92%', backgroundColor: '#10B981' }]} />
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButtonLarge} onPress={() => setCurrentScreen('front')}>
        <Text style={styles.buttonText}>← Back to Front</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// Navigation Bar Component
function NavBar({ active, setCurrentScreen }) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity 
        style={[styles.navButton, active === 'front' && styles.navButtonActive]}
        onPress={() => setCurrentScreen('front')}
      >
        <Text style={styles.navButtonText}>⚡{'\n'}Front</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.navButton, active === 'back' && styles.navButtonActive]}
        onPress={() => setCurrentScreen('back')}
      >
        <Text style={styles.navButtonText}>📚{'\n'}Back</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.navButton, active === 'achievements' && styles.navButtonActive]}
        onPress={() => setCurrentScreen('achievements')}
      >
        <Text style={styles.navButtonText}>🏆{'\n'}Achievements</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#6B46C1',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitleLarge: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerPoints: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sentenceContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sentenceText: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  listenButton: {
    backgroundColor: '#6B46C1',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingTop: 10,
    color: '#4A5568',
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  wordBox: {
    width: (width - 60) / 5,
    padding: 5,
    margin: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  wordText: {
    fontFamily: 'Nunito',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  wordType: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
  },
  analysisBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  analysisTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4A5568',
  },
  analysisLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 5,
    color: '#4A5568',
  },
  dropdownPlaceholder: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownText: {
    fontSize: 11,
    color: '#2D3748',
  },
  caseGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  structureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dropdownSmall: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flex: 1,
    margin: 2,
    alignItems: 'center',
    minWidth: 70,
  },
  complementContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  flipButton: {
    backgroundColor: '#E2E8F0',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  flipButtonText: {
    color: '#6B46C1',
    fontSize: 14,
    fontWeight: 'bold',
  },
  translationBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A5568',
  },
  germanWordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  germanWordContainer: {
    width: (width - 60) / 5,
    alignItems: 'center',
    margin: 4,
  },
  germanWord: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  germanType: {
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 2,
  },
  speechBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  speechInstruction: {
    fontSize: 10,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 10,
  },
  recordButton: {
    backgroundColor: '#4299E1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  recordButtonActive: {
    backgroundColor: '#2C5282',
  },
  feedbackSuccess: {
    color: '#32CD32',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
  feedbackError: {
    color: '#FF4500',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 8,
    color: '#A0AEC0',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 12,
  },
  analysisResultBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#0BC5EA',
    padding: 10,
    borderRadius: 8,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 10,
    color: '#4A5568',
    flex: 1,
    marginLeft: 10,
    lineHeight: 14,
  },
  detailedBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  detailedText: {
    fontSize: 9,
    color: '#2D3748',
    lineHeight: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  taskBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  taskInstruction: {
    fontSize: 10,
    textAlign: 'center',
    color: '#4A5568',
    marginBottom: 10,
    lineHeight: 14,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    height: 70,
    textAlignVertical: 'top',
    fontSize: 12,
    marginBottom: 10,
  },
  taskButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkButton: {
    backgroundColor: '#6B46C1',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  backToFrontButton: {
    backgroundColor: '#E2E8F0',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  backToFrontText: {
    color: '#6B46C1',
    fontSize: 13,
    fontWeight: 'bold',
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  completedIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  completedText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  achievementsSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color: '#2D3748',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: '#F7FAFC',
    width: (width - 40) / 2 - 5,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 36,
    marginBottom: 5,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#2D3748',
  },
  achievementDesc: {
    fontSize: 10,
    textAlign: 'center',
    color: '#718096',
  },
  progressBox: {
    backgroundColor: '#F7FAFC',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  progressLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2D3748',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  backButtonLarge: {
    backgroundColor: '#6B46C1',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 5,
  },
  navButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#A0AEC0',
    margin: 5,
    borderRadius: 8,
  },
  navButtonActive: {
    backgroundColor: '#6B46C1',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
