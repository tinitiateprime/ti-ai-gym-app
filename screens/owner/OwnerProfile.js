import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OwnerProfile() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Hero */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
                style={styles.avatar}
              />
              <View style={styles.statusDot} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Eswar Reddy</Text>
              <View style={styles.roleRow}>
                <Ionicons name="shield-checkmark" size={14} color="#93c5fd" />
                <Text style={styles.role}>Gym Owner</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.85}>
              <Ionicons name="share-social-outline" size={18} color="#e5e7eb" />
            </TouchableOpacity>
          </View>

          {/* Quick highlights */}
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Ionicons name="business-outline" size={14} color="#93c5fd" />
              <Text style={styles.pillText}>XMB Fitness Club</Text>
            </View>
            <View style={styles.pill}>
              <Ionicons name="location-outline" size={14} color="#93c5fd" />
              <Text style={styles.pillText}>Hyderabad</Text>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Information</Text>

          <InfoRow icon="business" label="Gym Name" value="XMB Fitness Club" />
          <Divider />
          <InfoRow icon="location" label="Location" value="Hyderabad, India" />
          <Divider />
          <InfoRow icon="call" label="Phone" value="+91 98765 43210" />
          <Divider />
          <InfoRow icon="mail" label="Email" value="owner@gymxmb.com" />
        </View>

        {/* Stats */}
        <View style={styles.statsWrap}>
          <StatCard title="Members" value="120+" icon="people-outline" />
          <StatCard title="Trainers" value="8" icon="school-outline" />
          <StatCard title="Revenue" value="₹2.4L" icon="cash-outline" />
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.primaryText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Secondary actions (optional) */}
        <View style={styles.secondaryRow}>
          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.9}>
            <Ionicons name="lock-closed-outline" size={16} color="#e5e7eb" />
            <Text style={styles.secondaryText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.9}>
            <Ionicons name="log-out-outline" size={16} color="#e5e7eb" />
            <Text style={styles.secondaryText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Components ---------------- */

const Divider = () => <View style={styles.divider} />;

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.iconChip}>
      <Ionicons name={icon} size={18} color="#60a5fa" />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>

    <Ionicons name="chevron-forward" size={18} color="#475569" />
  </View>
);

const StatCard = ({ title, value, icon }) => (
  <View style={styles.statCard}>
    <View style={styles.statIcon}>
      <Ionicons name={icon} size={18} color="#60a5fa" />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: {
    padding: 18,
    paddingBottom: 28,
    backgroundColor: "#020617",
  },

  /* Hero */
  hero: {
    backgroundColor: "#0b1224",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarWrap: {
    position: "relative",
    width: 66,
    height: 66,
    borderRadius: 18,
    padding: 2,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  statusDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#0b1224",
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  roleRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  role: { color: "#94a3b8", fontSize: 12, fontWeight: "700" },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  pillsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    flexWrap: "wrap",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  pillText: { color: "#e5e7eb", fontSize: 12, fontWeight: "700" },

  /* Card */
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 14,
  },
  cardTitle: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#1e293b",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconChip: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  label: { color: "#94a3b8", fontSize: 11, fontWeight: "700" },
  value: { color: "#e5e7eb", fontSize: 14, fontWeight: "800", marginTop: 2 },

  /* Stats */
  statsWrap: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
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
  statValue: { color: "#60a5fa", fontSize: 18, fontWeight: "900" },
  statTitle: { color: "#94a3b8", marginTop: 4, fontSize: 11, fontWeight: "800" },

  /* Buttons */
  primaryBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  primaryText: { color: "#fff", fontSize: 15, fontWeight: "900" },

  secondaryRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  secondaryBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  secondaryText: { color: "#e5e7eb", fontSize: 12, fontWeight: "800" },
});
