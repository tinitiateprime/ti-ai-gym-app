import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SkincareScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>💆 Skincare</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Routine')}>
        <Text style={styles.buttonText}>🧴 Skincare Routine</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Spf')}>
        <Text style={styles.buttonText}>🌞 SPF Protection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Moisturizing')}>
        <Text style={styles.buttonText}>💧 Moisturizing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#ffb6c1',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
