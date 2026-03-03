
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function TrainerPage() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trainer Profile</Text>
        </View>

        {/* Profile */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Rahul Verma</Text>
          <Text style={styles.role}>Certified Fitness Trainer</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>8+</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>120+</Text>
              <Text style={styles.statLabel}>Clients</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Experienced trainer focused on weight loss, muscle building, and
            functional fitness. Helping clients stay strong and consistent.
          </Text>
        </View>

        {/* Specializations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specializations</Text>
          <Text style={styles.sectionText}>• Weight Training</Text>
          <Text style={styles.sectionText}>• Cardio & HIIT</Text>
          <Text style={styles.sectionText}>• Strength Conditioning</Text>
          <Text style={styles.sectionText}>• Diet Guidance</Text>
        </View>

        {/* Actions */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  container: {
    padding: 16,
  },

  header: {
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#020617",
  },

  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
  },

  role: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 14,
  },

  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  stat: {
    alignItems: "center",
    flex: 1,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },

  statLabel: {
    fontSize: 12,
    color: "#64748b",
  },

  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 6,
  },

  sectionText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryText: {
    color: "#ffffff",
    fontWeight: "600",
  },

  secondaryText: {
    color: "#020617",
    fontWeight: "600",
  },
});
