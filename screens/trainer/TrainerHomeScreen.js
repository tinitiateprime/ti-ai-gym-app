import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TrainerHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trainer Dashboard</Text>
        <Text style={styles.headerSub}>
          Manage your fitness business
        </Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <DashboardCard
          icon="person-circle-outline"
          title="Profile"
          subtitle="View & edit profile"
          onPress={() =>
            navigation.navigate("TrainerProfileScreen")
          }
        />

        <DashboardCard
          icon="people-outline"
          title="Clients"
          subtitle="Manage your clients"
          onPress={() =>
            navigation.navigate("TrainerClientsScreen")
          }
        />

        <DashboardCard
          icon="calendar-outline"
          title="Calendar"
          subtitle="Training schedule"
          onPress={() =>
            navigation.navigate("TrainerCalendarScreen")
          }
        />

        <DashboardCard
          icon="wallet-outline"
          title="Payments"
          subtitle="Earnings & history"
          onPress={() =>
            navigation.navigate("TrainerPaymentScreen")
          }
        />

        <DashboardCard
          icon="notifications-outline"
          title="Notifications"
          subtitle="Alerts & updates"
          onPress={() =>
            navigation.navigate("TrainerNotifications")
          }
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Trainer App
        </Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Help</Text>
          <Text style={styles.footerLink}>Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* Reusable Dashboard Card */
function DashboardCard({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={26} color="#020617" />
      </View>

      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#94a3b8"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  /* Header */
  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#020617",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    fontSize: 13,
    color: "#cbd5f5",
    marginTop: 4,
  },

  /* Content */
  container: {
    padding: 16,
    paddingBottom: 80,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 55,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#64748b",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },

  footerLink: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "600",
  },
});
