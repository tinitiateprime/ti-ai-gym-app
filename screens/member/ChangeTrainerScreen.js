import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChangeTrainerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Trainer</Text>
      <Text style={styles.text}>
        Show current trainer and options to switch to another trainer.
      </Text>
    </View>
  );
};

export default ChangeTrainerScreen;

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
