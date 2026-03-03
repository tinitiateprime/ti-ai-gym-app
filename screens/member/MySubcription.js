import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberSubscriptionScreen({ navigation }) {
  const [subscription] = useState({
    plan: "Gold Plan",
    status: "Active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
  });

  const handleRenew = () => {
    Alert.alert("Renew Subscription", "Redirect to payment page or API call");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={26} color="#e5e7eb" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="ribbon-outline" size={38} color="#38bdf8" />
          <Text style={styles.headerTitle}>My Subscription</Text>
          <Text style={styles.headerSub}>
            Manage your active membership
          </Text>
        </View>

        {/* Active Subscription */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="medal-outline" size={22} color="#38bdf8" />
            </View>
            <Text style={styles.planTitle}>{subscription.plan}</Text>
          </View>

          <Detail label="Status" value={subscription.status} active />
          <Detail label="Start Date" value={subscription.startDate} />
          <Detail label="End Date" value={subscription.endDate} />

          <TouchableOpacity style={styles.renewBtn} onPress={handleRenew}>
            <Ionicons name="refresh-outline" size={18} color="#020617" />
            <Text style={styles.btnText}> Renew / Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* History */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Subscription History</Text>

          <HistoryCard
            plan="Silver Plan"
            date="2024-01-01 to 2024-12-31"
          />

          <HistoryCard
            plan="Bronze Plan"
            date="2023-01-01 to 2023-12-31"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Components */

const Detail = ({ label, value, active }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text
      style={[
        styles.value,
        active ? styles.active : styles.inactive,
      ]}
    >
      {value}
    </Text>
  </View>
);

const HistoryCard = ({ plan, date }) => (
  <View style={styles.historyCard}>
    <Ionicons name="time-outline" size={20} color="#94a3b8" />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.historyPlan}>{plan}</Text>
      <Text style={styles.historyDate}>{date}</Text>
      <Text style={styles.historyStatus}>Expired</Text>
    </View>
  </View>
);

/* Styles */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },

  container: {
    padding: 20,
    paddingBottom: 60,
  },

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    marginTop: 8,
  },

  headerSub: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  planTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#f8fafc",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: "#94a3b8",
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
  },

  active: {
    color: "#22c55e",
  },

  inactive: {
    color: "#e5e7eb",
  },

  renewBtn: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#020617",
    fontWeight: "800",
    fontSize: 15,
  },

  historySection: {},

  historyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 14,
  },

  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  historyPlan: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  historyDate: {
    fontSize: 13,
    color: "#94a3b8",
    marginVertical: 4,
  },

  historyStatus: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ef4444",
  },
});
