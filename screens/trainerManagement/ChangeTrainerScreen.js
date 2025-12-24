import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChangeTrainerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Trainer</Text>
      <Text style={styles.subtitle}>
        See your current trainer and options to switch.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current trainer</Text>
        <Text style={styles.value}>Anil Kumar</Text>

        <Text style={styles.label}>Focus</Text>
        <Text style={styles.value}>Weight loss</Text>

        <Text style={styles.label}>Sessions completed</Text>
        <Text style={styles.value}>12 of 24</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Suggested trainer</Text>
        <Text style={styles.value}>Priya Sharma</Text>
        <Text style={styles.info}>
          Suggestion based on your goal: Strength + toning.
        </Text>
      </View>

      <Text style={styles.note}>
        Later you can add buttons like &quot;Request Change&quot; or &quot;View
        All Trainers&quot; here.
      </Text>
    </View>
  );
};

export default ChangeTrainerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 6,
  },
  value: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  info: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 6,
  },
  note: {
    marginTop: 10,
    color: '#6b7280',
    fontSize: 12,
  },
});
