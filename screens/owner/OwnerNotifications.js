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
    title: "New Member Joined",
    message: "Rahul joined your gym under Monthly Plan.",
    time: "2 min ago",
    type: "member",
    read: false,
  },
  {
    id: "2",
    title: "Trainer Request",
    message: "Trainer Suresh requested approval.",
    time: "1 hour ago",
    type: "trainer",
    read: false,
  },
  {
    id: "3",
    title: "Low Stock Alert",
    message: "Whey Protein stock is below 5 units.",
    time: "Today",
    type: "alert",
    read: true,
  },
  {
    id: "4",
    title: "Payment Received",
    message: "₹1,500 received from member Anil.",
    time: "Yesterday",
    type: "payment",
    read: true,
  },
];

const getIcon = (type) => {
  switch (type) {
    case "member":
      return "person-add-outline";
    case "trainer":
      return "school-outline";
    case "alert":
      return "warning-outline";
    case "payment":
      return "card-outline";
    default:
      return "notifications-outline";
  }
};

const getAccent = (type) => {
  switch (type) {
    case "alert":
      return "#ef4444";
    case "payment":
      return "#22c55e";
    case "trainer":
      return "#a78bfa";
    case "member":
    default:
      return "#60a5fa";
  }
};

export default function OwnerNotifications() {
  const [filter, setFilter] = useState("All"); // All | Unread
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const data = useMemo(() => {
    if (filter === "Unread") return items.filter((n) => !n.read);
    return items;
  }, [filter, items]);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subTitle}>
              {unreadCount} unread • {items.length} total
            </Text>
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
              onPress={markAllRead}
              disabled={unreadCount === 0}
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
                {/* Accent bar */}
                <View style={[styles.accentBar, { backgroundColor: accent }]} />

                {/* Icon */}
                <View style={styles.iconChip}>
                  <Ionicons name={getIcon(item.type)} size={18} color="#93c5fd" />
                </View>

                {/* Text */}
                <View style={styles.textWrap}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.title}
                    </Text>

                    {!item.read && <View style={styles.unreadDot} />}
                  </View>

                  <Text style={styles.cardMsg} numberOfLines={2}>
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

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flex: 1, backgroundColor: "#020617", padding: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: { fontSize: 22, fontWeight: "900", color: "#fff" },
  subTitle: { color: "#94a3b8", marginTop: 4, fontWeight: "700", fontSize: 12 },

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
  cardUnread: {
    borderColor: "#1d4ed8",
  },

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

  textWrap: { flex: 1 },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  cardTitle: { color: "#fff", fontSize: 14, fontWeight: "900", flex: 1 },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
  },

  cardMsg: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "700",
    lineHeight: 16,
  },

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

  emptyWrap: {
    marginTop: 30,
    alignItems: "center",
    padding: 16,
  },
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
