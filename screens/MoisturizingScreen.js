import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';

const moisturizingProducts = [
  {
    id: 1,
    name: 'HydraGlow Day Cream',
    time: 'Day',
    spf: 30,
    skinType: 'Normal',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 2,
    name: 'AquaNight Gel',
    time: 'Night',
    spf: 0,
    skinType: 'Oily',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 3,
    name: 'SPF 50 SunShield',
    time: 'Day',
    spf: 50,
    skinType: 'Dry',
    image: 'https://via.placeholder.com/80',
  },
  {
    id: 4,
    name: 'Ultra Repair Night Balm',
    time: 'Night',
    spf: 0,
    skinType: 'Dry',
    image: 'https://via.placeholder.com/80',
  },
];

export default function MoisturizingScreen() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState(null);

  const toggleSelection = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    Alert.alert('Added to Cart', `${product.name} added successfully!`);
  };

  const filteredProducts = filter
    ? moisturizingProducts.filter(p => p.spf === filter || p.skinType === filter)
    : moisturizingProducts;

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Moisturizing Routine</Text>

      <View style={{ flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap', gap: 10 }}>
        {['All', 30, 50, 'Oily', 'Dry', 'Normal'].map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f === 'All' ? null : f)}
            style={{
              padding: 8,
              backgroundColor: filter === f ? '#d32f2f' : '#ccc',
              borderRadius: 20,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: '#fff' }}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {['Day', 'Night'].map(time => (
          <View key={time} style={{ flex: 1, marginRight: time === 'Day' ? 10 : 0 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{time} Use</Text>
            {filteredProducts
              .filter(item => item.time === time)
              .map(product => (
                <View
                  key={product.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 10,
                    marginBottom: 15,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{product.name}</Text>
                      <Text style={{ color: '#888' }}>SPF: {product.spf}</Text>
                      <Text style={{ color: '#888' }}>Skin: {product.skinType}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleSelection(product.id)}>
                      <Text style={{
                        fontSize: 24,
                        color: selectedIds.includes(product.id) ? 'green' : '#ccc',
                      }}>
                        ✓
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => handleAddToCart(product)}
                      style={{
                        flex: 1,
                        backgroundColor: '#388e3c',
                        padding: 8,
                        borderRadius: 6,
                        marginRight: 5,
                      }}
                    >
                      <Text style={{ textAlign: 'center', color: '#fff' }}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => Alert.alert('Buy Now', `Proceeding to buy ${product.name}`)}
                      style={{
                        flex: 1,
                        backgroundColor: '#1976d2',
                        padding: 8,
                        borderRadius: 6,
                        marginLeft: 5,
                      }}
                    >
                      <Text style={{ textAlign: 'center', color: '#fff' }}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
