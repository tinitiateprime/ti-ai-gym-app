

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- SAMPLE DATA ---------- */
const paymentsData = [
  {
    id: "1",
    orderId: "1234",
    amount: 1200,
    status: "Paid",
    date: "20 Dec 2025",
    method: "Credit Card",
  },
  {
    id: "2",
    orderId: "1233",
    amount: 1500,
    status: "Pending",
    date: "20 Nov 2025",
    method: "UPI",
  },
  {
    id: "3",
    orderId: "1232",
    amount: 1000,
    status: "Paid",
    date: "15 Oct 2025",
    method: "Wallet",
  },
];

export default function MarketplacePayments({ navigation }) {
  const [payments] = useState(paymentsData);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PaymentCard item={item} />}
      />
    </SafeAreaView>
  );
}

/* ---------- PAYMENT CARD ---------- */
function PaymentCard({ item }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const isPaid = item.status === "Paid";

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.paymentCard}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name={isPaid ? "checkmark-circle" : "time-outline"}
            size={24}
            color={isPaid ? "#22c55e" : "#f59e0b"}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.amount}>₹{item.amount}</Text>
          <Text style={styles.method}>{item.method}</Text>
          <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
        </View>

        <View style={styles.statusBox}>
          <View
            style={[
              styles.statusPill,
              isPaid ? styles.paidPill : styles.pendingPill,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isPaid ? styles.paidText : styles.pendingText,
              ]}
            >
              {item.status}
            </Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2933",
  },

  headerTitle: {
    color: "#22c55e",
    fontSize: 22,
    fontWeight: "800",
  },

  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2933",
    elevation: 6,
  },

  iconBox: {
    height: 50,
    width: 50,
    borderRadius: 16,
    backgroundColor: "#052e16",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  textBox: {
    flex: 1,
  },

  amount: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },

  method: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },

  orderId: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },

  statusBox: {
    alignItems: "flex-end",
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 4,
  },

  paidPill: {
    backgroundColor: "#052e16",
  },

  pendingPill: {
    backgroundColor: "#3a1d00",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  paidText: {
    color: "#22c55e",
  },

  pendingText: {
    color: "#f59e0b",
  },

  date: {
    fontSize: 12,
    color: "#64748b",
  },
});
