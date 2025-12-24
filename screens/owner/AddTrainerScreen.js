import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MemberManagementScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member Management</Text>
      <Text style={styles.subtitle}>
        Manage trainers and members in your gym.
      </Text>

      {/* Trainer actions */}
      <Text style={styles.section}>Trainer</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddTrainer')}
      >
        <Text style={styles.buttonText}>Add Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditUpgradeTrainer')}
      >
        <Text style={styles.buttonText}>Edit / Upgrade Trainer</Text>
      </TouchableOpacity>

      {/* Member actions */}
      <Text style={styles.section}>Member</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddMember')}
      >
        <Text style={styles.buttonText}>Add Member</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditUpgradeMember')}
      >
        <Text style={styles.buttonText}>Edit / Upgrade Member</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RemoveMember')}
      >
        <Text style={styles.buttonText}>Remove Member</Text>
      </TouchableOpacity>

      {/* Send reminders (node in diagram) */}
      <TouchableOpacity
        style={[styles.button, styles.reminderButton]}
        onPress={() => navigation.navigate('SendReminder')}
      >
        <Text style={styles.buttonText}>Send Reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberManagementScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: { fontSize: 13, color: '#9ca3af', marginBottom: 16 },
  section: {
    marginTop: 12,
    marginBottom: 4,
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  reminderButton: { backgroundColor: '#22c55e', marginTop: 16 },
  buttonText: { color: '#e5e7eb', fontSize: 15, fontWeight: '600' },
});
