import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OwnerDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Owner Dashboard</Text>

      {/* My Profile */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OwnerProfile")}
      >
        <Ionicons name="person-circle" size={26} color="#4e9efc" />
        <Text style={styles.cardText}>My Profile</Text>
      </TouchableOpacity>

      {/* My Calendar */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OwnerCalendar")}
      >
        <Ionicons name="calendar" size={26} color="#4e9efc" />
        <Text style={styles.cardText}>My Calendar</Text>
      </TouchableOpacity>

      {/* Trainers */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OwnerTrainerPage")}
      >
        <Ionicons name="school" size={26} color="#4e9efc" />
        <Text style={styles.cardText}>Trainers</Text>
      </TouchableOpacity>

      {/* Marketplace */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OwnerMarketplace")}
      >
        <Ionicons name="cart" size={26} color="#4e9efc" />
        <Text style={styles.cardText}>Marketplace</Text>
      </TouchableOpacity>

      {/* My Members */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OwnerMember")}
      >
        <Ionicons name="people" size={26} color="#4e9efc" />
        <Text style={styles.cardText}>My Members</Text>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("OwnerNotifications")}
      >
        <Ionicons name="notifications" size={26} color="#4e9efc" />
        <Text style={styles.cardText}>My Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#020617",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    gap: 14,
  },
  cardText: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
  },
});
