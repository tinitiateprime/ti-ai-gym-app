import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
        dotColor: "#60a5fa",
      };
    });

    marks[selectedDate] = {
      selected: true,
      selectedColor: "#2563eb",
      selectedTextColor: "#ffffff",
      marked: !!sessions[selectedDate],
      dotColor: "#bfdbfe",
    };

    return marks;
  }, [selectedDate]);

  const daySessions = sessions[selectedDate] || [];
  const totalDays = Object.keys(sessions).length;
  const totalSessions = Object.values(sessions).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />

      <FlatList
        data={daySessions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Top bar */}
            <View style={styles.topBar}>
              <View>
                <Text style={styles.pageLabel}>TRAINER SCHEDULE</Text>
                <Text style={styles.headerTitle}>Calendar Workspace</Text>
                <Text style={styles.headerSub}>
                  Premium scheduling dashboard for sessions
                </Text>
              </View>

              <TouchableOpacity activeOpacity={0.9} style={styles.topIconBtn}>
                <Ionicons name="options-outline" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Hero */}
            <LinearGradient
              colors={["#111827", "#0f172a", "#1e1b4b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.heroGlowOne} />
              <View style={styles.heroGlowTwo} />

              <View style={styles.heroBadge}>
                <Ionicons name="calendar-outline" size={14} color="#93c5fd" />
                <Text style={styles.heroBadgeText}>SMART SCHEDULER</Text>
              </View>

              <Text style={styles.heroTitle}>Manage your training sessions with style</Text>
              <Text style={styles.heroSubtitle}>
                Track appointments, monitor session load, and stay organized in a
                clean futuristic calendar view.
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{selectedDate}</Text>
                  <Text style={styles.statLabel}>Selected Date</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{daySessions.length}</Text>
                  <Text style={styles.statLabel}>Today Sessions</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{totalSessions}</Text>
                  <Text style={styles.statLabel}>All Sessions</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Quick actions */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSub}>Fast controls for your day</Text>
            </View>

            <View style={styles.quickRow}>
              <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
                <LinearGradient
                  colors={["#2563eb", "#3b82f6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="today-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Today</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
                <LinearGradient
                  colors={["#7c3aed", "#8b5cf6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="add-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Add Slot</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
                <LinearGradient
                  colors={["#0f766e", "#14b8a6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickBtn}
                >
                  <Ionicons name="analytics-outline" size={18} color="#fff" />
                  <Text style={styles.quickText}>Overview</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Calendar */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Calendar</Text>
              <Text style={styles.sectionSub}>
                {totalDays} scheduled day{totalDays !== 1 ? "s" : ""} in your planner
              </Text>
            </View>

            <View style={styles.calendarCard}>
              <Calendar
                current={selectedDate}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                enableSwipeMonths
                theme={{
                  calendarBackground: "transparent",
                  monthTextColor: "#f8fafc",
                  textMonthFontWeight: "800",
                  textMonthFontSize: 17,
                  dayTextColor: "#cbd5e1",
                  textDayFontWeight: "700",
                  textDayFontSize: 14,
                  todayTextColor: "#93c5fd",
                  selectedDayTextColor: "#ffffff",
                  arrowColor: "#93c5fd",
                  textDisabledColor: "#334155",
                  textSectionTitleColor: "#64748b",
                }}
                style={styles.calendarInner}
              />
            </View>

            {/* Sessions header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sessions</Text>
              <Text style={styles.sectionSub}>
                {selectedDate} • {daySessions.length} scheduled
              </Text>
            </View>
          </>
        }
        renderItem={({ item, index }) => {
          const accentColors =
            index % 3 === 0
              ? ["#2563eb", "#60a5fa"]
              : index % 3 === 1
              ? ["#7c3aed", "#a78bfa"]
              : ["#0891b2", "#22d3ee"];

          return (
            <TouchableOpacity activeOpacity={0.92} style={styles.sessionCard}>
              <View style={styles.cardOverlay} />

              <LinearGradient
                colors={accentColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.accentBar}
              />

              <View style={styles.timeChip}>
                <Ionicons name="time-outline" size={14} color="#93c5fd" />
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.client}>{item.client}</Text>
                <Text style={styles.type}>{item.type}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaPill}>
                    <Ionicons name="fitness-outline" size={13} color="#cbd5e1" />
                    <Text style={styles.metaText}>Session</Text>
                  </View>

                  <View style={styles.metaPill}>
                    <Ionicons name="sparkles-outline" size={13} color="#cbd5e1" />
                    <Text style={styles.metaText}>Confirmed</Text>
                  </View>
                </View>
              </View>

              <View style={styles.chevronWrap}>
                <Ionicons name="arrow-forward" size={16} color="#cbd5e1" />
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-clear-outline" size={30} color="#64748b" />
            <Text style={styles.emptyTitle}>No sessions scheduled</Text>
            <Text style={styles.emptyText}>
              This date is currently free. Add a new training slot to keep your
              day productive.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Trainer App</Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.footerLink}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.footerLink}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.footerLink}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050816",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: "#050816",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  pageLabel: {
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.3,
  },

  headerSub: {
    marginTop: 6,
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "600",
    lineHeight: 18,
  },

  topIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroCard: {
    borderRadius: 30,
    padding: 22,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  heroGlowOne: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(59,130,246,0.16)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -30,
    left: -10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(139,92,246,0.14)",
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 16,
  },

  heroBadgeText: {
    color: "#dbeafe",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    marginBottom: 8,
    maxWidth: "90%",
  },

  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 18,
    maxWidth: "94%",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  statValue: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 4,
    textAlign: "center",
  },

  statLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  sectionSub: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  quickWrap: {
    flex: 1,
  },

  quickBtn: {
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  quickText: {
    color: "#ffffff",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
  },

  calendarCard: {
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 26,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  calendarInner: {
    borderRadius: 20,
  },

  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  cardOverlay: {
    position: "absolute",
    right: -18,
    top: -18,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  accentBar: {
    width: 5,
    height: 72,
    borderRadius: 999,
  },

  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  timeText: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "800",
  },

  info: {
    flex: 1,
  },

  client: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  type: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  metaRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
  },

  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  metaText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "700",
  },

  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 34,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  emptyTitle: {
    marginTop: 12,
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "800",
  },

  emptyText: {
    marginTop: 8,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 20,
  },

  footer: {
    marginTop: 14,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  footerText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },

  footerLink: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
  },
});