// screens/owner/MemberManagement.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MemberManagement = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym Members / My Members</Text>
      <Text style={styles.subtitle}>Manage all your gym members here.</Text>
    </View>
  );
};

export default MemberManagement;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#e5e7eb', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#9ca3af' },
});
