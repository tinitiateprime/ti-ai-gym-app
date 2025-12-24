import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import TimerComponent from '../../components/TimerComponent';

const CALORIES_PER_SET = 12;

export default function ProWorkoutScreen({ route, navigation }) {
  const { workout } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const steps = [
    { label: 'Start Set 1', duration: 45, type: 'set' },
    { label: 'Break - 1 min', duration: 60, type: 'break' },
    { label: 'Start Set 2', duration: 45, type: 'set' },
    { label: 'Break - 1 min', duration: 60, type: 'break' },
    { label: 'Start Set 3', duration: 60, type: 'set' },
    { label: 'Break - 1 min', duration: 60, type: 'break' },
    { label: 'Start Set 4', duration: 60, type: 'set' },
    { label: 'Break - 1 min', duration: 60, type: 'break' },
    { label: 'Start Set 5', duration: 75, type: 'set' },
  ];

  const handleComplete = () => {
    const current = steps[currentStep - 1];

    if (current?.type === 'set') {
      setCaloriesBurned((prev) => prev + CALORIES_PER_SET);
    }

    const nextStep = currentStep + 1;

    if (nextStep <= steps.length) {
      const next = steps[nextStep - 1];

      if (next.type === 'break') {
        Alert.alert('💪 Set Complete!', 'Take a break for 1 min.');
      } else if (next.type === 'set') {
        Alert.alert('🔥 Break Over!', `Get ready for ${next.label}`);
      }

      setCurrentStep(nextStep);
    } else {
      Alert.alert(
        '🏆 Pro Workout Complete!',
        `You burned a total of 🔥 ${caloriesBurned + CALORIES_PER_SET} calories!`
      );
      navigation.goBack();
    }
  };

  const current = steps[currentStep - 1];
  const remainingSteps = steps.length - currentStep;
  const currentSetNumber = Math.floor((currentStep + 1) / 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 {workout.name} - Pro Mode</Text>
      <Text style={styles.subTitle}>💪 High Intensity Training</Text>
      <Text style={styles.stepLabel}>{current.label}</Text>

      <View style={styles.timerBox}>
        <TimerComponent duration={current.duration} onComplete={handleComplete} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>✅ Set: {currentSetNumber}</Text>
        <Text style={styles.infoText}>🔥 Calories: {caloriesBurned}</Text>
        <Text style={styles.remainingText}>
          {remainingSteps > 0
            ? `⏳ ${remainingSteps} step(s) left`
            : '🎯 Final Set – Push Hard!'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0e0e0e',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#f94d6a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    color: '#ffffff99',
    marginTop: 6,
    marginBottom: 20,
    textAlign: 'center',
  },
  stepLabel: {
    fontSize: 22,
    color: '#ffffffcc',
    textAlign: 'center',
    marginBottom: 24,
  },
  timerBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#f94d6a',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 12,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#eee',
    fontSize: 16,
    marginTop: 8,
  },
  remainingText: {
    color: '#f94d6a',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
});
