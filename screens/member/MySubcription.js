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
  // Example subscription data (fetch from backend in real app)
  const [subscription, setSubscription] = useState({
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
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MemberHome")}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Subscription</Text>
          <Text style={styles.headerSub}>
            View your subscription details
          </Text>
        </View>

        {/* Subscription Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="ribbon-outline" size={28} color="#4e9efc" />
            <Text style={styles.planTitle}>{subscription.plan}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Status:</Text>
            <Text
              style={[
                styles.value,
                subscription.status === "Active"
                  ? { color: "#10b981" }
                  : { color: "#ef4444" },
              ]}
            >
              {subscription.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>{subscription.startDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.value}>{subscription.endDate}</Text>
          </View>

          <TouchableOpacity style={styles.renewBtn} onPress={handleRenew}>
            <Text style={styles.btnText}>Renew / Upgrade</Text>
          </TouchableOpacity>
        </View>

        {/* Optional: Add history of past subscriptions */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Subscription History</Text>

          <View style={styles.historyCard}>
            <Text style={styles.historyPlan}>Silver Plan</Text>
            <Text style={styles.historyDate}>2024-01-01 to 2024-12-31</Text>
            <Text style={[styles.historyStatus, { color: "#ef4444" }]}>
              Expired
            </Text>
          </View>

          <View style={styles.historyCard}>
            <Text style={styles.historyPlan}>Bronze Plan</Text>
            <Text style={styles.historyDate}>2023-01-01 to 2023-12-31</Text>
            <Text style={[styles.historyStatus, { color: "#ef4444" }]}>
              Expired
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 20, paddingBottom: 50 },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },

  header: { marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#020617" },
  headerSub: { fontSize: 14, color: "#64748b", marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  planTitle: { fontSize: 20, fontWeight: "700", marginLeft: 10, color: "#020617" },

  detailRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  label: { fontSize: 14, color: "#64748b" },
  value: { fontSize: 14, fontWeight: "600" },

  renewBtn: {
    marginTop: 20,
    backgroundColor: "#4e9efc",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  historySection: {},
  historyTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#020617" },
  historyCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  historyPlan: { fontSize: 16, fontWeight: "600", color: "#020617" },
  historyDate: { fontSize: 13, color: "#64748b", marginVertical: 4 },
  historyStatus: { fontSize: 14, fontWeight: "600" },
});
