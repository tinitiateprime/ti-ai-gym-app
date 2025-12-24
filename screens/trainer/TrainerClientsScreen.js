import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const clients = [
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

export default function TrainerClientsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Clients</Text>
      </View>

      {/* Client List */}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subText}>Goal: {item.goal}</Text>
              <Text style={styles.subText}>Plan: {item.plan}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                item.status === "Active"
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </TouchableOpacity>
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

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 12,
  },

  info: { flex: 1 },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },

  subText: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  active: { backgroundColor: "#dcfce7" },
  inactive: { backgroundColor: "#fee2e2" },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
  },
});
