import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample payment data
const paymentData = [
  { id: "1", amount: 1200, status: "Paid", date: "2025-12-20", method: "Credit Card" },
  { id: "2", amount: 1500, status: "Pending", date: "2025-11-20", method: "UPI" },
  { id: "3", amount: 1000, status: "Paid", date: "2025-10-15", method: "Wallet" },
];

export default function MemberPaymentsScreen({ navigation }) {
  const [payments, setPayments] = useState(paymentData);

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
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MemberHome")}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Payments</Text>
        <Text style={styles.headerSub}>Track your subscription & transactions</Text>
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
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },

  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#020617",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    fontSize: 14,
    color: "#cbd5f5",
    marginTop: 4,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e7eb",
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
    color: "#020617",
  },
  method: {
    fontSize: 13,
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
