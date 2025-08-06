// screens/FoodScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FoodScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>🍱 Food Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 24 },
});
