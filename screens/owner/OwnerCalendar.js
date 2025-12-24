import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OwnerCalendar() {
  const [selectedDate, setSelectedDate] = useState("2025-01-10");

  const EVENTS = [
    { id: "1", date: "2025-01-10", title: "Trainer Meeting", time: "10:00 AM" },
    { id: "2", date: "2025-01-10", title: "New Member Joining", time: "4:00 PM" },
    { id: "3", date: "2025-01-11", title: "Equipment Service", time: "6:00 PM" },
  ];

  const todayEvents = EVENTS.filter(e => e.date === selectedDate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <Text style={styles.subTitle}>Today: {selectedDate}</Text>

      <TouchableOpacity style={styles.dateBox}>
        <Ionicons name="calendar" size={20} color="#4e9efc" />
        <Text style={styles.dateText}>{selectedDate}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Scheduled Events</Text>

      <FlatList
        data={todayEvents}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No events scheduled</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventTime}>{item.time}</Text>
            </View>
            <Ionicons name="time-outline" size={20} color="#94a3b8" />
          </View>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  subTitle: {
    color: "#94a3b8",
    marginBottom: 16,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  eventCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  eventTime: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
  empty: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 20,
  },
});
