import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberTrackerScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Chest & Triceps", date: "2025-12-22", status: "Pending" },
    { id: 2, name: "Back & Biceps", date: "2025-12-23", status: "Pending" },
    { id: 3, name: "Leg Day", date: "2025-12-24", status: "Pending" },
    { id: 4, name: "Shoulders & Abs", date: "2025-12-25", status: "Pending" },
  ]);

  const markDone = (id) => {
    setWorkouts((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === "Done" ? "Pending" : "Done" } : w
      )
    );
    Alert.alert("Success", "Workout status updated!");
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

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout Tracker</Text>
        <Text style={styles.headerSub}>Track your daily workouts</Text>
      </View>

      {/* Workout List */}
      <ScrollView contentContainerStyle={styles.container}>
        {workouts.map((workout) => (
          <View key={workout.id} style={styles.card}>
            <View style={styles.cardInfo}>
              <Ionicons
                name="barbell-outline"
                size={26}
                color="#4e9efc"
                style={{ marginRight: 12 }}
              />
              <View>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.statusBtn,
                workout.status === "Done" ? styles.doneBtn : styles.pendingBtn,
              ]}
              onPress={() => markDone(workout.id)}
            >
              <Text
                style={[
                  styles.statusText,
                  workout.status === "Done" && { color: "#fff" },
                ]}
              >
                {workout.status}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },

  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },

  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#020617",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    fontSize: 14,
    color: "#cbd5f5",
    marginTop: 4,
  },

  container: {
    padding: 16,
    paddingBottom: 80,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  workoutName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },
  workoutDate: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },

  statusBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  pendingBtn: {
    borderColor: "#4e9efc",
  },
  doneBtn: {
    borderColor: "#10b981",
    backgroundColor: "#10b981",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4e9efc",
  },
});
