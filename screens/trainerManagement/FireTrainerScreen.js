import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FireTrainerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>End Trainer Relationship</Text>
      <Text style={styles.subtitle}>
        If you are not satisfied, you can stop working with your trainer.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current trainer</Text>
        <Text style={styles.value}>Anil Kumar</Text>

        <Text style={styles.label}>Reason (example)</Text>
        <Text style={styles.value}>
          I want to pause personal training for a few months.
        </Text>

        <Text style={styles.warning}>
          After ending, your active sessions will be cancelled. You can hire a
          new trainer anytime.
        </Text>
      </View>

      <Text style={styles.note}>
        Later, add a confirmation dialog &quot;Are you sure?&quot; with YES/NO.
      </Text>
    </View>
  );
};

export default FireTrainerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 22,
    color: '#f97316',
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
  warning: {
    color: '#f97316',
    fontSize: 13,
    marginTop: 10,
  },
  note: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 12,
  },
});
