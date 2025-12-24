import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditUpgradeMemberScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit / Upgrade Member</Text>
      <Text style={styles.text}>
        Change member plan, pause membership, or edit details here.
      </Text>
    </View>
  );
};

export default EditUpgradeMemberScreen;

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
