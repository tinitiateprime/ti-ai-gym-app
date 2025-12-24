import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditUpgradeTrainerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit / Upgrade Trainer</Text>
      <Text style={styles.text}>
        Here you can upgrade trainer level, edit details, or change status.
      </Text>
    </View>
  );
};

export default EditUpgradeTrainerScreen;

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
