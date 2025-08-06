// Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Footer Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { padding: 10, backgroundColor: '#222' },
  text: { color: '#ccc' },
});
