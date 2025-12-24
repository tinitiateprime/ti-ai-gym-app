// screens/member/DailyTipsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DailyTipsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Member Home</Text>
      <Text style={styles.subtitle}>Your daily tips and shortcuts</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyTracker')} >

        <Text style={styles.buttonText}>My Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyExercisesScreen')}>

        <Text style={styles.buttonText}>My Exercises</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PayFees')}>

        <Text style={styles.buttonText}>Pay Fees</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TrainerManagement')}>
          
        <Text style={styles.buttonText}>Trainer Management</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DailyTipsScreen;

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
