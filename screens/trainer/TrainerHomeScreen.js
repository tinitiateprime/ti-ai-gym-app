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
import { LinearGradient } from "expo-linear-gradient";

const MENU = [
  {
    key: "profile",
    title: "Profile",
    subtitle: "View & edit trainer profile",
    icon: "person-circle-outline",
    route: "TrainerProfileScreen",
  },
  {
    key: "clients",
    title: "Clients",
    subtitle: "Manage and monitor clients",
    icon: "people-outline",
    route: "TrainerClientsScreen",
  },
  {
    key: "calendar",
    title: "Calendar",
    subtitle: "Training sessions & plans",
    icon: "calendar-outline",
    route: "TrainerCalendarScreen",
  },
  {
    key: "payments",
    title: "Payments",
    subtitle: "Track earnings & payouts",
    icon: "wallet-outline",
    route: "TrainerPaymentScreen",
  },
  {
    key: "notifications",
    title: "Notifications",
    subtitle: "Important alerts & updates",
    icon: "notifications-outline",
    route: "TrainerNotifications",
  },
];

const QUICK_ACTIONS = [
  {
    key: "today",
    label: "Today",
    icon: "time-outline",
    route: "TrainerCalendarScreen",
  },
  {
    key: "client",
    label: "Add Client",
    icon: "person-add-outline",
    route: "TrainerClientsScreen",
  },
  {
    key: "earnings",
    label: "Earnings",
    icon: "cash-outline",
    route: "TrainerPaymentScreen",
  },
];

export default function TrainerHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.brandWrap}>
            <LinearGradient
              colors={["#3b82f6", "#8b5cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.brandIcon}
            >
              <Ionicons name="barbell-outline" size={20} color="#ffffff" />
            </LinearGradient>

            <View>
              <Text style={styles.brandTitle}>Trainer Dashboard</Text>
              <Text style={styles.brandSubtitle}>Premium fitness workspace</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.notifyBtn}
            onPress={() => navigation.navigate("TrainerNotifications")}
          >
            <Ionicons name="notifications-outline" size={20} color="#ffffff" />
            <View style={styles.notifyDot} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <LinearGradient
          colors={["#111827", "#0f172a", "#1e1b4b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.heroHeader}>
            <View style={styles.heroBadge}>
              <Ionicons name="flash-outline" size={14} color="#93c5fd" />
              <Text style={styles.heroBadgeText}>PRO TRAINER</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Manage your fitness business in style</Text>
          <Text style={styles.heroSubtitle}>
            Organize clients, schedules, earnings, and updates from one premium
            dashboard.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Clients</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>$4.8K</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionSub}>Speed up your daily work</Text>
        </View>

        <View style={styles.quickRow}>
          {QUICK_ACTIONS.map((action, index) => (
            <TouchableOpacity
              key={action.key}
              activeOpacity={0.9}
              style={styles.quickBtnWrap}
              onPress={() => navigation.navigate(action.route)}
            >
              <LinearGradient
                colors={
                  index === 0
                    ? ["#1d4ed8", "#2563eb"]
                    : index === 1
                    ? ["#7c3aed", "#8b5cf6"]
                    : ["#0f766e", "#14b8a6"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickBtn}
              >
                <Ionicons name={action.icon} size={18} color="#ffffff" />
                <Text style={styles.quickText}>{action.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Menu */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workspace</Text>
          <Text style={styles.sectionSub}>Everything you need at a glance</Text>
        </View>

        <View style={styles.grid}>
          {MENU.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.92}
              style={styles.tile}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.tileOverlay} />
              <View style={styles.tileTop}>
                <LinearGradient
                  colors={
                    index % 3 === 0
                      ? ["#2563eb", "#60a5fa"]
                      : index % 3 === 1
                      ? ["#7c3aed", "#a78bfa"]
                      : ["#0891b2", "#22d3ee"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconChip}
                >
                  <Ionicons name={item.icon} size={22} color="#ffffff" />
                </LinearGradient>

                <View style={styles.arrowChip}>
                  <Ionicons name="arrow-forward" size={14} color="#cbd5e1" />
                </View>
              </View>

              <Text style={styles.tileTitle}>{item.title}</Text>
              <Text style={styles.tileSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Trainer App</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.footerLink}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.footerLink}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050816",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 34,
    backgroundColor: "#050816",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  brandWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#3b82f6",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  brandTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  brandSubtitle: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "600",
  },

  notifyBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  notifyDot: {
    position: "absolute",
    top: 11,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#22c55e",
  },

  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  heroGlowOne: {
    position: "absolute",
    top: -30,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(59,130,246,0.16)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -40,
    left: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(139,92,246,0.14)",
  },

  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  heroBadgeText: {
    color: "#dbeafe",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 26,
    lineHeight: 33,
    fontWeight: "900",
    marginBottom: 8,
    maxWidth: "90%",
  },

  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 18,
    maxWidth: "92%",
  },

  heroStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  statValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  statLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  sectionSub: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },

  quickBtnWrap: {
    flex: 1,
  },

  quickBtn: {
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  quickText: {
    color: "#ffffff",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  tile: {
    width: "48.3%",
    minHeight: 150,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  tileOverlay: {
    position: "absolute",
    right: -18,
    top: -18,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  tileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  iconChip: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  arrowChip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  tileTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },

  tileSubtitle: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },

  footer: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  footerText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },

  footerLink: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
  },
});