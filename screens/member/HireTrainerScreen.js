import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SendReminderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Reminders</Text>
      <Text style={styles.text}>
        Here the owner can send payment / workout reminders to selected members
        or everyone.
      </Text>
    </View>
  );
};

export default SendReminderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 8,
  },
  text: { color: '#9ca3af', fontSize: 14 },
});
