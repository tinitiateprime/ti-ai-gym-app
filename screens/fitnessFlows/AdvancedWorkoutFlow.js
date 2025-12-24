import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TimerComponent from '../../components/TimerComponent';

const CALORIES_PER_SET = 20;

export default function AdvancedWorkoutFlow({ route, navigation }) {
  const { workout } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const steps = [
    { label: 'Crush Set 1', duration: 30, type: 'set' },
    { label: 'Quick Break', duration: 40, type: 'break' },
    { label: 'Crush Set 2', duration: 30, type: 'set' },
    { label: 'Quick Break', duration: 40, type: 'break' },
    { label: 'Crush Set 3', duration: 30, type: 'set' },
    { label: 'Quick Break', duration: 40, type: 'break' },
    { label: 'Crush Set 4', duration: 30, type: 'set' },
    { label: 'Quick Break', duration: 40, type: 'break' },
    { label: 'Final Set 5 🔥', duration: 30, type: 'set' },
  ];

  const handleComplete = () => {
    const current = steps[currentStep - 1];

    if (current.type === 'set') {
      setCaloriesBurned((prev) => prev + CALORIES_PER_SET);
    }

    const nextStep = currentStep + 1;

    if (nextStep <= steps.length) {
      const next = steps[nextStep - 1];

      if (next.type === 'break') {
        Alert.alert('💪 Set Done!', 'Grab a sip of water. Break for 40 seconds!');
      } else if (next.type === 'set') {
        Alert.alert('🚀 Break Over!', 'Let’s smash the next set!');
      }

      setCurrentStep(nextStep);
    } else {
      Alert.alert(
        '🏆 Advanced Workout Complete!',
        `🔥 You completed all sets and burned ${caloriesBurned + CALORIES_PER_SET} calories!`,
        [{ text: 'Finish', onPress: () => navigation.goBack() }]
      );
    }
  };

  const current = steps[currentStep - 1];
  const remainingSteps = steps.length - currentStep;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name} (Pro Level)</Text>
      <Text style={styles.stepText}>{current.label}</Text>

      <View style={styles.timerContainer}>
        <TimerComponent duration={current.duration} onComplete={handleComplete} />
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.stats}>🔥 Calories: {caloriesBurned}</Text>
        <Text style={styles.stats}>💪 Sets Completed: {Math.floor(currentStep / 2) + (current.type === 'set' ? 1 : 0)}</Text>
        <Text style={styles.remaining}>
          {remainingSteps > 0 ? `⏳ ${remainingSteps} step(s) to go` : '🎯 Final Push!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#00e6e6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 20,
    color: '#ffffffdd',
    textAlign: 'center',
    marginBottom: 25,
  },
  timerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 40,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#00e6e6',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 10,
  },
  statsContainer: {
    alignItems: 'center',
  },
  stats: {
    fontSize: 16,
    color: '#d9d9d9',
    marginBottom: 5,
  },
  remaining: {
    fontSize: 16,
    color: '#00e6e6',
    fontWeight: '600',
    marginTop: 12,
  },
});
