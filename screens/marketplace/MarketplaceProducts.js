import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample product data
const productsData = [
  {
    id: "1",
    name: "Protein Powder",
    price: 1200,
    stock: 25,
    image: "https://via.placeholder.com/80",
  },
  {
    id: "2",
    name: "Yoga Mat",
    price: 800,
    stock: 12,
    image: "https://via.placeholder.com/80",
  },
  {
    id: "3",
    name: "Dumbbells Set",
    price: 3500,
    stock: 5,
    image: "https://via.placeholder.com/80",
  },
  {
    id: "4",
    name: "Fitness Tracker",
    price: 2200,
    stock: 8,
    image: "https://via.placeholder.com/80",
  },
];

export default function MarketplaceProducts({ navigation }) {
  const [products, setProducts] = useState(productsData);

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={[styles.stock, item.stock > 0 ? styles.inStock : styles.outOfStock]}>
          {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
        </Text>
      </View>
      <TouchableOpacity style={styles.editBtn}>
        <Ionicons name="pencil" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MarketplaceHomeScreen")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Products</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0f172a",
    gap: 16,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },

  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  productPrice: {
    fontSize: 14,
    color: "#4e9efc",
    marginTop: 2,
  },
  stock: {
    fontSize: 12,
    marginTop: 2,
  },
  inStock: { color: "#10b981" },
  outOfStock: { color: "#ef4444" },

  editBtn: {
    backgroundColor: "#4e9efc",
    padding: 8,
    borderRadius: 8,
  },
});
