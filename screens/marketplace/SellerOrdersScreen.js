import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const orders = [
  { id: 'ORD123', customer: 'Rahul', total: '₹1,499', status: 'Pending' },
  { id: 'ORD124', customer: 'Priya', total: '₹899', status: 'Shipped' },
  { id: 'ORD125', customer: 'Anil', total: '₹2,799', status: 'Delivered' },
];

const SellerOrdersScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <Text style={styles.subtitle}>
        Track and manage orders from your customers.
      </Text>

      {orders.map((o) => (
        <View key={o.id} style={styles.card}>
          <Text style={styles.cardTitle}>{o.id}</Text>
          <Text style={styles.line}>Customer: {o.customer}</Text>
          <Text style={styles.line}>Amount: {o.total}</Text>
          <Text
            style={[
              styles.status,
              o.status === 'Pending'
                ? styles.pending
                : o.status === 'Shipped'
                ? styles.shipped
                : styles.delivered,
            ]}
          >
            {o.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default SellerOrdersScreen;

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
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardTitle: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  line: {
    color: '#9ca3af',
    fontSize: 13,
  },
  status: {
    marginTop: 4,
    fontSize: 12,
  },
  pending: {
    color: '#f97316',
  },
  shipped: {
    color: '#38bdf8',
  },
  delivered: {
    color: '#22c55e',
  },
});
