import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    title: "Session Reminder",
    message: "You have a training session with Amit at 6:00 AM.",
    time: "10 min ago",
    read: false,
    icon: "time-outline",
  },
  {
    id: "2",
    title: "New Client Assigned",
    message: "Sneha Reddy has joined your training plan.",
    time: "2 hrs ago",
    read: false,
    icon: "person-add-outline",
  },
  {
    id: "3",
    title: "Payment Received",
    message: "₹2,500 received from Rahul Sharma.",
    time: "Yesterday",
    read: true,
    icon: "wallet-outline",
  },
];

export default function TrainerNotificationsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              !item.read && styles.unreadCard,
            ]}
          >
            <View style={styles.iconBox}>
              <Ionicons
                name={item.icon}
                size={22}
                color="#020617"
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            {!item.read && <View style={styles.dot} />}
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

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  info: { flex: 1 },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
  },

  message: {
    fontSize: 13,
    color: "#475569",
    marginTop: 2,
  },

  time: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16a34a",
  },
});
