import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function TrainerProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trainer Profile</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Card */}
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
            <View style={styles.statBox}>
              <Text style={styles.statValue}>8+</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>120+</Text>
              <Text style={styles.statLabel}>Clients</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Experienced personal trainer specializing in weight loss, muscle
            building, and functional training. Passionate about helping clients
            achieve sustainable fitness goals.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specializations</Text>
          <Text style={styles.sectionText}>
            • Weight Training{"\n"}
            • Cardio & HIIT{"\n"}
            • Diet Guidance{"\n"}
            • Strength Conditioning
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Fitness App</Text>
      </View>
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

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },

  name: { fontSize: 20, fontWeight: "700", color: "#020617" },
  role: { fontSize: 14, color: "#64748b", marginBottom: 16 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  statBox: {
    alignItems: "center",
    flex: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
  },
  statLabel: { fontSize: 12, color: "#64748b" },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#020617",
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
    backgroundColor: "#020617",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "600" },
  secondaryText: { color: "#020617", fontWeight: "600" },

  footer: {
    height: 45,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: { fontSize: 12, color: "#64748b" },
});
