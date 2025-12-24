import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TrainerManagementScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer Management</Text>
      <Text style={styles.subtitle}>
        Hire, change, fire or message your trainer.
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
        onPress={() => navigation.navigate('ManageTrainer')}
      >
        <Text style={styles.buttonText}>ManageTrainer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainerManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1f2937',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#374151',
  },
  buttonText: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '600',
  },
});
