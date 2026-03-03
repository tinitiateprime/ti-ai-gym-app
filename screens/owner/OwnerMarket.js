import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRODUCTS = [
  { id: "1", name: "Whey Protein", category: "Supplements", price: "₹2,499", stock: 12 },
  { id: "2", name: "Dumbbell Set", category: "Equipment", price: "₹6,999", stock: 4 },
  { id: "3", name: "Yoga Mat", category: "Accessories", price: "₹799", stock: 20 },
];

const getCategoryIcon = (cat) => {
  if (cat === "Supplements") return "nutrition-outline";
  if (cat === "Equipment") return "barbell-outline";
  if (cat === "Accessories") return "bag-handle-outline";
  return "pricetag-outline";
};

const getAccent = (cat) => {
  if (cat === "Supplements") return "#60a5fa";
  if (cat === "Equipment") return "#f59e0b";
  if (cat === "Accessories") return "#a78bfa";
  return "#22c55e";
};

export default function OwnerMarket({ navigation }) {
  const productsCount = 36;
  const monthlySales = "₹18,200";
  const lowStockCount = 8;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Marketplace</Text>
            <Text style={styles.subTitle}>Inventory & gym store</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.85}>
              <Ionicons name="search-outline" size={18} color="#e5e7eb" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addBtn} activeOpacity={0.9}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="cube-outline" value={productsCount} label="Products" />
          <StatCard icon="cash-outline" value={monthlySales} label="Monthly Sales" />
          <StatCard icon="alert-circle-outline" value={lowStockCount} label="Low Stock" danger />
        </View>

        {/* Product List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Products</Text>
          <Text style={styles.sectionMeta}>{PRODUCTS.length} shown</Text>
        </View>

        <FlatList
          data={PRODUCTS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 18 }}
          renderItem={({ item }) => {
            const accent = getAccent(item.category);
            const low = item.stock < 5;

            return (
              <TouchableOpacity
                style={styles.productCard}
                activeOpacity={0.9}
                onPress={() => {
                  // navigation.navigate("OwnerProductDetail", { id: item.id })
                }}
              >
                <View style={[styles.accentBar, { backgroundColor: accent }]} />

                <View style={{ flex: 1 }}>
                  <View style={styles.topRow}>
                    <View style={styles.nameRow}>
                      <View style={styles.iconChip}>
                        <Ionicons name={getCategoryIcon(item.category)} size={16} color="#93c5fd" />
                      </View>
                      <Text style={styles.productName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>

                    <View style={styles.priceChip}>
                      <Ionicons name="pricetag-outline" size={14} color="#93c5fd" />
                      <Text style={styles.priceText}>{item.price}</Text>
                    </View>
                  </View>

                  <View style={styles.bottomRow}>
                    <View style={styles.categoryPill}>
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>

                    <View style={[styles.stockPill, low ? styles.stockLow : styles.stockOk]}>
                      <Ionicons
                        name={low ? "warning-outline" : "checkmark-circle-outline"}
                        size={14}
                        color={low ? "#fecaca" : "#bbf7d0"}
                      />
                      <Text style={styles.stockText}>Stock: {item.stock}</Text>
                    </View>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#475569" />
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={<Text style={styles.empty}>No products found</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

const StatCard = ({ icon, value, label, danger }) => (
  <View style={[styles.statCard, danger && styles.statDanger]}>
    <View style={[styles.statIcon, danger && styles.statIconDanger]}>
      <Ionicons name={icon} size={18} color={danger ? "#fecaca" : "#93c5fd"} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flex: 1, backgroundColor: "#020617", padding: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: "900", color: "#fff" },
  subTitle: { color: "#94a3b8", marginTop: 4, fontWeight: "700", fontSize: 12 },

  headerActions: { flexDirection: "row", gap: 10, alignItems: "center" },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  addText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  statsRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  statCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    alignItems: "center",
  },
  statDanger: {
    borderColor: "#7f1d1d",
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 8,
  },
  statIconDanger: {
    borderColor: "#7f1d1d",
    backgroundColor: "#2a0b0b",
  },
  statValue: { color: "#e5e7eb", fontSize: 16, fontWeight: "900" },
  statLabel: { color: "#94a3b8", fontSize: 11, fontWeight: "800", marginTop: 4 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: { color: "#e5e7eb", fontSize: 15, fontWeight: "900" },
  sectionMeta: { color: "#64748b", fontSize: 12, fontWeight: "800" },

  productCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  accentBar: { width: 4, height: 56, borderRadius: 999 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  iconChip: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  productName: { color: "#fff", fontSize: 14, fontWeight: "900", flex: 1 },

  priceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  priceText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },
  categoryPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  categoryText: { color: "#94a3b8", fontSize: 12, fontWeight: "900" },

  stockPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  stockOk: { backgroundColor: "#052e1a", borderColor: "#14532d" },
  stockLow: { backgroundColor: "#2a0b0b", borderColor: "#7f1d1d" },
  stockText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  empty: { color: "#64748b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
