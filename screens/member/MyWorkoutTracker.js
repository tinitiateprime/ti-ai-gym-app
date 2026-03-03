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

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout Tracker</Text>
        <Text style={styles.headerSub}>
          Track and complete your daily workouts
        </Text>
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
                <Text style={styles.day}>{workout.day}</Text>
                <Text
                  style={[
                    styles.title,
                    workout.completed && styles.completedText,
                  ]}
                >
                  {workout.title}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.statusBtn,
                workout.completed ? styles.doneBtn : styles.pendingBtn,
              ]}
              onPress={() => toggleComplete(workout.id)}
            >
              <Ionicons
                name={workout.completed ? "checkmark-done" : "ellipse-outline"}
                size={18}
                color="#fff"
              />
              <Text style={styles.statusText}>
                {workout.completed ? "Done" : "Pending"}
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

  day: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },

  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  pendingBtn: {
    backgroundColor: "#f59e0b",
  },
  doneBtn: {
    backgroundColor: "#10b981",
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
    fontSize: 13,
  },
});
