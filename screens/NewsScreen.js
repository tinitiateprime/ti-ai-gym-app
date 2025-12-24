import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NewsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News & Announcements</Text>
      <Text style={styles.text}>
        Post gym news, offers, events and general announcements here.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SendReminder')}
      >
        <Text style={styles.buttonText}>Send Reminders For All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewsScreen;

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
  buttonText: { color: '#e5e7eb', fontSize: 15, fontWeight: '600' },
});
