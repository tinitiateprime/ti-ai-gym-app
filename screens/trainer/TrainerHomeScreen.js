import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MENU = [
  {
    key: "profile",
    title: "Profile",
    subtitle: "View & edit profile",
    icon: "person-circle-outline",
    route: "TrainerProfileScreen",
  },
  {
    key: "clients",
    title: "Clients",
    subtitle: "Manage your clients",
    icon: "people-outline",
    route: "TrainerClientsScreen",
  },
  {
    key: "calendar",
    title: "Calendar",
    subtitle: "Training schedule",
    icon: "calendar-outline",
    route: "TrainerCalendarScreen",
  },
  {
    key: "payments",
    title: "Payments",
    subtitle: "Earnings & history",
    icon: "wallet-outline",
    route: "TrainerPaymentScreen",
  },
  {
    key: "notifications",
    title: "Notifications",
    subtitle: "Alerts & updates",
    icon: "notifications-outline",
    route: "TrainerNotifications",
  },
];

export default function TrainerHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoChip}>
              <Ionicons name="barbell-outline" size={18} color="#93c5fd" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Trainer Dashboard</Text>
              <Text style={styles.headerSub}>Manage your fitness business</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("TrainerNotifications")}
          >
            <Ionicons name="notifications-outline" size={18} color="#e5e7eb" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("TrainerCalendarScreen")}
          >
            <Ionicons name="time-outline" size={16} color="#e5e7eb" />
            <Text style={styles.quickText}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("TrainerClientsScreen")}
          >
            <Ionicons name="person-add-outline" size={16} color="#e5e7eb" />
            <Text style={styles.quickText}>Add Client</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("TrainerPaymentScreen")}
          >
            <Ionicons name="cash-outline" size={16} color="#e5e7eb" />
            <Text style={styles.quickText}>Earnings</Text>
          </TouchableOpacity>
        </View>

        {/* Grid Menu */}
        <View style={styles.grid}>
          {MENU.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.tile}
              activeOpacity={0.9}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.tileTop}>
                <View style={styles.iconChip}>
                  <Ionicons name={item.icon} size={22} color="#60a5fa" />
                </View>
                <Ionicons name="chevron-forward" size={18} color="#475569" />
              </View>

              <Text style={styles.tileTitle}>{item.title}</Text>
              <Text style={styles.tileSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer note (web-safe, not absolute) */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Trainer App</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Help</Text>
            <Text style={styles.footerLink}>Settings</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },

  container: {
    padding: 16,
    paddingBottom: 26,
    backgroundColor: "#020617",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  logoChip: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "900" },
  headerSub: { marginTop: 4, color: "#94a3b8", fontSize: 12, fontWeight: "700" },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  quickRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  quickBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  quickText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  tile: {
    width: "48.2%",
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    minHeight: 116,

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  tileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconChip: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  tileTitle: { color: "#e5e7eb", fontSize: 14, fontWeight: "900" },
  tileSubtitle: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },

  footer: {
    marginTop: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    alignItems: "center",
  },
  footerText: { color: "#64748b", fontSize: 12, fontWeight: "800" },
  footerLinks: { flexDirection: "row", gap: 16, marginTop: 6 },
  footerLink: { fontSize: 12, color: "#60a5fa", fontWeight: "900" },
});


