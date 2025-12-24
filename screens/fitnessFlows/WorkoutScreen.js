import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const WorkoutScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workout Programs</Text>
      <Text style={styles.subtitle}>
        Choose a workout level or explore cardio sessions.
      </Text>

      {/* Beginner */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('BeginnerWorkoutFlow')}
      >
        <Text style={styles.cardTitle}>Beginner</Text>
        <Text style={styles.cardTag}>Perfect if you are just starting</Text>
        <Text style={styles.cardText}>
          Light full-body workouts, simple movements and safe progress.
        </Text>
      </TouchableOpacity>

      {/* Intermediate */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('IntermediateWorkoutFlow')}
      >
        <Text style={styles.cardTitle}>Intermediate</Text>
        <Text style={styles.cardTag}>You already workout 3–4 days/week</Text>
        <Text style={styles.cardText}>
          Split routines with strength + conditioning.
        </Text>
      </TouchableOpacity>

      {/* Advanced */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('AdvancedWorkoutFlow')}
      >
        <Text style={styles.cardTitle}>Advanced</Text>
        <Text style={styles.cardTag}>High intensity</Text>
        <Text style={styles.cardText}>
          Heavy lifts, supersets and performance-focused plans.
        </Text>
      </TouchableOpacity>

      {/* Pro */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProWorkoutFlow')}
      >
        <Text style={styles.cardTitle}>Pro Athlete</Text>
        <Text style={styles.cardTag}>Serious training</Text>
        <Text style={styles.cardText}>
          Competition-style programming with strict schedule.
        </Text>
      </TouchableOpacity>

      {/* Cardio */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Cardio')}
      >
        <Text style={styles.cardTitle}>Cardio Sessions</Text>
        <Text style={styles.cardTag}>HIIT, steady-state and fat-loss focus</Text>
        <Text style={styles.cardText}>
          Treadmill, cycling, outdoor runs and interval plans.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkoutScreen;

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
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardTag: {
    color: '#93c5fd',
    fontSize: 12,
    marginBottom: 6,
  },
  cardText: {
    color: '#9ca3af',
    fontSize: 13,
  },
});
