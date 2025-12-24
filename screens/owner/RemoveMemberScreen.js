import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RemoveMemberScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remove Member</Text>
      <Text style={styles.text}>
        Owner can deactivate or remove a member account here.
      </Text>
    </View>
  );
};

export default RemoveMemberScreen;

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
