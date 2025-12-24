import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberNotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Workout Reminder", description: "Don't forget your 7 AM session!" },
    { id: 2, title: "New Trainer Message", description: "Trainer John sent you a message." },
    { id: 3, title: "Subscription Update", description: "Your subscription will renew on 25 Dec." },
  ]);

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
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSub}>Stay updated with alerts & messages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDesc}>{item.description}</Text>
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

  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 4,
  },
  notificationDesc: {
    fontSize: 14,
    color: "#64748b",
  },
});
