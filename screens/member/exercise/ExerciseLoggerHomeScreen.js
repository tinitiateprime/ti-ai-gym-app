// src/screens/member/exercise/ExerciseLoggerHomeScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WORKOUT_CATALOG } from "../../constants/workoutCatalog";

export default function ExerciseLoggerHomeScreen({ navigation, route }) {
  const userEmail = (route?.params?.userEmail || route?.params?.email || "").toLowerCase();
  const userName = route?.params?.fullName || route?.params?.userName || "";

  const openWorkout = (group, item) => {
    navigation.navigate("ExerciseSession", {
      email: userEmail,
      userEmail,
      fullName: userName,
      userName,

      workoutId: item.id,
      workoutTypeId: group.id,
      workoutTypeName: group.name,
      category: item.category,
      exerciseName: item.name,
      workoutConfig: {
        ...item,
        workoutTypeId: group.id,
        workoutTypeName: group.name,
        workoutTypeIcon: group.icon,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="barbell-outline" size={34} color="#38bdf8" />
          <Text style={styles.title}>Workout Explorer</Text>
          <Text style={styles.sub}>All workouts are loaded dynamically from the catalog</Text>
        </View>

        <TouchableOpacity
          style={styles.reportBtn}
          onPress={() =>
            navigation.navigate("ExerciseReports", {
              email: userEmail,
              userEmail,
              fullName: userName,
              userName,
            })
          }
        >
          <Ionicons name="stats-chart-outline" size={20} color="#020617" />
          <Text style={styles.reportText}>Open Reports</Text>
        </TouchableOpacity>

        {WORKOUT_CATALOG.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={styles.groupHeaderLeft}>
                <Ionicons
                  name={group.icon || "barbell-outline"}
                  size={20}
                  color="#38bdf8"
                />
                <Text style={styles.groupTitle}>{group.name}</Text>
              </View>

              <Text style={styles.groupCount}>{group.items.length} workouts</Text>
            </View>

            {group.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => openWorkout(group, item)}
              >
                <View style={styles.itemLeft}>
                  <Ionicons
                    name={group.icon || "barbell-outline"}
                    size={20}
                    color="#38bdf8"
                  />

                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemSub}>
                      {item.category} • {item.defaultSets} sets • {item.defaultTimerSec}s
                      {item.defaultReps ? ` • ${item.defaultReps} reps` : ""}
                    </Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  scrollContent: { padding: 16, paddingBottom: 30 },

  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    marginBottom: 18,
  },
  title: { color: "#f8fafc", fontSize: 22, fontWeight: "900", marginTop: 8 },
  sub: { color: "#94a3b8", marginTop: 4, textAlign: "center" },

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

  groupCard: {
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  groupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  groupTitle: { color: "#f8fafc", fontSize: 16, fontWeight: "900" },
  groupCount: { color: "#94a3b8", fontSize: 12, fontWeight: "700" },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemTitle: { color: "#f8fafc", fontWeight: "800", fontSize: 15 },
  itemSub: { color: "#94a3b8", marginTop: 3, fontSize: 12 },
});