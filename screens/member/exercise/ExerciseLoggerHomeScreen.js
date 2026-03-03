// screens/member/exercise/ExerciseLoggerHomeScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { initExerciseDb } from "../../../db/exerciseDb";

const EXERCISES = [
  { name: "Pushups", category: "Strength" },
  { name: "Squats", category: "Strength" },
  { name: "Running", category: "Cardio" },
  { name: "Cycling", category: "Cardio" },
];

export default function ExerciseLoggerHomeScreen({ navigation, route }) {
  // ✅ accept both param names
  const userEmail = (route?.params?.userEmail || route?.params?.email || "").toLowerCase();

  useEffect(() => {
    initExerciseDb().catch(console.warn);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Ionicons name="barbell-outline" size={34} color="#38bdf8" />
        <Text style={styles.title}>Exercise Logger</Text>
        <Text style={styles.sub}>Save workouts locally (SQLite)</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={styles.reportBtn}
          onPress={() => navigation.navigate("ExerciseReports", { email: userEmail })}
        >
          <Ionicons name="stats-chart-outline" size={20} color="#020617" />
          <Text style={styles.reportText}>Open Reports</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Choose Exercise</Text>

        {EXERCISES.map((ex) => (
          <TouchableOpacity
            key={ex.name}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ExerciseSession", {
                email: userEmail, // ✅ consistent param name
                exerciseName: ex.name,
                category: ex.category,
              })
            }
          >
            <Ionicons
              name={ex.category === "Cardio" ? "walk-outline" : "barbell-outline"}
              size={22}
              color="#38bdf8"
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.cardTitle}>{ex.name}</Text>
              <Text style={styles.cardSub}>{ex.category}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  title: { color: "#f8fafc", fontSize: 22, fontWeight: "900", marginTop: 8 },
  sub: { color: "#94a3b8", marginTop: 4 },
  body: { padding: 16 },
  reportBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#38bdf8",
    padding: 12,
    borderRadius: 14,
    marginBottom: 18,
  },
  reportText: { fontWeight: "900", color: "#020617" },
  sectionTitle: { color: "#e5e7eb", fontWeight: "800", marginBottom: 10, marginTop: 8 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  cardTitle: { color: "#f8fafc", fontWeight: "800", fontSize: 16 },
  cardSub: { color: "#94a3b8", marginTop: 2, fontSize: 12 },
});
