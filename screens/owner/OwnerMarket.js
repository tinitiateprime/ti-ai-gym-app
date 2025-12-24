import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRODUCTS = [
  {
    id: "1",
    name: "Whey Protein",
    category: "Supplements",
    price: "₹2,499",
    stock: 12,
  },
  {
    id: "2",
    name: "Dumbbell Set",
    category: "Equipment",
    price: "₹6,999",
    stock: 4,
  },
  {
    id: "3",
    name: "Yoga Mat",
    category: "Accessories",
    price: "₹799",
    stock: 20,
  },
];

export default function OwnerMarket({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>36</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₹18,200</Text>
          <Text style={styles.statLabel}>Monthly Sales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Low Stock</Text>
        </View>
      </View>

      {/* Product List */}
      <Text style={styles.sectionTitle}>My Products</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>

            <View style={styles.rightSection}>
              <Text
                style={[
                  styles.stock,
                  { color: item.stock < 5 ? "#ef4444" : "#22c55e" },
                ]}
              >
                Stock: {item.stock}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#94a3b8"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  addBtn: {
    backgroundColor: "#4e9efc",
    padding: 10,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 16,
    width: "31%",
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  productCategory: {
    color: "#94a3b8",
    fontSize: 12,
    marginVertical: 4,
  },
  productPrice: {
    color: "#4e9efc",
    fontSize: 14,
    fontWeight: "700",
  },
  rightSection: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  stock: {
    fontSize: 12,
    fontWeight: "700",
  },
});
