import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TrainerManagementScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer Management</Text>
      <Text style={styles.subtitle}>
        Manage your personal trainer: hire, change, or send a message.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HireTrainer')}
      >
        <Text style={styles.buttonText}>Hire Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChangeTrainer')}
      >
        <Text style={styles.buttonText}>Change Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FireTrainer')}
      >
        <Text style={styles.buttonText}>Fire Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MessageTrainer')}
      >
        <Text style={styles.buttonText}>Message Trainer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainerManagementScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: { fontSize: 13, color: '#9ca3af', marginBottom: 16 },
  button: {
    marginTop: 8,
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: { color: '#e5e7eb', fontSize: 15, fontWeight: '600' },
});
