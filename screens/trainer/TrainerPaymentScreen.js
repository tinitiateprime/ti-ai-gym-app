import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const payments = [
  { id: "1", client: "Amit Kumar", amount: 2500, date: "10 Jan 2025", status: "Paid" },
  { id: "2", client: "Sneha Reddy", amount: 3000, date: "08 Jan 2025", status: "Paid" },
  { id: "3", client: "Rahul Sharma", amount: 2000, date: "05 Jan 2025", status: "Pending" },
];

const isWeb = Platform.OS === "web";
const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function TrainerPaymentsScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const stats = useMemo(() => {
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const paid = payments
      .filter((p) => p.status === "Paid")
      .reduce((s, p) => s + p.amount, 0);
    const pending = payments
      .filter((p) => p.status === "Pending")
      .reduce((s, p) => s + p.amount, 0);

    const thisMonth = paid;
    return { total, paid, pending, thisMonth };
  }, []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();

    return payments.filter((p) => {
      const matchesQuery =
        !q || p.client.toLowerCase().includes(q) || p.date.toLowerCase().includes(q);
      const matchesFilter = filter === "All" ? true : p.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

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
                <Text style={styles.pageLabel}>PAYMENT CENTER</Text>
                <Text style={styles.headerTitle}>Trainer Earnings</Text>
                <Text style={styles.headerSub}>
                  Premium finance dashboard for payments and history
                </Text>
              </View>

              <TouchableOpacity style={styles.topIconBtn} activeOpacity={0.9}>
                <Ionicons name="download-outline" size={18} color="#ffffff" />
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
                <Ionicons name="wallet-outline" size={14} color="#93c5fd" />
                <Text style={styles.heroBadgeText}>REVENUE OVERVIEW</Text>
              </View>

              <Text style={styles.heroTitle}>Track every payment in a luxury workspace</Text>
              <Text style={styles.heroSubtitle}>
                Monitor paid and pending amounts, search history, and manage your
                earnings in a modern dark interface.
              </Text>

              <View style={styles.heroStatsRow}>
                <View style={styles.heroStatCard}>
                  <Text style={styles.heroStatValue}>{formatINR(stats.total)}</Text>
                  <Text style={styles.heroStatLabel}>Total</Text>
                </View>
                <View style={styles.heroStatCard}>
                  <Text style={styles.heroStatValue}>{formatINR(stats.paid)}</Text>
                  <Text style={styles.heroStatLabel}>Paid</Text>
                </View>
                <View style={styles.heroStatCard}>
                  <Text style={styles.heroStatValue}>{formatINR(stats.pending)}</Text>
                  <Text style={styles.heroStatLabel}>Pending</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Quick Actions */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSub}>Fast shortcuts for finance workflow</Text>
            </View>

            <View style={styles.quickRow}>
              <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
                <LinearGradient
                  colors={["#2563eb", "#3b82f6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="download-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Export</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.quickWrap}
                onPress={() => setFilter("Paid")}
              >
                <LinearGradient
                  colors={["#7c3aed", "#8b5cf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="checkmark-done-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Paid</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.quickWrap}
                onPress={() => {
                  setQuery("");
                  setFilter("All");
                }}
              >
                <LinearGradient
                  colors={["#0f766e", "#14b8a6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="refresh-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Reset</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.glassSearchBox}>
              <Ionicons name="search-outline" size={18} color="#94a3b8" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search by client or date"
                placeholderTextColor="#64748b"
                style={styles.searchInput}
              />
              {!!query && (
                <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
                  <Ionicons name="close" size={16} color="#e5e7eb" />
                </TouchableOpacity>
              )}
            </View>

            {/* Rich Summary */}
            <View style={styles.summaryRow}>
              <SummaryCard
                icon="cash-outline"
                label="Total Revenue"
                value={formatINR(stats.total)}
                sub={`${formatINR(stats.paid)} received`}
                colors={["#2563eb", "#3b82f6"]}
              />
              <SummaryCard
                icon="time-outline"
                label="This Month"
                value={formatINR(stats.thisMonth)}
                sub={`${formatINR(stats.pending)} pending`}
                colors={["#7c3aed", "#8b5cf6"]}
                right
              />
            </View>

            {/* Filters */}
            <View style={styles.filtersRow}>
              <FilterPill text="All" active={filter === "All"} onPress={() => setFilter("All")} />
              <FilterPill text="Paid" active={filter === "Paid"} onPress={() => setFilter("Paid")} />
              <FilterPill
                text="Pending"
                active={filter === "Pending"}
                onPress={() => setFilter("Pending")}
              />
            </View>

            {/* List Header */}
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.sectionTitle}>Payment History</Text>
                <Text style={styles.sectionSub}>Rich payment cards with client details</Text>
              </View>
              <Text style={styles.sectionMeta}>{data.length} shown</Text>
            </View>
          </>
        }
        renderItem={({ item, index }) => {
          const paid = item.status === "Paid";
          const accentColors =
            index % 3 === 0
              ? ["#22c55e", "#16a34a"]
              : index % 3 === 1
              ? ["#60a5fa", "#2563eb"]
              : ["#a78bfa", "#7c3aed"];

          return (
            <TouchableOpacity style={styles.card} activeOpacity={0.92}>
              <View style={styles.cardOverlay} />

              <LinearGradient
                colors={accentColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.accentBar}
              />

              <View style={styles.cardLeft}>
                <Text style={styles.client} numberOfLines={1}>
                  {item.client}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaPill}>
                    <Ionicons name="calendar-outline" size={13} color="#94a3b8" />
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Text style={[styles.amount, { color: paid ? "#4ade80" : "#f59e0b" }]}>
                  {formatINR(item.amount)}
                </Text>

                <View style={[styles.statusPill, paid ? styles.pillPaid : styles.pillPending]}>
                  <Ionicons
                    name={paid ? "checkmark-circle" : "alert-circle"}
                    size={14}
                    color={paid ? "#bbf7d0" : "#fecaca"}
                  />
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.chevronWrap}>
                <Ionicons name="arrow-forward" size={16} color="#cbd5e1" />
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="wallet-outline" size={28} color="#475569" />
            <Text style={styles.emptyTitle}>No payments found</Text>
            <Text style={styles.emptyText}>
              No matching records for your current search or filter.
            </Text>
          </View>
        }
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

/* ---------------- Components ---------------- */

function SummaryCard({ icon, label, value, sub, colors, right }) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.summaryCard, right && { marginLeft: 12 }]}
    >
      <View style={styles.summaryTop}>
        <View style={styles.summaryIcon}>
          <Ionicons name={icon} size={18} color="#ffffff" />
        </View>
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>

      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summarySub}>{sub}</Text>
    </LinearGradient>
  );
}

function FilterPill({ text, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.filterPill, active && styles.filterPillActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{text}</Text>
    </TouchableOpacity>
  );
}

/* ---------------- Styles ---------------- */

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
    maxWidth: "90%",
  },

  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 18,
    maxWidth: "94%",
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
    fontSize: 16,
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

  sectionMeta: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
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

  quickText: {
    color: "#ffffff",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
  },

  glassSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: isWeb ? 13 : 11,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    color: "#e5e7eb",
    fontWeight: "700",
    fontSize: 13,
  },

  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  summaryRow: {
    flexDirection: "row",
    marginBottom: 14,
  },

  summaryCard: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  summaryLabel: {
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "800",
  },

  summaryValue: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  summarySub: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },

  filtersRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  filterPill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  filterPillActive: {
    backgroundColor: "#1d4ed8",
    borderColor: "#3b82f6",
  },

  filterText: {
    color: "#94a3b8",
    fontWeight: "800",
    fontSize: 12,
  },

  filterTextActive: {
    color: "#ffffff",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
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
    height: 60,
    borderRadius: 999,
  },

  cardLeft: {
    flex: 1,
  },

  client: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },

  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  date: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
  },

  cardRight: {
    alignItems: "flex-end",
    gap: 8,
  },

  amount: {
    fontSize: 15,
    fontWeight: "900",
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },

  pillPaid: {
    backgroundColor: "#052e1a",
    borderColor: "#14532d",
  },

  pillPending: {
    backgroundColor: "#2a0b0b",
    borderColor: "#7f1d1d",
  },

  statusText: {
    color: "#e5e7eb",
    fontSize: 12,
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