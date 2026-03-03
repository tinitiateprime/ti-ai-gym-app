import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

/* Locale */
LocaleConfig.locales["en"] = {
  monthNames: [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ],
  monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
};
LocaleConfig.defaultLocale = "en";

export default function MemberCalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={26} color="#e5e7eb" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={38} color="#38bdf8" />
        <Text style={styles.headerTitle}>My Calendar</Text>
        <Text style={styles.headerSub}>
          Plan workouts & track schedules
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Calendar */}
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#38bdf8",
              selectedTextColor: "#020617",
            },
          }}
          style={styles.calendar}
          theme={{
            backgroundColor: "#0f172a",
            calendarBackground: "#0f172a",
            textSectionTitleColor: "#94a3b8",
            todayTextColor: "#38bdf8",
            dayTextColor: "#e5e7eb",
            textDisabledColor: "#475569",
            monthTextColor: "#f8fafc",
            arrowColor: "#38bdf8",
            indicatorColor: "#38bdf8",
            textDayFontWeight: "600",
            textMonthFontWeight: "800",
            textDayHeaderFontWeight: "600",
            textDayFontSize: 15,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 13,
          }}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          {selectedDate ? (
            <>
              <Ionicons
                name="checkmark-circle-outline"
                size={26}
                color="#22c55e"
              />
              <Text style={styles.infoTitle}>Selected Date</Text>
              <Text style={styles.infoDate}>{selectedDate}</Text>

              <TouchableOpacity style={styles.addButton}>
                <Ionicons
                  name="add-circle-outline"
                  size={22}
                  color="#020617"
                />
                <Text style={styles.addText}>Add Workout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Ionicons
                name="information-circle-outline"
                size={26}
                color="#38bdf8"
              />
              <Text style={styles.infoHint}>
                Select a date to view or add workouts
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },

  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f8fafc",
    marginTop: 8,
  },

  headerSub: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },

  container: {
    padding: 16,
    paddingBottom: 80,
  },

  calendar: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 24,
  },

  infoCard: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  infoTitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 8,
  },

  infoDate: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 10,
  },

  infoHint: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#38bdf8",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 14,
    gap: 8,
  },

  addText: {
    color: "#020617",
    fontWeight: "800",
    fontSize: 15,
  },
});
