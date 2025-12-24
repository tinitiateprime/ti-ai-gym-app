// screens/marketplace/CustomerMarketplace.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CustomerMarketplace = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gym Marketplace</Text>
      <Text style={styles.subtitle}>
        Discover supplements, food, gear and partner offers around your gym.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.buttonText}>Products</Text>
        <Text style={styles.buttonHint}>Supplements, gloves, bottles, bands</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Deals')}
      >
        <Text style={styles.buttonText}>Deals</Text>
        <Text style={styles.buttonHint}>Best discounts and combo offers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Restaurant')}
      >
        <Text style={styles.buttonText}>Restaurants</Text>
        <Text style={styles.buttonHint}>Healthy + cheat meal partners</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NearMeLocation')}
      >
        <Text style={styles.buttonText}>Near Me</Text>
        <Text style={styles.buttonHint}>Stores and partners near your gym</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Offers')}
      >
        <Text style={styles.buttonText}>Offers</Text>
        <Text style={styles.buttonHint}>Gym + marketplace special offers</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerMarketplace;

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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  buttonText: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonHint: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 3,
  },
});
