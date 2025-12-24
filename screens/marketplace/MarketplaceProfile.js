import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MarketplaceProfile({ navigation, route }) {
  // Example seller profile data
  const [seller, setSeller] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    shopName: "John's Fitness Store",
    address: "123, Market Street, City",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MarketplaceHomeScreen")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.profilePic}
          />
        </View>

        {/* Seller Info */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{seller.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{seller.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{seller.phone}</Text>

          <Text style={styles.label}>Shop Name</Text>
          <Text style={styles.value}>{seller.shopName}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{seller.address}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0f172a",
    gap: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  container: {
    padding: 20,
    alignItems: "center",
  },

  profilePicContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e5e7eb",
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
  },
});
