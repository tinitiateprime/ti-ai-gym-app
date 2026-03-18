import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CLIENTS = [
  {
    id: "1",
    name: "Amit Kumar",
    goal: "Weight Loss",
    plan: "Monthly",
    status: "Active",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Sneha Reddy",
    goal: "Muscle Gain",
    plan: "Quarterly",
    status: "Active",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Rahul Sharma",
    goal: "General Fitness",
    plan: "Expired",
    status: "Inactive",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const isWeb = Platform.OS === "web";

const getAccent = (goal) => {
  if (goal === "Weight Loss") return ["#22c55e", "#16a34a"];
  if (goal === "Muscle Gain") return ["#60a5fa", "#2563eb"];
  return ["#a78bfa", "#7c3aed"];
};

export default function TrainerClientsScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const stats = useMemo(() => {
    const total = CLIENTS.length;
    const active = CLIENTS.filter((c) => c.status === "Active").length;
    const inactive = CLIENTS.filter((c) => c.status === "Inactive").length;
    return { total, active, inactive };
  }, []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CLIENTS.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.goal.toLowerCase().includes(q) ||
        c.plan.toLowerCase().includes(q);

      const matchesFilter =
        filter === "All" ? true : c.status.toLowerCase() === filter.toLowerCase();

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              {/* Top Bar */}
              <View style={styles.topBar}>
                <View>
                  <Text style={styles.pageLabel}>CLIENT MANAGEMENT</Text>
                  <Text style={styles.headerTitle}>My Clients</Text>
                  <Text style={styles.headerSub}>
                    Premium trainer workspace for client tracking
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.topIconBtn}
                  activeOpacity={0.9}
                  onPress={() => {}}
                >
                  <Ionicons name="options-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Hero Section */}
              <LinearGradient
                colors={["#111827", "#0f172a", "#1e1b4b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroCard}
              >
                <View style={styles.heroGlowOne} />
                <View style={styles.heroGlowTwo} />

                <View style={styles.heroBadge}>
                  <Ionicons name="sparkles-outline" size={14} color="#93c5fd" />
                  <Text style={styles.heroBadgeText}>ELITE CLIENT HUB</Text>
                </View>

                <Text style={styles.heroTitle}>Manage clients with a futuristic workspace</Text>
                <Text style={styles.heroSubtitle}>
                  Track status, plans, goals, and performance from one premium dashboard.
                </Text>

                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.total}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.active}</Text>
                    <Text style={styles.statLabel}>Active</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.inactive}</Text>
                    <Text style={styles.statLabel}>Inactive</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Quick Actions */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <Text style={styles.sectionSub}>Fast shortcuts for daily workflow</Text>
              </View>

              <View style={styles.quickRow}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.quickWrap}
                  onPress={() => {}}
                >
                  <LinearGradient
                    colors={["#2563eb", "#3b82f6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.quickBtn}
                  >
                    <Ionicons name="person-add-outline" size={18} color="#fff" />
                    <Text style={styles.quickText}>Add Client</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.quickWrap}
                  onPress={() => setFilter("Active")}
                >
                  <LinearGradient
                    colors={["#7c3aed", "#8b5cf6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.quickBtn}
                  >
                    <Ionicons name="flash-outline" size={18} color="#fff" />
                    <Text style={styles.quickText}>Active</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.quickWrap}
                  onPress={() => setQuery("")}
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
                  placeholder="Search by name, goal, or plan"
                  placeholderTextColor="#64748b"
                  style={styles.searchInput}
                />
                {!!query && (
                  <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
                    <Ionicons name="close" size={15} color="#e5e7eb" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Filters */}
              <View style={styles.filtersRow}>
                <FilterPill text="All" active={filter === "All"} onPress={() => setFilter("All")} />
                <FilterPill
                  text="Active"
                  active={filter === "Active"}
                  onPress={() => setFilter("Active")}
                />
                <FilterPill
                  text="Inactive"
                  active={filter === "Inactive"}
                  onPress={() => setFilter("Inactive")}
                />
              </View>

              {/* Rich Section Header */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Client Profiles</Text>
                <Text style={styles.sectionSub}>Luxury styled cards with plan and status info</Text>
              </View>
            </>
          }
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="search-outline" size={28} color="#475569" />
              <Text style={styles.empty}>No clients found{filter !== "All" ? ` in ${filter}` : ""}.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const active = item.status === "Active";
            const accent = getAccent(item.goal);

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.92}
                onPress={() => {
                  // navigation?.navigate?.("ClientDetails", { id: item.id })
                }}
              >
                <View style={styles.cardOverlay} />

                <LinearGradient
                  colors={accent}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.accentBar}
                />

                <Image source={{ uri: item.image }} style={styles.avatar} />

                <View style={styles.info}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <StatusPill status={item.status} />
                  </View>

                  <Text style={styles.goalText} numberOfLines={1}>
                    Goal: {item.goal}
                  </Text>

                  <View style={styles.metaRow}>
                    <View style={styles.chip}>
                      <Ionicons name="pricetag-outline" size={14} color="#93c5fd" />
                      <Text style={styles.chipText}>{item.plan}</Text>
                    </View>

                    <View style={[styles.chipSoft, active ? styles.chipSoftOk : styles.chipSoftBad]}>
                      <Ionicons
                        name={active ? "checkmark-circle-outline" : "alert-circle-outline"}
                        size={14}
                        color={active ? "#bbf7d0" : "#fecaca"}
                      />
                      <Text style={styles.chipSoftText}>
                        {active ? "On Track" : "Renew Needed"}
                      </Text>
                    </View>
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
      </View>
    </SafeAreaView>
  );
}

const FilterPill = ({ text, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={[styles.filterPill, active && styles.filterPillActive]}
  >
    <Text style={[styles.filterText, active && styles.filterTextActive]}>{text}</Text>
  </TouchableOpacity>
);

const StatusPill = ({ status }) => {
  const active = status === "Active";
  return (
    <View style={[styles.statusPill, active ? styles.statusActive : styles.statusInactive]}>
      <Ionicons
        name={active ? "checkmark-circle" : "close-circle"}
        size={13}
        color={active ? "#bbf7d0" : "#fecaca"}
      />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050816",
  },

  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  listContent: {
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

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  statValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  statLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  sectionHeader: {
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

  filtersRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
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
    color: "#fff",
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
    height: 72,
    borderRadius: 999,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  info: {
    flex: 1,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  name: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
    flex: 1,
  },

  goalText: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  chipText: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "800",
  },

  chipSoft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 999,
    borderWidth: 1,
  },

  chipSoftOk: {
    backgroundColor: "#052e1a",
    borderColor: "#14532d",
  },

  chipSoftBad: {
    backgroundColor: "#2a0b0b",
    borderColor: "#7f1d1d",
  },

  chipSoftText: {
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

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },

  statusActive: {
    backgroundColor: "#052e1a",
    borderColor: "#14532d",
  },

  statusInactive: {
    backgroundColor: "#2a0b0b",
    borderColor: "#7f1d1d",
  },

  statusText: {
    color: "#e5e7eb",
    fontSize: 11,
    fontWeight: "800",
  },

  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
  },

  empty: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "700",
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