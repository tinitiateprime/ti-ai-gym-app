// screens/marketplace/ProductsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const products = [
  { id: '1', name: 'Whey Protein 1kg', price: '₹2,299', tag: 'Popular' },
  { id: '2', name: 'Gym Gloves', price: '₹499', tag: 'New' },
  { id: '3', name: 'Shaker Bottle 700ml', price: '₹299', tag: 'Best value' },
  { id: '4', name: 'Resistance Bands Set', price: '₹899', tag: 'Home workout' },
];

const ProductsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Marketplace Products</Text>
      <Text style={styles.subtitle}>
        Items from gym partners and marketplace sellers.
      </Text>

      {products.map((p) => (
        <View key={p.id} style={styles.card}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.price}>{p.price}</Text>
          <Text style={styles.tag}>{p.tag}</Text>
          <Text style={styles.desc}>
            Tap in future to see full details, reviews and add to cart.
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#e5e7eb',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: { fontSize: 13, color: '#9ca3af', marginBottom: 16 },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 10,
  },
  name: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
  price: { color: '#22c55e', fontSize: 15, marginTop: 4 },
  tag: { color: '#93c5fd', fontSize: 11, marginTop: 2 },
  desc: { color: '#9ca3af', fontSize: 12, marginTop: 6 },
});
