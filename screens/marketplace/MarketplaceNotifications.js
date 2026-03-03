

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- SAMPLE DATA ---------- */
const notificationsData = [
  {
    id: 1,
    title: "Order #1234 Placed",
    message: "You received a new order from customer.",
    date: "22 Dec 2025",
    read: false,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment for Order #1233 completed.",
    date: "21 Dec 2025",
    read: true,
  },
  {
    id: 3,
    title: "Stock Low",
    message: "Yoga Mat stock is running low.",
    date: "20 Dec 2025",
    read: false,
  },
];

export default function MarketplaceNotifications({ navigation }) {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#22c55e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* LIST */}
      <ScrollView contentContainerStyle={styles.container}>
        {notifications.map((n) => (
          <NotificationCard
            key={n.id}
            data={n}
            onPress={() => markAsRead(n.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- CARD COMPONENT ---------- */
function NotificationCard({ data, onPress }) {
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

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
        style={[
          styles.notificationCard,
          data.read ? styles.read : styles.unread,
        ]}
      >
        <View style={styles.cardTop}>
          <Text style={styles.notificationTitle}>{data.title}</Text>
          {!data.read && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationMessage}>{data.message}</Text>
        <Text style={styles.date}>{data.date}</Text>
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
    backgroundColor: "#020617",
    borderBottomWidth: 1,
    borderBottomColor: "#1f2933",
  },

  headerTitle: {
    color: "#22c55e",
    fontSize: 22,
    fontWeight: "800",
  },

  container: {
    padding: 20,
  },

  notificationCard: {
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2933",
    elevation: 6,
  },

  unread: {
    shadowColor: "#22c55e",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  read: {
    opacity: 0.65,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  unreadDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#22c55e",
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },

  notificationMessage: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 6,
  },

  date: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 10,
    textAlign: "right",
  },
});
