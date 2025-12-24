// screens/marketplace/Vendor.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Vendor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Dashboard</Text>
      <Text style={styles.subtitle}>
        Manage your marketplace products and orders here.
      </Text>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>My Products</Text>
        <Text style={styles.cardText}>View and edit your listed products.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Add New Product</Text>
        <Text style={styles.cardText}>Create a new listing in the marketplace.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Orders</Text>
        <Text style={styles.cardText}>See incoming orders and status.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Vendor;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 16 },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardText: {
    color: '#9ca3af',
    fontSize: 13,
  },
});
