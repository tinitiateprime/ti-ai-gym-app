import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LegsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Legs Skincare</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 24 },
});
