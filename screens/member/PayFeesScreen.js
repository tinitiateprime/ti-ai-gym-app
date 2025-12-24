import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PayFeesScreen = ({ navigation }) => {
  const handlePayNow = () => {
    // You already have CustomerPaymentScreen registered as "CustomerPayment"
    navigation.navigate('CustomerPayment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay Fees</Text>
      <Text style={styles.subtitle}>
        View your membership plan and pay securely.
      </Text>

      <View style={styles.card}>
        <Text style={styles.planName}>Gold Membership</Text>
        <Text style={styles.label}>Billing cycle</Text>
        <Text style={styles.value}>Monthly</Text>

        <Text style={styles.label}>Amount due</Text>
        <Text style={styles.amount}>₹1,499</Text>

        <Text style={styles.label}>Due date</Text>
        <Text style={styles.value}>10th of every month</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayNow}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Your payment will be processed securely. After payment, your plan will
        be auto-renewed for the next month.
      </Text>
    </View>
  );
};

export default PayFeesScreen;

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
  planName: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
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
  amount: {
    color: '#22c55e',
    fontSize: 20,
    fontWeight: '700',
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
  note: {
    marginTop: 14,
    color: '#9ca3af',
    fontSize: 12,
  },
});
