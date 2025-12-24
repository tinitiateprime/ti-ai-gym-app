import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";

export default function TrainerCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState("2025-01-10");

  const sessions = {
    "2025-01-10": [
      { id: "1", time: "06:00 AM", client: "Amit", type: "Weight Training" },
      { id: "2", time: "07:30 AM", client: "Ravi", type: "Cardio" },
    ],
    "2025-01-12": [
      { id: "3", time: "06:30 PM", client: "Sneha", type: "HIIT" },
    ],
  };

  const markedDates = {
    ...Object.keys(sessions).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: "#16a34a" };
      return acc;
    }, {}),
    [selectedDate]: {
      selected: true,
      selectedColor: "#020617",
    },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Training Schedule</Text>
      </View>

      {/* Calendar */}
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          backgroundColor: "#f8fafc",
          calendarBackground: "#ffffff",
          todayTextColor: "#dc2626",
          selectedDayTextColor: "#ffffff",
          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          arrowColor: "#020617",
        }}
        style={styles.calendar}
      />

      {/* Sessions */}
      <View style={styles.sessionContainer}>
        <Text style={styles.sectionTitle}>
          Sessions on {selectedDate}
        </Text>

        {sessions[selectedDate]?.length ? (
          <FlatList
            data={sessions[selectedDate]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.sessionCard}>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.client}>{item.client}</Text>
                  <Text style={styles.type}>{item.type}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noSession}>No sessions scheduled</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },

  header: {
    height: 60,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  calendar: {
    margin: 12,
    borderRadius: 12,
    elevation: 3,
  },

  sessionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#020617",
  },

  sessionCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },

  timeBox: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 12,
  },

  timeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16a34a",
  },

  sessionInfo: { flex: 1 },

  client: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
  },

  type: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },

  noSession: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 20,
  },
});
