import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import userActivity from "../../data/useractivity.json";

export default function ManageTrainerScreen() {

  // Get trainers
  const trainers = userActivity.filter(item => item.role === "trainer");

  // Get all paid members
  const paidMembers = userActivity.filter(
    item => item.role === "member" && item.isPaid
  );

  const trainersWithSummary = useMemo(() => {
    return trainers.map(trainer => {

      // Trainer summary
      const totalDays = trainer.months?.reduce((sum, m) => sum + (m.days || 0), 0);
      const totalHours = trainer.months?.reduce((sum, m) => sum + (m.hours || 0), 0);

      // Members assigned to this trainer
      const assignedMembers = paidMembers.filter(
        mem => mem.trainerEmail === trainer.email
      );

      return {
        ...trainer,
        totalDays,
        totalHours,
        assignedMembers
      };
    });
  }, []);

  const getTrainerName = (email) => {
    const t = userActivity.find(u => u.email === email);
    return t ? t.fullName : "Unknown";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer Attendance Report</Text>

      <FlatList
        data={trainersWithSummary}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.email}>{item.email}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Total Days: </Text>
              <Text style={styles.value}>{item.totalDays}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total Hours: </Text>
              <Text style={styles.value}>{item.totalHours}</Text>
            </View>

            {/* Assigned Members */}
            <Text style={styles.assignedTitle}>Assigned Members:</Text>

            {item.assignedMembers.length === 0 ? (
              <Text style={styles.noMember}>No members assigned</Text>
            ) : (
              item.assignedMembers.map((m, index) => (
                <View key={index} style={{ marginLeft: 10, marginTop: 6 }}>
                  
                  {/* Member Name */}
                  <Text style={styles.memberItem}>• {m.fullName} </Text>

                  {/* Workout Name */}
                  <Text style={styles.subItem}>
                    Workout: <Text style={styles.bold}>{m.workoutName}</Text>
                  </Text>

                  {/* Trained By */}
                  <Text style={styles.subItem}>
                    Trained by: <Text style={styles.bold}>{getTrainerName(m.trainerEmail)}</Text>
                  </Text>

                </View>
              ))
            )}

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  email: {
    color: "#94a3b8",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    color: "#38bdf8",
    fontWeight: "600",
  },
  value: {
    color: "white",
  },
  assignedTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#facc15"
  },
  noMember: {
    color: "#94a3b8",
    marginTop: 5,
  },
  memberItem: {
    color: "white",
    fontSize: 15,
    marginBottom: 2,
  },
  subItem: {
    color: "#94a3b8",
    marginLeft: 15,
    marginTop: 2,
  },
  bold: {
    color: "white",
    fontWeight: "600",
  }
});
