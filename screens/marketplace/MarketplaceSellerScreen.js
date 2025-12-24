import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MarketplaceSellerScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Marketplace Seller</Text>
      <Text style={styles.subtitle}>
        Manage your products, orders and earnings.
      </Text>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Active products</Text>
          <Text style={styles.cardValue}>8</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Orders today</Text>
          <Text style={styles.cardValue}>3</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Earnings this month</Text>
        <Text style={styles.earnings}>₹12,450</Text>
        <Text style={styles.cardText}>
          18 orders completed • 2 pending shipments.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>View All Orders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MarketplaceSellerScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#020617',
    padding: 20,
  },
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 4,
  },
  cardValue: {
    color: '#e5e7eb',
    fontSize: 20,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  earnings: {
    color: '#22c55e',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  button: {
    marginTop: 16,
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
  secondaryButton: {
    marginTop: 10,
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  secondaryButtonText: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '600',
  },
});
