import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const payments = [
  { id: "1", client: "Amit Kumar", amount: 2500, date: "10 Jan 2025", status: "Paid" },
  { id: "2", client: "Sneha Reddy", amount: 3000, date: "08 Jan 2025", status: "Paid" },
  { id: "3", client: "Rahul Sharma", amount: 2000, date: "05 Jan 2025", status: "Pending" },
];

const isWeb = Platform.OS === "web";

const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function TrainerPaymentsScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All"); // All | Paid | Pending

  const stats = useMemo(() => {
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const paid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    const pending = payments
      .filter((p) => p.status === "Pending")
      .reduce((s, p) => s + p.amount, 0);

    // Demo value: you can compute "This Month" using real dates later
    const thisMonth = paid;

    return { total, paid, pending, thisMonth };
  }, []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();

    return payments.filter((p) => {
      const matchesQuery = !q || p.client.toLowerCase().includes(q) || p.date.toLowerCase().includes(q);
      const matchesFilter = filter === "All" ? true : p.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const markFilter = (v) => setFilter(v);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Ionicons name="wallet-outline" size={18} color="#93c5fd" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Payments</Text>
              <Text style={styles.headerSub}>Track earnings & payment history</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9}>
            <Ionicons name="download-outline" size={18} color="#e5e7eb" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by client or date"
            placeholderTextColor="#64748b"
            style={styles.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
              <Ionicons name="close" size={16} color="#e5e7eb" />
            </TouchableOpacity>
          )}
        </View>

        {/* Summary */}
        <View style={styles.summaryRow}>
          <SummaryCard
            icon="cash-outline"
            label="Total"
            value={formatINR(stats.total)}
            sub={`${formatINR(stats.paid)} paid`}
          />
          <SummaryCard
            icon="calendar-outline"
            label="This Month"
            value={formatINR(stats.thisMonth)}
            sub={`${formatINR(stats.pending)} pending`}
            right
          />
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          <FilterPill text="All" active={filter === "All"} onPress={() => markFilter("All")} />
          <FilterPill text="Paid" active={filter === "Paid"} onPress={() => markFilter("Paid")} />
          <FilterPill
            text="Pending"
            active={filter === "Pending"}
            onPress={() => markFilter("Pending")}
          />
        </View>

        {/* List header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          <Text style={styles.sectionMeta}>{data.length} shown</Text>
        </View>

        {/* Payment History */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No payments found{filter !== "All" ? ` in ${filter}` : ""}.
            </Text>
          }
          renderItem={({ item }) => {
            const paid = item.status === "Paid";
            return (
              <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                <View style={[styles.accentBar, { backgroundColor: paid ? "#22c55e" : "#ef4444" }]} />

                <View style={styles.cardLeft}>
                  <Text style={styles.client} numberOfLines={1}>
                    {item.client}
                  </Text>
                  <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={14} color="#94a3b8" />
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <Text style={[styles.amount, { color: paid ? "#22c55e" : "#f59e0b" }]}>
                    {formatINR(item.amount)}
                  </Text>

                  <View style={[styles.statusPill, paid ? styles.pillPaid : styles.pillPending]}>
                    <Ionicons
                      name={paid ? "checkmark-circle" : "alert-circle"}
                      size={14}
                      color={paid ? "#bbf7d0" : "#fecaca"}
                    />
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#475569" />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

function SummaryCard({ icon, label, value, sub, right }) {
  return (
    <View style={[styles.summaryCard, right && { marginLeft: 12 }]}>
      <View style={styles.summaryTop}>
        <View style={styles.summaryIcon}>
          <Ionicons name={icon} size={18} color="#93c5fd" />
        </View>
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>

      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summarySub}>{sub}</Text>
    </View>
  );
}

function FilterPill({ text, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.filterPill, active && styles.filterPillActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{text}</Text>
    </TouchableOpacity>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flex: 1, backgroundColor: "#020617", padding: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  headerSub: { color: "#94a3b8", fontSize: 12, fontWeight: "700", marginTop: 4 },
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: isWeb ? 12 : 10,
    marginBottom: 12,
  },
  searchInput: { flex: 1, color: "#e5e7eb", fontWeight: "800", fontSize: 13 },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  summaryRow: { flexDirection: "row", marginBottom: 12 },
  summaryCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1e293b",

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  summaryTop: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  summaryLabel: { color: "#94a3b8", fontSize: 12, fontWeight: "900" },
  summaryValue: { color: "#e5e7eb", fontSize: 18, fontWeight: "900" },
  summarySub: { color: "#64748b", fontSize: 12, fontWeight: "800", marginTop: 6 },

  filtersRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  filterPill: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  filterPillActive: { backgroundColor: "#1d4ed8", borderColor: "#1d4ed8" },
  filterText: { color: "#94a3b8", fontWeight: "900", fontSize: 12 },
  filterTextActive: { color: "#fff" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  sectionTitle: { color: "#e5e7eb", fontSize: 15, fontWeight: "900" },
  sectionMeta: { color: "#64748b", fontSize: 12, fontWeight: "800" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  accentBar: { width: 4, height: 54, borderRadius: 999 },

  cardLeft: { flex: 1 },
  client: { color: "#fff", fontSize: 14, fontWeight: "900" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  date: { color: "#94a3b8", fontSize: 12, fontWeight: "800" },

  cardRight: { alignItems: "flex-end", gap: 8 },
  amount: { fontSize: 14, fontWeight: "900" },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillPaid: { backgroundColor: "#052e1a", borderColor: "#14532d" },
  pillPending: { backgroundColor: "#2a0b0b", borderColor: "#7f1d1d" },
  statusText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  empty: { color: "#64748b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
