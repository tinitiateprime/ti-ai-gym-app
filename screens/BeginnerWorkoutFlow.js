import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TimerComponent from '../components/TimerComponent';

const CALORIES_PER_SET = 8;

export default function BeginnerWorkoutFlow({ route, navigation }) {
  const { workout } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const steps = [
    { label: 'Finish Set 1', duration: 30, type: 'set' },
    { label: 'Break 1 min', duration: 60, type: 'break' },
    { label: 'Finish Set 2', duration: 30, type: 'set' },
    { label: 'Break 1 min', duration: 60, type: 'break' },
    { label: 'Finish Set 3', duration: 30, type: 'set' },
    { label: 'Break 1 min', duration: 60, type: 'break' },
    { label: 'Finish Set 4', duration: 30, type: 'set' },
  ];

  const handleComplete = () => {
    const current = steps[currentStep - 1];

    if (current?.type === 'set') {
      setCaloriesBurned((prev) => prev + CALORIES_PER_SET);
      const setNumber = Math.ceil(currentStep / 2 + 0.5);
      Alert.alert(`✅ Set ${setNumber} Completed!`, `Good job finishing Set ${setNumber}!`);
    }

    const nextStep = currentStep + 1;

    if (nextStep <= steps.length) {
      const next = steps[nextStep - 1];

      // Notify what's coming next
      if (next.type === 'break') {
        Alert.alert('💤 Take a Break', '1 Minute Rest Time.');
      } else if (next.type === 'set') {
        Alert.alert('⚡ Get Ready!', `${next.label}`);
      }

      setCurrentStep(nextStep);
    } else {
      Alert.alert(
        '🎉 Workout Complete!',
        `You completed all 4 sets!\n🔥 Total Calories Burned: ${caloriesBurned + CALORIES_PER_SET}`
      );
      navigation.goBack();
    }
  };

  const current = steps[currentStep - 1];
  const remainingSteps = steps.length - currentStep;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>
      <Text style={styles.stepLabel}>{current.label}</Text>

      <View style={styles.timerBox}>
        <TimerComponent duration={current.duration} onComplete={handleComplete} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>✅ Set: {Math.ceil(currentStep / 2 + 0.5)}</Text>
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
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#4dd938',
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
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#4dd938',
    shadowOpacity: 0.4,
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
    color: '#4dd938',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});
