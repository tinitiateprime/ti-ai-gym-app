import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Example notifications data
const notificationsData = [
  { id: 1, title: "Order #1234 Placed", message: "You received a new order from customer.", date: "2025-12-22", read: false },
  { id: 2, title: "Payment Received", message: "Payment for Order #1233 has been completed.", date: "2025-12-21", read: true },
  { id: 3, title: "Stock Low", message: "Product 'Yoga Mat' stock is running low.", date: "2025-12-20", read: false },
];

export default function MarketplaceNotifications({ navigation }) {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MarketplaceHomeScreen")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {notifications.map((n) => (
          <TouchableOpacity
            key={n.id}
            style={[styles.notificationCard, n.read ? styles.read : styles.unread]}
            onPress={() => markAsRead(n.id)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.notificationTitle}>{n.title}</Text>
              <Text style={styles.notificationMessage}>{n.message}</Text>
            </View>
            <Text style={styles.date}>{n.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  container: {
    padding: 20,
  },

  notificationCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: "#4e9efc",
  },
  read: {
    opacity: 0.7,
  },

  cardContent: {
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  date: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "right",
  },
});
