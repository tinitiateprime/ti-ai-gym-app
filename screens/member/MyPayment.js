import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample payment data
const paymentData = [
  { id: "1", amount: 1200, status: "Paid", date: "2025-12-20", method: "Credit Card" },
  { id: "2", amount: 1500, status: "Pending", date: "2025-11-20", method: "UPI" },
  { id: "3", amount: 1000, status: "Paid", date: "2025-10-15", method: "Wallet" },
];

export default function MemberPaymentsScreen({ navigation }) {
  const [payments] = useState(paymentData);

  const renderItem = ({ item }) => (
    <View style={styles.paymentCard}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Ionicons
          name={
            item.status === "Paid"
              ? "checkmark-circle-outline"
              : "time-outline"
          }
          size={22}
          color={item.status === "Paid" ? "#22c55e" : "#facc15"}
        />
      </View>

      {/* Amount & Method */}
      <View style={styles.textBox}>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <Text style={styles.method}>{item.method}</Text>
      </View>

      {/* Status */}
      <View style={styles.statusBox}>
        <Text
          style={[
            styles.status,
            item.status === "Paid" ? styles.paid : styles.pending,
          ]}
        >
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
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={26} color="#e5e7eb" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="wallet-outline" size={36} color="#38bdf8" />
        <Text style={styles.headerTitle}>My Payments</Text>
        <Text style={styles.headerSub}>
          Track your subscriptions & transactions
        </Text>
      </View>

      {/* List */}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },

  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    marginTop: 8,
  },

  headerSub: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  textBox: {
    flex: 1,
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  method: {
    fontSize: 13,
    color: "#94a3b8",
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

  paid: {
    color: "#22c55e",
  },

  pending: {
    color: "#facc15",
  },

  date: {
    fontSize: 12,
    color: "#64748b",
  },
});
