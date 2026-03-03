
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

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

  const markedDates = useMemo(() => {
    const marks = {};

    Object.keys(sessions).forEach((date) => {
      marks[date] = {
        marked: true,
        dotColor: "#3b82f6",
      };
    });

    marks[selectedDate] = {
      selected: true,
      selectedColor: "#3b82f6",
      selectedTextColor: "#fff",
      marked: !!sessions[selectedDate],
      dotColor: "#93c5fd",
    };

    return marks;
  }, [selectedDate]);

  const daySessions = sessions[selectedDate] || [];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="calendar-outline" size={18} color="#93c5fd" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Training Schedule</Text>
          <Text style={styles.headerSub}>
            {selectedDate} • {daySessions.length} sessions
          </Text>
        </View>
      </View>

      {/* Calendar */}
      <View style={styles.calendarCard}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          enableSwipeMonths
          theme={{
            calendarBackground: "#0f172a",
            monthTextColor: "#e5e7eb",
            textMonthFontWeight: "800",
            dayTextColor: "#cbd5e1",
            textDayFontWeight: "700",
            todayTextColor: "#93c5fd",
            selectedDayTextColor: "#ffffff",
            arrowColor: "#93c5fd",
            textDisabledColor: "#334155",
          }}
        />
      </View>

      {/* Sessions */}
      <View style={styles.sessionWrap}>
        <Text style={styles.sectionTitle}>Sessions</Text>

        {daySessions.length ? (
          <FlatList
            data={daySessions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.sessionCard}>
                <View style={styles.accentBar} />

                <View style={styles.timeChip}>
                  <Ionicons name="time-outline" size={14} color="#93c5fd" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>

                <View style={styles.info}>
                  <Text style={styles.client}>{item.client}</Text>
                  <Text style={styles.type}>{item.type}</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#475569" />
              </View>
            )}
          />
        ) : (
          <View style={styles.empty}>
            <Ionicons
              name="calendar-clear-outline"
              size={26}
              color="#64748b"
            />
            <Text style={styles.emptyText}>No sessions scheduled</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  headerSub: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  calendarCard: {
    margin: 14,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  sessionWrap: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#e5e7eb",
    marginBottom: 10,
  },

  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  accentBar: {
    width: 4,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#3b82f6",
  },

  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  timeText: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "900",
  },

  info: { flex: 1 },
  client: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
  type: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  empty: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    marginTop: 10,
    color: "#64748b",
    fontWeight: "700",
  },
});
