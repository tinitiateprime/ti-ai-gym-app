import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberHomeScreen({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Member Dashboard</Text>

      <Card title="My Profile" icon="person-circle-outline" onPress={() => navigation.navigate("MyProfile")} />
      <Card title="My Calendar" icon="calendar-outline" onPress={() => navigation.navigate("MyCalendar")} />
      <Card title="My Subscriptions" icon="ribbon-outline" onPress={() => navigation.navigate("MySubscription")} />
      <Card title="My Payments" icon="wallet-outline" onPress={() => navigation.navigate("MyPayment")} />
      <Card title="My Notifications" icon="notifications-outline" onPress={() => navigation.navigate("MyNotifications")} />
      <Card title="Workout Tracker" icon="barbell-outline" onPress={() => navigation.navigate("MyWorkoutTracker")} />
    </ScrollView>
  );
}

function Card({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={26} color="#4e9efc" />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    padding: 14,
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
