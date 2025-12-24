import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New Member Joined",
    message: "Rahul joined your gym under Monthly Plan.",
    time: "2 min ago",
    type: "member",
  },
  {
    id: "2",
    title: "Trainer Request",
    message: "Trainer Suresh requested approval.",
    time: "1 hour ago",
    type: "trainer",
  },
  {
    id: "3",
    title: "Low Stock Alert",
    message: "Whey Protein stock is below 5 units.",
    time: "Today",
    type: "alert",
  },
  {
    id: "4",
    title: "Payment Received",
    message: "₹1,500 received from member Anil.",
    time: "Yesterday",
    type: "payment",
  },
];

export default function OwnerNotifications() {
  const getIcon = (type) => {
    switch (type) {
      case "member":
        return "person-add";
      case "trainer":
        return "school";
      case "alert":
        return "warning";
      case "payment":
        return "card";
      default:
        return "notifications";
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "alert":
        return "#ef4444";
      case "payment":
        return "#22c55e";
      default:
        return "#4e9efc";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Notifications</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={22} color="#4e9efc" />
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: getColor(item.type) },
              ]}
            >
              <Ionicons
                name={getIcon(item.type)}
                size={18}
                color="#fff"
              />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMsg}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: "center",
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textWrap: {
    flex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  cardMsg: {
    color: "#94a3b8",
    fontSize: 13,
    marginVertical: 2,
  },
  time: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 4,
  },
});
