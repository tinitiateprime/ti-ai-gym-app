// screens/marketplace/SellerProductsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const sellerProducts = [
  { id: '1', name: 'Whey Protein 1kg', price: '₹2,299', status: 'Active' },
  { id: '2', name: 'Gym T-shirt', price: '₹599', status: 'Active' },
  { id: '3', name: 'Shaker Bottle', price: '₹299', status: 'Inactive' },
];

const SellerProductsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Products</Text>
      <Text style={styles.subtitle}>Manage products visible in the marketplace.</Text>

      {sellerProducts.map((p) => (
        <View key={p.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.price}>{p.price}</Text>
          </View>
          <Text style={[styles.status, p.status === 'Active' ? styles.active : styles.inactive]}>
            {p.status}
          </Text>
          <Text style={styles.desc}>Tap later to edit price, stock and photos.</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SellerProductsScreen;

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#020617', padding: 20 },
  title: { fontSize: 22, color: '#e5e7eb', fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#9ca3af', marginBottom: 16 },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { color: '#e5e7eb', fontSize: 15, fontWeight: '600' },
  price: { color: '#22c55e', fontSize: 14 },
  status: { fontSize: 11, marginTop: 6 },
  active: { color: '#22c55e' },
  inactive: { color: '#f97316' },
  desc: { color: '#9ca3af', fontSize: 12, marginTop: 4 },
  button: {
    marginTop: 16,
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: { color: '#020617', fontSize: 15, fontWeight: '700' },
});
