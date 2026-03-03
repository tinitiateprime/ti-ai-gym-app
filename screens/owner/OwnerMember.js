import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MEMBERS = [
  {
    id: "M-1001",
    name: "Akhil Kumar",
    phone: "+91 98765 12345",
    plan: "Monthly",
    status: "Active",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    id: "M-1002",
    name: "Sneha Reddy",
    phone: "+91 99887 66554",
    plan: "Quarterly",
    status: "Active",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
  {
    id: "M-1003",
    name: "Rahul Sharma",
    phone: "+91 91234 56789",
    plan: "Monthly",
    status: "Expired",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
  },
];

const isWeb = Platform.OS === "web";

export default function MemberManagement({ navigation }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All"); // All | Active | Expired

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MEMBERS.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q);

      const matchesFilter =
        filter === "All" ? true : m.status.toLowerCase() === filter.toLowerCase();

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const stats = useMemo(() => {
    const total = MEMBERS.length;
    const active = MEMBERS.filter((m) => m.status === "Active").length;
    const expired = MEMBERS.filter((m) => m.status === "Expired").length;
    return { total, active, expired };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Members</Text>
            <Text style={styles.subtitle}>Manage gym members & subscriptions</Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.9}
            onPress={() => {
              // navigation.navigate("AddMember")
            }}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name, phone, or member ID"
            placeholderTextColor="#64748b"
            style={styles.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
              <Ionicons name="close" size={16} color="#e5e7eb" />
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard icon="people-outline" value={stats.total} label="Total" />
          <StatCard icon="checkmark-circle-outline" value={stats.active} label="Active" />
          <StatCard icon="alert-circle-outline" value={stats.expired} label="Expired" danger />
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
            text="Expired"
            active={filter === "Expired"}
            onPress={() => setFilter("Expired")}
          />
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No members found{filter !== "All" ? ` in ${filter}` : ""}.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.memberCard}
              onPress={() => {
                // navigation.navigate("MemberDetails", { id: item.id })
              }}
            >
              <View style={styles.memberTop}>
                <View style={styles.left}>
                  <View style={styles.avatarChip}>
                    <Ionicons name="person-outline" size={16} color="#93c5fd" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.memberName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.memberMeta}>
                      {item.id} • {item.plan}
                    </Text>
                  </View>
                </View>

                <StatusPill status={item.status} />
              </View>

              <View style={styles.memberMid}>
                <View style={styles.metaItem}>
                  <Ionicons name="call-outline" size={14} color="#94a3b8" />
                  <Text style={styles.metaText}>{item.phone}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={14} color="#94a3b8" />
                  <Text style={styles.metaText}>
                    {item.startDate} → {item.endDate}
                  </Text>
                </View>
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.9}>
                  <Ionicons name="call" size={16} color="#e5e7eb" />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.9}>
                  <Ionicons name="chatbubble-ellipses" size={16} color="#e5e7eb" />
                  <Text style={styles.actionText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtnOutline} activeOpacity={0.9}>
                  <Text style={styles.actionOutlineText}>Renew</Text>
                </TouchableOpacity>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#475569"
                style={{ alignSelf: "flex-end", marginTop: 6 }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------------- UI Bits ---------------- */

const StatCard = ({ icon, value, label, danger }) => (
  <View style={[styles.statCard, danger && styles.statDanger]}>
    <View style={[styles.statIcon, danger && styles.statIconDanger]}>
      <Ionicons name={icon} size={18} color={danger ? "#fecaca" : "#93c5fd"} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

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
    <View style={[styles.statusPill, active ? styles.statusActive : styles.statusExpired]}>
      <Ionicons
        name={active ? "checkmark-circle" : "alert-circle"}
        size={14}
        color={active ? "#bbf7d0" : "#fecaca"}
      />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

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
  title: { fontSize: 22, fontWeight: "900", color: "#fff" },
  subtitle: { color: "#94a3b8", marginTop: 4, fontWeight: "700", fontSize: 12 },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  addText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: isWeb ? 12 : 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: "#e5e7eb",
    fontWeight: "800",
    fontSize: 13,
  },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  statsRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  statCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    alignItems: "center",
  },
  statDanger: { borderColor: "#7f1d1d" },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 8,
  },
  statIconDanger: { borderColor: "#7f1d1d", backgroundColor: "#2a0b0b" },
  statValue: { color: "#e5e7eb", fontSize: 16, fontWeight: "900" },
  statLabel: { color: "#94a3b8", fontSize: 11, fontWeight: "800", marginTop: 4 },

  filtersRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  filterPill: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  filterPillActive: { backgroundColor: "#1d4ed8", borderColor: "#1d4ed8" },
  filterText: { color: "#94a3b8", fontWeight: "900", fontSize: 12 },
  filterTextActive: { color: "#fff" },

  memberCard: {
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

  memberTop: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  left: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  avatarChip: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  memberName: { color: "#fff", fontSize: 14, fontWeight: "900" },
  memberMeta: { color: "#94a3b8", marginTop: 4, fontSize: 12, fontWeight: "800" },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  statusActive: { backgroundColor: "#052e1a", borderColor: "#14532d" },
  statusExpired: { backgroundColor: "#2a0b0b", borderColor: "#7f1d1d" },
  statusText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  memberMid: { marginTop: 12, gap: 8 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaText: { color: "#cbd5e1", fontSize: 12, fontWeight: "800" },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  actionText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  actionBtnOutline: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#1d4ed8",
    borderWidth: 1,
    borderColor: "#1d4ed8",
  },
  actionOutlineText: { color: "#fff", fontSize: 12, fontWeight: "900" },

  empty: { color: "#64748b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
