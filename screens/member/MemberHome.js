import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberHomeScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("Home");

  const email = route?.params?.email || "";
  const fullName = route?.params?.fullName || "";
  const role = route?.params?.role || "MEMBER";

  useEffect(() => {
    const backAction = () => {
      navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const go = (screen) => navigation.navigate(screen, { email, fullName, role });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Ionicons name="fitness" size={36} color="#38bdf8" />
        <Text style={styles.title}>Member Dashboard</Text>
        <Text style={styles.subtitle}>{fullName ? fullName : "Train • Track • Transform"}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          <DashboardCard title="Profile" icon="person" onPress={() => go("MyProfile")} />
          <DashboardCard title="Calendar" icon="calendar" onPress={() => go("MyCalendar")} />
          <DashboardCard title="Subscription" icon="ribbon" onPress={() => go("MySubscription")} />
          <DashboardCard title="Payments" icon="wallet" onPress={() => go("MyPayment")} />
          <DashboardCard title="Notifications" icon="notifications" onPress={() => go("MyNotifications")} />
          <DashboardCard title="Workouts" icon="barbell" onPress={() => go("MyWorkoutTracker")} />

          {/* ✅ NEW */}
          <DashboardCard title="Exercise Logger" icon="timer" onPress={() => go("ExerciseLogger")} />
          <DashboardCard title="Reports" icon="stats-chart" onPress={() => go("ExerciseReports")} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Tab icon="home" label="Home" active={activeTab === "Home"} onPress={() => setActiveTab("Home")} />
        <Tab icon="timer" label="Log" active={activeTab === "Log"} onPress={() => { setActiveTab("Log"); go("ExerciseLogger"); }} />
        <Tab icon="stats-chart" label="Reports" active={activeTab === "Reports"} onPress={() => { setActiveTab("Reports"); go("ExerciseReports"); }} />
        <Tab icon="person" label="Profile" active={activeTab === "Profile"} onPress={() => { setActiveTab("Profile"); go("MyProfile"); }} />
      </View>
    </SafeAreaView>
  );
}

function DashboardCard({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={26} color="#38bdf8" />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

function Tab({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <Ionicons name={icon} size={24} color={active ? "#38bdf8" : "#94a3b8"} />
      <Text style={[styles.tabText, active && { color: "#38bdf8" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020617" },

  header: { backgroundColor: "#020617", paddingVertical: 22, alignItems: "center" },
  title: { color: "#f8fafc", fontSize: 24, fontWeight: "800", marginTop: 8 },
  subtitle: { color: "#94a3b8", fontSize: 14, marginTop: 4 },

  container: { backgroundColor: "#f8fafc", padding: 16, flexGrow: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },

  card: { width: "48%", backgroundColor: "#fff", borderRadius: 16, paddingVertical: 22, alignItems: "center", marginBottom: 16, elevation: 4 },
  iconCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: "#020617", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  cardText: { fontSize: 15, fontWeight: "700", color: "#020617" },

  footer: { flexDirection: "row", backgroundColor: "#020617", paddingVertical: 10, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "#1e293b" },
  tab: { alignItems: "center" },
  tabText: { fontSize: 11, marginTop: 2, color: "#94a3b8", fontWeight: "600" },
});
