import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

// Optional: set calendar locale
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
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MemberHome")}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Calendar</Text>
        <Text style={styles.headerSub}>Track your workouts & schedules</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Calendar */}
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#4e9efc" },
          }}
          theme={{
            backgroundColor: "#f8fafc",
            calendarBackground: "#fff",
            textSectionTitleColor: "#020617",
            todayTextColor: "#4e9efc",
            dayTextColor: "#020617",
            textDisabledColor: "#d9e1e8",
            monthTextColor: "#020617",
            arrowColor: "#4e9efc",
            indicatorColor: "#4e9efc",
            textDayFontWeight: "600",
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "600",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />

        {/* Selected date info */}
        {selectedDate ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Selected Date:</Text>
            <Text style={styles.infoDate}>{selectedDate}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle-outline" size={22} color="#fff" />
              <Text style={styles.addText}>Add Workout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Select a date to view workouts</Text>
          </View>
        )}
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

  calendar: {
    borderRadius: 16,
    elevation: 3,
  },

  infoBox: {
    marginTop: 24,
    backgroundColor: "#4e9efc",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  infoText: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 6 },
  infoDate: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 12 },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
});
