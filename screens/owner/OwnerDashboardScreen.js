import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MENU = [
  {
    key: "profile",
    title: "My Profile",
    subtitle: "Owner & gym info",
    icon: "person-circle-outline",
    route: "OwnerProfile",
  },
  {
    key: "calendar",
    title: "My Calendar",
    subtitle: "Schedules & slots",
    icon: "calendar-outline",
    route: "OwnerCalendar",
  },
  {
    key: "trainers",
    title: "Trainers",
    subtitle: "Roster & approvals",
    icon: "school-outline",
    route: "OwnerTrainerPage",
  },
  {
    key: "market",
    title: "Marketplace",
    subtitle: "Products & stock",
    icon: "cart-outline",
    route: "OwnerMarketplace",
  },
  {
    key: "members",
    title: "My Members",
    subtitle: "Plans & renewals",
    icon: "people-outline",
    route: "OwnerMember",
  },
  {
    key: "notifications",
    title: "Notifications",
    subtitle: "Alerts & updates",
    icon: "notifications-outline",
    route: "OwnerNotifications",
  },
];

export default function OwnerDashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoChip}>
            <Ionicons name="fitness-outline" size={20} color="#93c5fd" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Owner Dashboard</Text>
            <Text style={styles.subTitle}>Manage gym operations in one place</Text>
          </View>

          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("OwnerNotifications")}
          >
            <Ionicons name="notifications-outline" size={18} color="#e5e7eb" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("OwnerCalendar")}
          >
            <Ionicons name="time-outline" size={16} color="#e5e7eb" />
            <Text style={styles.quickText}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("OwnerMember")}
          >
            <Ionicons name="person-add-outline" size={16} color="#e5e7eb" />
            <Text style={styles.quickText}>Add Member</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("OwnerTrainerPage")}
          >
            <Ionicons name="shield-checkmark-outline" size={16} color="#e5e7eb" />
            <Text style={styles.quickText}>Approvals</Text>
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

        {/* Footer hint */}
        <Text style={styles.footerHint}>
          Tip: Check Marketplace for low stock and Notifications for alerts.
        </Text>
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
    gap: 12,
    marginBottom: 14,
  },
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
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  subTitle: {
    marginTop: 3,
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
  },
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

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
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

  footerHint: {
    marginTop: 16,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
