import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TrainerScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trainer Dashboard</Text>
      <Text style={styles.subtitle}>
        See today&apos;s schedule and manage your members.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today&apos;s Sessions</Text>
        <Text style={styles.cardLine}>07:00 – John • Chest & Triceps</Text>
        <Text style={styles.cardLine}>08:30 – Priya • Weight Loss</Text>
        <Text style={styles.cardLine}>18:00 – Rahul • Leg Day</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Members under you</Text>
        <Text style={styles.cardLine}>Total: 12 active members</Text>
        <Text style={styles.cardLine}>3 fees due this week</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyTracker')}
      >
        <Text style={styles.buttonText}>View My Fitness Tracker</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TrainerScreen;

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
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardLine: {
    color: '#9ca3af',
    fontSize: 13,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '600',
  },
});
