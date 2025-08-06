import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="settings" size={50} color="#ff4444" />
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>
        Customize your preferences, adjust system configurations, and manage app behavior.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
  },
});
