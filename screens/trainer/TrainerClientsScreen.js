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
  if (goal === "Weight Loss") return "#22c55e";
  if (goal === "Muscle Gain") return "#60a5fa";
  return "#a78bfa";
};

export default function TrainerClientsScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All"); // All | Active | Inactive

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
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Ionicons name="people-outline" size={18} color="#93c5fd" />
            </View>
            <View>
              <Text style={styles.headerTitle}>My Clients</Text>
              <Text style={styles.headerSub}>
                {stats.total} total • {stats.active} active • {stats.inactive} inactive
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.9}
            onPress={() => {
              // navigation?.navigate?.("AddClient")
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
            placeholder="Search by name, goal, plan"
            placeholderTextColor="#64748b"
            style={styles.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
              <Ionicons name="close" size={16} color="#e5e7eb" />
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

        {/* Client List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No clients found{filter !== "All" ? ` in ${filter}` : ""}.
            </Text>
          }
          renderItem={({ item }) => {
            const accent = getAccent(item.goal);
            const active = item.status === "Active";

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => {
                  // navigation?.navigate?.("ClientDetails", { id: item.id })
                }}
              >
                <View style={[styles.accentBar, { backgroundColor: accent }]} />

                <Image source={{ uri: item.image }} style={styles.avatar} />

                <View style={styles.info}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <StatusPill status={item.status} />
                  </View>

                  <Text style={styles.subText} numberOfLines={1}>
                    Goal: {item.goal}
                  </Text>

                  <View style={styles.chipsRow}>
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
                      <Text style={styles.chipSoftText}>{active ? "On Track" : "Renew Needed"}</Text>
                    </View>
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

/* ---------------- Components ---------------- */

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
  searchInput: { flex: 1, color: "#e5e7eb", fontWeight: "800", fontSize: 13 },
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

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  accentBar: { width: 4, height: 64, borderRadius: 999 },

  avatar: { width: 54, height: 54, borderRadius: 18, backgroundColor: "#0b1224" },

  info: { flex: 1 },

  nameRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  name: { color: "#e5e7eb", fontSize: 14, fontWeight: "900", flex: 1 },

  subText: { color: "#94a3b8", fontSize: 12, marginTop: 6, fontWeight: "700" },

  chipsRow: { flexDirection: "row", gap: 10, marginTop: 10, flexWrap: "wrap" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  chipText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  chipSoft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipSoftOk: { backgroundColor: "#052e1a", borderColor: "#14532d" },
  chipSoftBad: { backgroundColor: "#2a0b0b", borderColor: "#7f1d1d" },
  chipSoftText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusActive: { backgroundColor: "#052e1a", borderColor: "#14532d" },
  statusInactive: { backgroundColor: "#2a0b0b", borderColor: "#7f1d1d" },
  statusText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  empty: { color: "#64748b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
