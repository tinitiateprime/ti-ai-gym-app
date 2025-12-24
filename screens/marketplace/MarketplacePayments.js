import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample payments data
const paymentsData = [
  { id: "1", orderId: "1234", amount: 1200, status: "Paid", date: "2025-12-20", method: "Credit Card" },
  { id: "2", orderId: "1233", amount: 1500, status: "Pending", date: "2025-11-20", method: "UPI" },
  { id: "3", orderId: "1232", amount: 1000, status: "Paid", date: "2025-10-15", method: "Wallet" },
];

export default function MarketplacePayments({ navigation }) {
  const [payments, setPayments] = useState(paymentsData);

  const renderItem = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.iconBox}>
        <Ionicons
          name={item.status === "Paid" ? "checkmark-circle" : "time-outline"}
          size={22}
          color={item.status === "Paid" ? "#4CAF50" : "#FF9800"}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <Text style={styles.method}>{item.method}</Text>
        <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      </View>
      <View style={styles.statusBox}>
        <Text style={[styles.status, item.status === "Paid" ? styles.paid : styles.pending]}>
          {item.status}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MarketplaceHomeScreen")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      <FlatList
        data={payments}
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

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textBox: {
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  method: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 2,
  },
  orderId: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },

  statusBox: {
    alignItems: "flex-end",
  },
  status: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  paid: { color: "#4CAF50" },
  pending: { color: "#FF9800" },
  date: {
    fontSize: 12,
    color: "#94a3b8",
  },
});
