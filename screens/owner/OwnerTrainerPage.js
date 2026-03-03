import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TRAINERS = [
  {
    id: "1",
    name: "Rahul Verma",
    speciality: "Strength & Conditioning",
    experience: "5 Years",
    status: "Active",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
  {
    id: "2",
    name: "Anjali Sharma",
    speciality: "Yoga & Flexibility",
    experience: "3 Years",
    status: "Active",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
  },
  {
    id: "3",
    name: "Kiran Reddy",
    speciality: "CrossFit Coach",
    experience: "4 Years",
    status: "Inactive",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
  },
];

const isWeb = Platform.OS === "web";

export default function OwnerTrainerPage({ navigation }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All"); // All | Active | Inactive

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();

    return TRAINERS.filter((t) => {
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.speciality.toLowerCase().includes(q);

      const matchesFilter =
        filter === "All" ? true : t.status.toLowerCase() === filter.toLowerCase();

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const stats = useMemo(() => {
    const total = TRAINERS.length;
    const active = TRAINERS.filter((t) => t.status === "Active").length;
    const inactive = TRAINERS.filter((t) => t.status === "Inactive").length;
    return { total, active, inactive };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Trainers</Text>
            <Text style={styles.subTitle}>
              {stats.total} total • {stats.active} active • {stats.inactive} inactive
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.9}
            onPress={() => navigation?.navigate?.("AddTrainer")}
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
            placeholder="Search trainer or speciality"
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

        {/* Trainer List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 22 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No trainers found{filter !== "All" ? ` in ${filter}` : ""}.
            </Text>
          }
          renderItem={({ item }) => {
            const active = item.status === "Active";

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => {
                  // navigation.navigate("TrainerDetails", { id: item.id })
                }}
              >
                {/* Accent */}
                <View style={[styles.accentBar, { backgroundColor: active ? "#22c55e" : "#ef4444" }]} />

                <Image source={{ uri: item.avatar }} style={styles.avatar} />

                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <StatusPill status={item.status} />
                  </View>

                  <Text style={styles.meta} numberOfLines={1}>
                    {item.speciality}
                  </Text>

                  <View style={styles.chipsRow}>
                    <View style={styles.chip}>
                      <Ionicons name="time-outline" size={14} color="#93c5fd" />
                      <Text style={styles.chipText}>{item.experience}</Text>
                    </View>

                    <View style={styles.chipSoft}>
                      <Ionicons name="barbell-outline" size={14} color="#93c5fd" />
                      <Text style={styles.chipTextSoft}>Assigned</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.actionsCol}>
                  <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9}>
                    <Ionicons name="call-outline" size={16} color="#e5e7eb" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9}>
                    <Ionicons name="chatbubble-ellipses-outline" size={16} color="#e5e7eb" />
                  </TouchableOpacity>

                  <Ionicons name="chevron-forward" size={18} color="#475569" />
                </View>
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
  title: { color: "#fff", fontSize: 22, fontWeight: "900" },
  subTitle: { color: "#94a3b8", marginTop: 4, fontWeight: "700", fontSize: 12 },

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

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  name: { color: "#e5e7eb", fontSize: 14, fontWeight: "900", flex: 1 },

  meta: { color: "#94a3b8", fontSize: 12, marginTop: 6, fontWeight: "700" },

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
  chipSoft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(59,130,246,0.12)",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.35)",
  },
  chipText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },
  chipTextSoft: { color: "#bfdbfe", fontSize: 12, fontWeight: "900" },

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

  actionsCol: { alignItems: "flex-end", justifyContent: "space-between", height: 66 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  empty: { color: "#64748b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
