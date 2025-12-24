// screens/marketplace/ProductsScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const dayProducts = [
  {
    id: 'day1',
    name: 'Neutrogena SPF 50',
    image: 'https://m.media-amazon.com/images/I/71GL0UMRBbL._SX679_.jpg',
  },
  {
    id: 'day2',
    name: 'Minimalist Vitamin C',
    image: 'https://m.media-amazon.com/images/I/51CK9jw5mtL._SX679_.jpg',
  },
];

const nightProducts = [
  {
    id: 'night1',
    name: 'Cetaphil Night Cream',
    image: 'https://m.media-amazon.com/images/I/61aM8A2sC0L._SX679_.jpg',
  },
  {
    id: 'night2',
    name: 'Plum Retinol Serum',
    image: 'https://m.media-amazon.com/images/I/61CJPBCxBoL._SX679_.jpg',
  },
];

const ProductsScreen = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      Alert.alert('Already Added', 'This product is already in your cart.');
      return;
    }
    setCart([...cart, product]);
    Alert.alert('Added to Cart', `${product.name} added successfully!`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    Alert.alert('Removed', 'Product removed from cart');
  };

  const ProductCard = ({ product }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{product.name}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          cart.find((item) => item.id === product.id)
            ? styles.addedButton
            : styles.addButton,
        ]}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>
          {cart.find((item) => item.id === product.id) ? '✓ Added' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Select Your Skincare Products</Text>
      </View>

      <View style={styles.columnsContainer}>
        {/* Day Column */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnTitle}>🌞 Day Use</Text>
          </View>
          {dayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {/* Night Column */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnTitle}>🌙 Night Use</Text>
          </View>
          {nightProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>

      {/* Cart Preview */}
      <View style={styles.cart}>
        <Text style={styles.cartTitle}>🧺 Cart ({cart.length} items)</Text>
        {cart.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.cartItemContainer}>
              <Text style={styles.cartItem}>• {item.name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        {cart.length > 0 && (
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>
              Proceed to Checkout ({cart.length} items)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#87ceeb',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    marginBottom: 15,
  },
  columnTitle: {
    fontSize: 20,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  button: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#2e8b57',
  },
  addedButton: {
    backgroundColor: '#4a9d5f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cart: {
    margin: 16,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cartTitle: {
    fontSize: 18,
    color: '#90ee90',
    marginBottom: 12,
    fontWeight: '600',
  },
  emptyCart: {
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  cartItem: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  checkoutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  checkoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductsScreen;
