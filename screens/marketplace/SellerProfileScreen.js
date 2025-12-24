import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SellerProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Profile</Text>
      <Text style={styles.subtitle}>
        Update your shop details and payout information.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Store name</Text>
        <Text style={styles.value}>Tinitiate Fitness Store</Text>

        <Text style={styles.label}>Owner</Text>
        <Text style={styles.value}>Dilip</Text>

        <Text style={styles.label}>Payout account</Text>
        <Text style={styles.value}>**** 4321 • HDFC Bank</Text>

        <Text style={styles.label}>Support email</Text>
        <Text style={styles.value}>support@tinitiate.com</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellerProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', padding: 20 },
  title: {
    fontSize: 24,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 8,
  },
  value: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '700',
  },
});
