import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const pad2 = (n) => String(n).padStart(2, "0");
const toISODate = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const monthName = (d) =>
  d.toLocaleString("en-US", { month: "long", year: "numeric" });

const weekdayShort = (d) =>
  d.toLocaleString("en-US", { weekday: "short" });

const prettyDate = (d) =>
  d.toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric" });

export default function OwnerCalendar() {
  // default to today (better than a hard-coded date)
  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));

  const EVENTS = [
    { id: "1", date: "2025-01-10", title: "Trainer Meeting", time: "10:00 AM", type: "meeting" },
    { id: "2", date: "2025-01-10", title: "New Member Joining", time: "4:00 PM", type: "member" },
    { id: "3", date: "2025-01-11", title: "Equipment Service", time: "6:00 PM", type: "maintenance" },
  ];

  const selectedDateObj = useMemo(() => new Date(`${selectedDate}T00:00:00`), [selectedDate]);

  const weekDays = useMemo(() => {
    // build a 7-day strip centered on selected date (selected date is middle)
    const base = new Date(selectedDateObj);
    const start = new Date(base);
    start.setDate(base.getDate() - 3);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [selectedDateObj]);

  const todayEvents = useMemo(
    () => EVENTS.filter((e) => e.date === selectedDate),
    [selectedDate]
  );

  const getAccent = (type) => {
    if (type === "meeting") return "#60a5fa";
    if (type === "member") return "#22c55e";
    if (type === "maintenance") return "#f59e0b";
    return "#a78bfa";
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Calendar</Text>
            <Text style={styles.subTitle}>
              {monthName(selectedDateObj)} • {prettyDate(selectedDateObj)}
            </Text>
          </View>

          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.85}>
            <Ionicons name="add" size={18} color="#e5e7eb" />
            <Text style={styles.headerBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Selected Date Card */}
        <View style={styles.dateCard}>
          <View style={styles.dateLeft}>
            <View style={styles.calendarIcon}>
              <Ionicons name="calendar-outline" size={18} color="#93c5fd" />
            </View>
            <View>
              <Text style={styles.dateLabel}>Selected Day</Text>
              <Text style={styles.dateText}>{selectedDate}</Text>
            </View>
          </View>

          <View style={styles.badge}>
            <Ionicons name="time-outline" size={16} color="#93c5fd" />
            <Text style={styles.badgeText}>{todayEvents.length} events</Text>
          </View>
        </View>

        {/* 7-day strip */}
        <View style={styles.weekStrip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.weekRow}>
              {weekDays.map((d) => {
                const iso = toISODate(d);
                const isActive = iso === selectedDate;

                return (
                  <TouchableOpacity
                    key={iso}
                    style={[styles.dayPill, isActive && styles.dayPillActive]}
                    onPress={() => setSelectedDate(iso)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.dayName, isActive && styles.dayNameActive]}>
                      {weekdayShort(d)}
                    </Text>
                    <Text style={[styles.dayNum, isActive && styles.dayNumActive]}>
                      {d.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Scheduled Events</Text>
          <Text style={styles.sectionMeta}>{todayEvents.length} total</Text>
        </View>

        <FlatList
          data={todayEvents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 18 }}
          ListEmptyComponent={<Text style={styles.empty}>No events scheduled</Text>}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View
                style={[
                  styles.accentBar,
                  { backgroundColor: getAccent(item.type) },
                ]}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <View style={styles.eventMetaRow}>
                  <View style={styles.timeChip}>
                    <Ionicons name="time-outline" size={14} color="#93c5fd" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                  <Text style={styles.eventType}>
                    {item.type?.toUpperCase() || "EVENT"}
                  </Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },
  container: { flex: 1, backgroundColor: "#020617", padding: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: { fontSize: 22, fontWeight: "900", color: "#fff" },
  subTitle: { color: "#94a3b8", marginTop: 4, fontWeight: "700", fontSize: 12 },

  headerBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  headerBtnText: { color: "#e5e7eb", fontWeight: "900", fontSize: 12 },

  dateCard: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  calendarIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  dateLabel: { color: "#94a3b8", fontSize: 11, fontWeight: "800" },
  dateText: { color: "#e5e7eb", fontSize: 14, fontWeight: "900", marginTop: 3 },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  badgeText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },

  weekStrip: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 14,
  },
  weekRow: { flexDirection: "row", gap: 10 },

  dayPill: {
    width: 66,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#0b1224",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  dayPillActive: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8",
  },
  dayName: { color: "#94a3b8", fontSize: 11, fontWeight: "900" },
  dayNameActive: { color: "#e5e7eb" },
  dayNum: { color: "#e5e7eb", fontSize: 16, fontWeight: "900", marginTop: 4 },
  dayNumActive: { color: "#fff" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: { color: "#e5e7eb", fontSize: 15, fontWeight: "900" },
  sectionMeta: { color: "#64748b", fontSize: 12, fontWeight: "800" },

  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 10,
  },
  accentBar: {
    width: 4,
    height: 44,
    borderRadius: 8,
  },
  eventTitle: { color: "#fff", fontSize: 14, fontWeight: "900" },
  eventMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
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
  timeText: { color: "#e5e7eb", fontSize: 12, fontWeight: "900" },
  eventType: { color: "#94a3b8", fontSize: 11, fontWeight: "900" },

  empty: { color: "#64748b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
