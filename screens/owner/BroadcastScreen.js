// screens/owner/BroadcastScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BroadcastScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Broadcast</Text>
      <Text style={styles.text}>
        Send a quick broadcast message to trainers or all members.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Broadcast to Trainers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Broadcast to All Members</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.newsButton]}
        onPress={() => navigation.navigate('News')}
      >
        <Text style={styles.buttonText}>Go to News & Announcements</Text>
      </TouchableOpacity>
    </View>
  );
};

// ❗ VERY IMPORTANT: no parentheses here, just export the function itself
export default BroadcastScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 8,
  },
  text: { color: '#9ca3af', fontSize: 14, marginBottom: 16 },
  button: {
    marginTop: 8,
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  newsButton: { marginTop: 16, backgroundColor: '#22c55e' },
  buttonText: { color: '#e5e7eb', fontSize: 15, fontWeight: '600' },
});
