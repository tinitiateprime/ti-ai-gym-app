import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageTrainerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Message Trainer Screen</Text>
      <Text style={styles.sub}>You can build your chat UI here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
  },
  sub: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
  },
});
