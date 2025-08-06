import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TimerComponent from '../components/TimerComponent';

const CALORIES_PER_SET = 12;

export default function IntermediateWorkoutFlow({ route, navigation }) {
  const { workout } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const steps = [
    { label: 'Finish Set 1', duration: 50, type: 'set' },
    { label: 'Break 1 min', duration: 60, type: 'break' },
    { label: 'Finish Set 2', duration: 60, type: 'set' },
    { label: 'Break 1 min', duration: 60, type: 'break' },
    { label: 'Finish Set 3', duration: 0, type: 'set' },
    { label: 'Break 1 min', duration: 60, type: 'break' },
    { label: 'Finish Set 4', duration:90, type: 'set' },
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
        Alert.alert('✅ Set Complete!', `Time to rest for 1 minute.`);
      } else if (next.type === 'set') {
        Alert.alert('💥 Break Over!', `Get ready for ${next.label}`);
      }

      setCurrentStep(nextStep);
    } else {
      Alert.alert(
        '🎉 Workout Finished!',
        `You completed all sets and burned 🔥 ${caloriesBurned + CALORIES_PER_SET} calories!`
      );
      navigation.goBack();
    }
  };

  const current = steps[currentStep - 1];
  const remainingSteps = steps.length - currentStep;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name} (Intermediate)</Text>
      <Text style={styles.stepLabel}>{current.label}</Text>

      <View style={styles.timerBox}>
        <TimerComponent duration={current.duration} onComplete={handleComplete} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🏋️‍♀️ Set: {Math.ceil(currentStep / 2 + 0.5)}</Text>
        <Text style={styles.infoText}>🔥 Calories: {caloriesBurned}</Text>
        {remainingSteps > 0 ? (
          <Text style={styles.remainingText}>⏳ {remainingSteps} step(s) remaining</Text>
        ) : (
          <Text style={styles.remainingText}>🎯 Final Step!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ff9f0a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepLabel: {
    fontSize: 22,
    color: '#ffffffcc',
    textAlign: 'center',
    marginBottom: 20,
  },
  timerBox: {
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#ff9f0a',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 6,
  },
  remainingText: {
    color: '#ff9f0a',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});
