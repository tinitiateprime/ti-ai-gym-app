import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const sampleProducts = [
  { id: '1', name: 'Smartphone', image: require('../assets/product1.png') },
  { id: '2', name: 'Headphones', image: require('../assets/product2.png') },
  { id: '3', name: 'Smartwatch', image: require('../assets/product3.png') },
];

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 16 },
  name: { fontSize: 18, fontWeight: '500' },
});
