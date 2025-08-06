import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const deals = [
  { id: '1', title: '20% off on Electronics', description: 'Valid until Aug 10' },
  { id: '2', title: 'Buy 1 Get 1 Free', description: 'Limited stock' },
  { id: '3', title: '50% off on Clothing', description: 'This weekend only' },
];

const DealsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deals</Text>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: '#eef6ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#3399ff',
  },
  title: { fontSize: 18, fontWeight: '600' },
  desc: { fontSize: 14, color: '#555' },
});
