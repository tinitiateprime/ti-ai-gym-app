import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MarketplaceProfile({ navigation }) {
  const [seller] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    shopName: "John's Fitness Store",
    address: "123, Market Street, City",
  });

  const todayStatus =
    "Reviewed product stock, updated prices, and verified profile information.";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Row */}
        <View style={styles.profileRow}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.name}>{seller.name}</Text>
            <Text style={styles.shop}>{seller.shopName}</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <InfoCard icon="mail" label="Email" value={seller.email} />
          <InfoCard icon="call" label="Phone" value={seller.phone} />
          <InfoCard icon="location" label="Address" value={seller.address} />
        </View>

        {/* Work Status */}
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Ionicons name="clipboard-outline" size={20} color="#60a5fa" />
            <Text style={styles.activityTitle}>Today Activity</Text>
          </View>
          <Text style={styles.activityText}>{todayStatus}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoCard = ({ icon, label, value }) => (
  <View style={styles.infoCard}>
    <Ionicons name={icon} size={18} color="#38bdf8" />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
  },

  container: {
    padding: 16,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  profileText: {
    marginLeft: 14,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  shop: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },

  infoGrid: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
  },
  infoLabel: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 6,
  },
  infoValue: {
    color: "#e5e7eb",
    fontSize: 14,
    marginTop: 2,
  },

  activityCard: {
    backgroundColor: "#020617",
    borderLeftWidth: 4,
    borderLeftColor: "#60a5fa",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  activityTitle: {
    color: "#60a5fa",
    fontWeight: "700",
    fontSize: 15,
  },
  activityText: {
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 20,
  },
});
