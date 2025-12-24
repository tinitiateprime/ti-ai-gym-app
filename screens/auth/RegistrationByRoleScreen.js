import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const roleHomeRoutes = {
  owner: 'GymOwner',
  trainer: 'TrainerScreen',
  member: 'DailyTips',
  seller: 'MarketplaceSeller',
};

const RegistrationByRoleScreen = ({ navigation, route }) => {
  const { roleId, roleLabel, email } = route.params || {};

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleContinue = () => {
    const homeRoute = roleHomeRoutes[roleId] || 'HomeScreen';

    navigation.navigate('CustomerPayment', {
      roleId,
      roleLabel,
      homeRoute,
      fullName,
      email,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roleLabel} Registration</Text>
      <Text style={styles.subtitle}>
        Complete your basic details before payment.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#6b7280"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
        placeholderTextColor="#6b7280"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationByRoleScreen;

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
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#111827',
    color: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
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
});
