import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function GymManagementScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>Gym Management</Text>

      {/* Member Management */}
      <TouchableOpacity style={styles.box}>
        <Text style={styles.boxTitle}>Member Management</Text>
        <Text style={styles.boxSub}>Add / Edit / Remove Members</Text>
      </TouchableOpacity>

      {/* Trainer Management */}
      <TouchableOpacity 
        style={styles.box}
        onPress={() => navigation.navigate("TrainerScreen")}
      >
        <Text style={styles.boxTitle}>Trainer Management</Text>
        <Text style={styles.boxSub}>Assign Trainers & Schedules</Text>
      </TouchableOpacity>

      {/* Payments */}
      <TouchableOpacity style={styles.box}>
        <Text style={styles.boxTitle}>Payments & Billing</Text>
        <Text style={styles.boxSub}>Track Membership Payments</Text>
      </TouchableOpacity>

      {/* Attendance */}
      <TouchableOpacity style={styles.box}>
        <Text style={styles.boxTitle}>Attendance Tracking</Text>
        <Text style={styles.boxSub}>Daily Check-in Records</Text>
      </TouchableOpacity>

      {/* Inventory */}
      <TouchableOpacity style={styles.box}>
        <Text style={styles.boxTitle}>Inventory Management</Text>
        <Text style={styles.boxSub}>Gym Equipment Status</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0a0a',
    flex: 1,
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#1b1b1b',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
  },
  boxTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  boxSub: {
    color: '#aaa',
    marginTop: 5,
  },
});
