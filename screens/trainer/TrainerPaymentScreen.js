import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const payments = [
  {
    id: "1",
    client: "Amit Kumar",
    amount: "₹2,500",
    date: "10 Jan 2025",
    status: "Paid",
  },
  {
    id: "2",
    client: "Sneha Reddy",
    amount: "₹3,000",
    date: "08 Jan 2025",
    status: "Paid",
  },
  {
    id: "3",
    client: "Rahul Sharma",
    amount: "₹2,000",
    date: "05 Jan 2025",
    status: "Pending",
  },
];

export default function TrainerPaymentsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Ionicons name="wallet-outline" size={22} color="#16a34a" />
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={styles.summaryValue}>₹7,500</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Ionicons name="calendar-outline" size={22} color="#2563eb" />
          <Text style={styles.summaryLabel}>This Month</Text>
          <Text style={styles.summaryValue}>₹5,500</Text>
        </View>
      </View>

      {/* Payment History */}
      <Text style={styles.sectionTitle}>Payment History</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.client}>{item.client}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.amount}>{item.amount}</Text>
              <View
                style={[
                  styles.statusBadge,
                  item.status === "Paid"
                    ? styles.paid
                    : styles.pending,
                ]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },

  header: {
    height: 60,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  summaryCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  summaryItem: { alignItems: "center", flex: 1 },

  summaryLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
    marginTop: 2,
  },

  divider: {
    width: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 16,
    marginBottom: 8,
    color: "#020617",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    justifyContent: "space-between",
  },

  info: {},

  client: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
  },

  date: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },

  right: { alignItems: "flex-end" },

  amount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#16a34a",
  },

  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  paid: { backgroundColor: "#dcfce7" },
  pending: { backgroundColor: "#fee2e2" },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#020617",
  },
});
