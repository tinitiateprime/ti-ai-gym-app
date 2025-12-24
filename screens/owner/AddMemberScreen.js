import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddMemberScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Member</Text>
      <Text style={styles.text}>
        Owner can register a new member here. Later you can add full form.
      </Text>
    </View>
  );
};

export default AddMemberScreen;

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
