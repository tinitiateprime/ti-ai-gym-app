import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OwnerProfile() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Eswar Reddy</Text>
        <Text style={styles.role}>Gym Owner</Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <InfoRow icon="business" label="Gym Name" value="XMB Fitness Club" />
        <InfoRow icon="location" label="Location" value="Hyderabad, India" />
        <InfoRow icon="call" label="Phone" value="+91 98765 43210" />
        <InfoRow icon="mail" label="Email" value="owner@gymxmb.com" />
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatCard title="Members" value="120+" />
        <StatCard title="Trainers" value="8" />
        <StatCard title="Revenue" value="₹2.4L" />
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editBtn}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- Components ---------------- */

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={20} color="#4e9efc" />
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const StatCard = ({ title, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4e9efc",
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  role: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 2,
  },

  infoCard: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
    alignItems: "center",
  },

  label: {
    color: "#94a3b8",
    fontSize: 12,
  },

  value: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: "#0f172a",
    flex: 1,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  statValue: {
    color: "#4e9efc",
    fontSize: 20,
    fontWeight: "800",
  },

  statTitle: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 12,
  },

  editBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#4e9efc",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
