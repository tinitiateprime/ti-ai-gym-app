
import React, { useState, useRef, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- SAMPLE DATA ---------- */
const productsData = [
  { id: "1", name: "Protein Powder", price: 1200, stock: 25, image: "https://via.placeholder.com/100" },
  { id: "2", name: "Yoga Mat", price: 800, stock: 12, image: "https://via.placeholder.com/100" },
  { id: "3", name: "Dumbbells Set", price: 3500, stock: 5, image: "https://via.placeholder.com/100" },
  { id: "4", name: "Fitness Tracker", price: 2200, stock: 0, image: "https://via.placeholder.com/100" },
];

export default function MarketplaceProducts({ navigation }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "ALL" ||
        (filter === "INSTOCK" && p.stock >= 10) ||
        (filter === "LOW" && p.stock > 0 && p.stock < 10) ||
        (filter === "OUT" && p.stock === 0);

      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const stats = {
    total: productsData.length,
    inStock: productsData.filter((p) => p.stock >= 10).length,
    low: productsData.filter((p) => p.stock > 0 && p.stock < 10).length,
    out: productsData.filter((p) => p.stock === 0).length,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Products</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <StatCard label="Total" value={stats.total} />
        <StatCard label="In Stock" value={stats.inStock} />
        <StatCard label="Low" value={stats.low} />
        <StatCard label="Out" value={stats.out} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#64748b" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#64748b"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* FILTERS */}
      <View style={styles.filterRow}>
        <FilterChip label="All" active={filter === "ALL"} onPress={() => setFilter("ALL")} />
        <FilterChip label="In Stock" active={filter === "INSTOCK"} onPress={() => setFilter("INSTOCK")} />
        <FilterChip label="Low" active={filter === "LOW"} onPress={() => setFilter("LOW")} />
        <FilterChip label="Out" active={filter === "OUT"} onPress={() => setFilter("OUT")} />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => alert("Add Product")}>
        <Ionicons name="add" size={26} color="#020617" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function FilterChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ProductCard({ item }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const stockText =
    item.stock === 0 ? "Out of Stock" : item.stock < 10 ? "Low Stock" : "In Stock";

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />

        <View style={{ flex: 1 }}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          <Text style={styles.stockText}>{stockText}</Text>
        </View>

        <Ionicons name="pencil" size={18} color="#22c55e" />
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2933",
  },

  headerTitle: { color: "#22c55e", fontSize: 22, fontWeight: "800" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  statCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#052e16",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 10,
  },

  statValue: { color: "#22c55e", fontSize: 18, fontWeight: "800" },
  statLabel: { color: "#94a3b8", fontSize: 12 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#020617",
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#1f2933",
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 10,
    marginLeft: 8,
  },

  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1f2933",
    marginRight: 8,
  },

  chipActive: { backgroundColor: "#22c55e" },
  chipText: { color: "#94a3b8", fontSize: 12, fontWeight: "600" },
  chipTextActive: { color: "#020617" },

  listContainer: { padding: 16, paddingBottom: 120 },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2933",
  },

  productImage: { height: 60, width: 60, borderRadius: 12, marginRight: 12 },

  productName: { color: "#fff", fontSize: 16, fontWeight: "700" },
  productPrice: { color: "#22c55e", fontSize: 14 },
  stockText: { color: "#94a3b8", fontSize: 12 },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#22c55e",
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
