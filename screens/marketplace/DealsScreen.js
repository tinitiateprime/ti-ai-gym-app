// screens/marketplace/DealsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const deals = [
  { id: '1', title: 'Protein + Shaker Combo', desc: 'Save 20% on combo pack.', valid: 'Valid till 31 Dec' },
  { id: '2', title: 'Gym Merchandise Offer', desc: 'Buy 2 T-shirts, get 1 free.', valid: 'Weekend only' },
  { id: '3', title: 'Pre-workout Deal', desc: 'Flat ₹300 off on orders above ₹1500.', valid: 'Limited stock' },
];

const DealsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Deals</Text>
      <Text style={styles.subtitle}>Best offers from your gym marketplace.</Text>

      {deals.map((d) => (
        <View key={d.id} style={styles.card}>
          <Text style={styles.dealTitle}>{d.title}</Text>
          <Text style={styles.dealDesc}>{d.desc}</Text>
          <Text style={styles.valid}>{d.valid}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DealsScreen;

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
  dealTitle: { color: '#e5e7eb', fontSize: 16, fontWeight: '600' },
  dealDesc: { color: '#9ca3af', fontSize: 13, marginTop: 4 },
  valid: { color: '#f97316', fontSize: 12, marginTop: 6 },
});
