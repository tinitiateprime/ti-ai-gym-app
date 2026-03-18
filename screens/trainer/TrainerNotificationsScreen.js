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
import { LinearGradient } from "expo-linear-gradient";

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
  if (type === "payment") return ["#22c55e", "#16a34a"];
  if (type === "reminder") return ["#60a5fa", "#2563eb"];
  if (type === "client") return ["#a78bfa", "#7c3aed"];
  return ["#f59e0b", "#ea580c"];
};

export default function TrainerNotificationsScreen() {
  const [filter, setFilter] = useState("All");
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
      <StatusBar barStyle="light-content" backgroundColor="#050816" />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <View>
                <Text style={styles.pageLabel}>NOTIFICATION CENTER</Text>
                <Text style={styles.headerTitle}>Trainer Alerts</Text>
                <Text style={styles.headerSub}>
                  Premium updates dashboard for reminders, clients, and payments
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.topIconBtn, unreadCount === 0 && styles.topIconBtnDisabled]}
                activeOpacity={0.9}
                disabled={unreadCount === 0}
                onPress={markAllRead}
              >
                <Ionicons name="checkmark-done-outline" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Hero */}
            <LinearGradient
              colors={["#111827", "#0f172a", "#1e1b4b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.heroGlowOne} />
              <View style={styles.heroGlowTwo} />

              <View style={styles.heroBadge}>
                <Ionicons name="notifications-outline" size={14} color="#93c5fd" />
                <Text style={styles.heroBadgeText}>SMART ALERTS</Text>
              </View>

              <Text style={styles.heroTitle}>Stay updated with every important trainer event</Text>
              <Text style={styles.heroSubtitle}>
                Track unread alerts, client activity, payment updates, and session reminders
                in one modern luxury workspace.
              </Text>

              <View style={styles.heroStatsRow}>
                <View style={styles.heroStatCard}>
                  <Text style={styles.heroStatValue}>{items.length}</Text>
                  <Text style={styles.heroStatLabel}>Total</Text>
                </View>
                <View style={styles.heroStatCard}>
                  <Text style={styles.heroStatValue}>{unreadCount}</Text>
                  <Text style={styles.heroStatLabel}>Unread</Text>
                </View>
                <View style={styles.heroStatCard}>
                  <Text style={styles.heroStatValue}>{items.length - unreadCount}</Text>
                  <Text style={styles.heroStatLabel}>Read</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Quick Actions */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSub}>Fast controls for your alerts</Text>
            </View>

            <View style={styles.quickRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.quickWrap}
                onPress={() => setFilter("All")}
              >
                <LinearGradient
                  colors={["#2563eb", "#3b82f6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="list-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>All</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.quickWrap}
                onPress={() => setFilter("Unread")}
              >
                <LinearGradient
                  colors={["#7c3aed", "#8b5cf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="mail-unread-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Unread</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.quickWrap}
                onPress={markAllRead}
                disabled={unreadCount === 0}
              >
                <LinearGradient
                  colors={["#0f766e", "#14b8a6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.quickBtn, unreadCount === 0 && styles.quickBtnDisabled]}
                >
                  <Ionicons name="checkmark-done-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Mark Read</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Filter Header */}
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.sectionTitle}>Notification Feed</Text>
                <Text style={styles.sectionSub}>
                  Rich alert cards with modern read state styling
                </Text>
              </View>

              <TouchableOpacity
                style={styles.filterPill}
                activeOpacity={0.9}
                onPress={() => setFilter((p) => (p === "All" ? "Unread" : "All"))}
              >
                <Ionicons name="funnel-outline" size={14} color="#e5e7eb" />
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="notifications-off-outline" size={30} color="#64748b" />
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
              activeOpacity={0.92}
              style={[styles.card, !item.read && styles.cardUnread]}
              onPress={() => toggleRead(item.id)}
            >
              <View style={styles.cardOverlay} />

              <LinearGradient
                colors={accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.accentBar}
              />

              <View style={styles.iconChip}>
                <Ionicons name={item.icon} size={18} color="#ffffff" />
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

              <View style={styles.chevronWrap}>
                <Ionicons name="arrow-forward" size={16} color="#cbd5e1" />
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Trainer App</Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.footerLink}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.footerLink}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.footerLink}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050816",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: "#050816",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  pageLabel: {
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.3,
  },

  headerSub: {
    marginTop: 6,
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "600",
    lineHeight: 18,
  },

  topIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  topIconBtnDisabled: {
    opacity: 0.45,
  },

  heroCard: {
    borderRadius: 30,
    padding: 22,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  heroGlowOne: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(59,130,246,0.16)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -30,
    left: -10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(139,92,246,0.14)",
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 16,
  },

  heroBadgeText: {
    color: "#dbeafe",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    marginBottom: 8,
    maxWidth: "92%",
  },

  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 18,
    maxWidth: "95%",
  },

  heroStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  heroStatCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  heroStatValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
    textAlign: "center",
  },

  heroStatLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
    gap: 12,
  },

  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  sectionSub: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  quickWrap: {
    flex: 1,
  },

  quickBtn: {
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  quickBtnDisabled: {
    opacity: 0.45,
  },

  quickText: {
    color: "#ffffff",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
  },

  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  filterText: {
    color: "#e5e7eb",
    fontWeight: "800",
    fontSize: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 15,
    marginBottom: 13,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  cardUnread: {
    borderColor: "#2563eb",
    backgroundColor: "rgba(37,99,235,0.08)",
  },

  cardOverlay: {
    position: "absolute",
    right: -18,
    top: -18,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  accentBar: {
    width: 5,
    height: 62,
    borderRadius: 999,
  },

  iconChip: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  info: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  title: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
    flex: 1,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
  },

  message: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "700",
    lineHeight: 18,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  typePill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  typeText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "900",
  },

  time: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "800",
  },

  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 34,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginTop: 6,
  },

  emptyTitle: {
    marginTop: 12,
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "800",
  },

  emptyText: {
    marginTop: 8,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 20,
  },

  footer: {
    marginTop: 14,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  footerText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },

  footerLink: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
  },
});

