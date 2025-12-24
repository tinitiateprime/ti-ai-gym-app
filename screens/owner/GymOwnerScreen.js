// screens/owner/GymOwnerScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GymOwnerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Owner Dashboard</Text>
      <Text style={styles.subtitle}>
        Manage members, trainers and announcements.
      </Text>

      {/* Member Management node */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MemberManagement')}
      >
        <Text style={styles.buttonText}>Member Management</Text>
      </TouchableOpacity>

      {/* Trainer Management node (optional separate) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TrainerManagement')}
      >
        <Text style={styles.buttonText}>Trainer Management</Text>
      </TouchableOpacity>

      {/* Broadcast node */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Broadcast')}
      >
        <Text style={styles.buttonText}>Broadcast</Text>
      </TouchableOpacity>

        {/*gym Equipment */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GymEquipment')}  
      >
        <Text style={styles.buttonText}>GymEquipment</Text>
      </TouchableOpacity>

      {/* News → Send Reminders For All */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('News')}
      >
        <Text style={styles.buttonText}>News / Reminders For All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GymOwnerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 24,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1f2937',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
});
