import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HireTrainerScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hire Trainer</Text>
      <Text style={styles.subtitle}>
        Browse available trainers and choose the best match for you.
      </Text>

      <View style={styles.card}>
        <Text style={styles.name}>Anil Kumar</Text>
        <Text style={styles.line}>Speciality: Weight loss & cardio</Text>
        <Text style={styles.line}>Experience: 5 years</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Priya Sharma</Text>
        <Text style={styles.line}>Speciality: Strength & toning</Text>
        <Text style={styles.line}>Experience: 3 years</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Rahul Verma</Text>
        <Text style={styles.line}>Speciality: Muscle gain</Text>
        <Text style={styles.line}>Experience: 7 years</Text>
      </View>

      <Text style={styles.note}>
        Later you can replace this dummy data with an API call.
      </Text>
    </ScrollView>
  );
};

export default HireTrainerScreen;

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
  name: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  line: {
    color: '#9ca3af',
    fontSize: 13,
  },
  note: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 12,
  },
});
