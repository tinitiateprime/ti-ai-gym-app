import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberWorkoutTrackerScreen({ navigation }) {
  // Example workout data (replace with API fetch)
  const [workouts, setWorkouts] = useState([
    { id: 1, day: "Monday", title: "Chest & Triceps", completed: false },
    { id: 2, day: "Tuesday", title: "Back & Biceps", completed: true },
    { id: 3, day: "Wednesday", title: "Legs & Abs", completed: false },
    { id: 4, day: "Thursday", title: "Shoulders & Arms", completed: false },
    { id: 5, day: "Friday", title: "Full Body HIIT", completed: false },
    { id: 6, day: "Saturday", title: "Yoga & Stretching", completed: true },
  ]);

  const toggleComplete = (id) => {
    setWorkouts((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, completed: !w.completed } : w
      )
    );
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
          <Text style={styles.headerTitle}>Workout Tracker</Text>
          <Text style={styles.headerSub}>
            Track and complete your daily workouts
          </Text>
        </View>

        {/* Workout List */}
        {workouts.map((workout) => (
          <View key={workout.id} style={styles.card}>
            <View>
              <Text style={styles.day}>{workout.day}</Text>
              <Text
                style={[
                  styles.title,
                  workout.completed
                    ? { textDecorationLine: "line-through", color: "#64748b" }
                    : {},
                ]}
              >
                {workout.title}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.statusBtn,
                workout.completed ? styles.completed : styles.pending,
              ]}
              onPress={() => toggleComplete(workout.id)}
            >
              <Ionicons
                name={workout.completed ? "checkmark-done" : "ellipse-outline"}
                size={20}
                color="#fff"
              />
              <Text style={styles.statusText}>
                {workout.completed ? "Completed" : "Pending"}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },

  day: { fontSize: 14, color: "#94a3b8", marginBottom: 4 },
  title: { fontSize: 16, fontWeight: "700", color: "#020617" },

  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  completed: { backgroundColor: "#10b981" },
  pending: { backgroundColor: "#f59e0b" },
  statusText: { color: "#fff", fontWeight: "700", marginLeft: 6, fontSize: 13 },
});
