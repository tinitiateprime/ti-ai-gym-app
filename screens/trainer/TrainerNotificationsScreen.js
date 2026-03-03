import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const INITIAL_NOTIFICATIONS = [
  {
    id: "1",
    title: "Session Reminder",
    message: "You have a training session with Amit at 6:00 AM.",
    time: "10 min ago",
    read: false,
    type: "reminder",
    icon: "time-outline",
  },
  {
    id: "2",
    title: "New Client Assigned",
    message: "Sneha Reddy has joined your training plan.",
    time: "2 hrs ago",
    read: false,
    type: "client",
    icon: "person-add-outline",
  },
  {
    id: "3",
    title: "Payment Received",
    message: "₹2,500 received from Rahul Sharma.",
    time: "Yesterday",
    read: true,
    type: "payment",
    icon: "wallet-outline",
  },
];

const getAccent = (type) => {
  if (type === "payment") return "#22c55e";
  if (type === "reminder") return "#60a5fa";
  if (type === "client") return "#a78bfa";
  return "#f59e0b";
};

export default function TrainerNotificationsScreen() {
  const [filter, setFilter] = useState("All"); // All | Unread
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const data = useMemo(() => {
    if (filter === "Unread") return items.filter((n) => !n.read);
    return items;
  }, [items, filter]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Ionicons name="notifications-outline" size={18} color="#93c5fd" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Notifications</Text>
              <Text style={styles.headerSub}>
                {unreadCount} unread • {items.length} total
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.pillBtn}
              activeOpacity={0.9}
              onPress={() => setFilter((p) => (p === "All" ? "Unread" : "All"))}
            >
              <Ionicons name="funnel-outline" size={16} color="#e5e7eb" />
              <Text style={styles.pillBtnText}>{filter}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, unreadCount === 0 && styles.iconBtnDisabled]}
              activeOpacity={0.9}
              disabled={unreadCount === 0}
              onPress={markAllRead}
            >
              <Ionicons name="checkmark-done-outline" size={18} color="#e5e7eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 18 }}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <View style={styles.emptyIcon}>
                <Ionicons name="notifications-off-outline" size={22} color="#94a3b8" />
              </View>
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyText}>
                {filter === "Unread" ? "You're all caught up." : "No updates yet."}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const accent = getAccent(item.type);

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.card, !item.read && styles.cardUnread]}
                onPress={() => toggleRead(item.id)}
              >
                <View style={[styles.accentBar, { backgroundColor: accent }]} />

                <View style={styles.iconChip}>
                  <Ionicons name={item.icon} size={18} color="#93c5fd" />
                </View>

                <View style={styles.info}>
                  <View style={styles.topRow}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    {!item.read && <View style={styles.unreadDot} />}
                  </View>

                  <Text style={styles.message} numberOfLines={2}>
                    {item.message}
                  </Text>

                  <View style={styles.metaRow}>
                    <View style={styles.typePill}>
                      <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.time}>{item.time}</Text>
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

  headerActions: { flexDirection: "row", gap: 10, alignItems: "center" },
  pillBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  pillBtnText: { color: "#e5e7eb", fontWeight: "900", fontSize: 12 },

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
  iconBtnDisabled: { opacity: 0.5 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardUnread: { borderColor: "#1d4ed8" },

  accentBar: { width: 4, height: 54, borderRadius: 999 },

  iconChip: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  info: { flex: 1 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: { color: "#fff", fontSize: 14, fontWeight: "900", flex: 1 },
  unreadDot: { width: 10, height: 10, borderRadius: 10, backgroundColor: "#3b82f6" },

  message: { color: "#94a3b8", fontSize: 12, marginTop: 6, fontWeight: "700", lineHeight: 16 },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  typePill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  typeText: { color: "#cbd5e1", fontSize: 11, fontWeight: "900" },
  time: { color: "#64748b", fontSize: 11, fontWeight: "800" },

  emptyWrap: { marginTop: 30, alignItems: "center", padding: 16 },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 12,
  },
  emptyTitle: { color: "#e5e7eb", fontSize: 14, fontWeight: "900" },
  emptyText: { color: "#64748b", fontSize: 12, fontWeight: "800", marginTop: 6 },
});
