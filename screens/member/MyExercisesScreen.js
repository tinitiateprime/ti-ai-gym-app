import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const exercises = [
  { id: '1', name: 'Full Body Warmup', level: 'Beginner', duration: '10 min' },
  { id: '2', name: 'Upper Body Strength', level: 'Intermediate', duration: '25 min' },
  { id: '3', name: 'Leg Day Blast', level: 'Intermediate', duration: '30 min' },
  { id: '4', name: 'Core & Abs', level: 'Beginner', duration: '15 min' },
  { id: '5', name: 'HIIT Cardio', level: 'Advanced', duration: '20 min' },
];

const MyExercisesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Exercises</Text>
      <Text style={styles.subtitle}>
        Your saved workouts and recommended sessions.
      </Text>

      {exercises.map((ex) => (
        <View key={ex.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{ex.name}</Text>
            <Text style={styles.duration}>{ex.duration}</Text>
          </View>
          <Text style={styles.level}>{ex.level}</Text>
          <Text style={styles.cardText}>
            Focus today: keep your form correct, don’t rush the reps.
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyExercisesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
  },
  duration: {
    color: '#9ca3af',
    fontSize: 12,
  },
  level: {
    color: '#22c55e',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 6,
  },
  cardText: {
    color: '#9ca3af',
    fontSize: 13,
  },
});
