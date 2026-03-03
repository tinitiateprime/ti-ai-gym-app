import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberNotificationsScreen({ navigation }) {
  const [notifications] = useState([
    {
      id: 1,
      title: "Workout Reminder",
      description: "Don't forget your 7 AM session!",
      icon: "barbell-outline",
    },
    {
      id: 2,
      title: "Trainer Message",
      description: "Trainer John sent you a message.",
      icon: "chatbubble-ellipses-outline",
    },
    {
      id: 3,
      title: "Subscription Update",
      description: "Your subscription will renew on 25 Dec.",
      icon: "ribbon-outline",
    },
  ]);

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
        <Ionicons
          name="notifications-outline"
          size={38}
          color="#38bdf8"
        />
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSub}>
          Alerts, reminders & important updates
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            {/* Icon */}
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={22} color="#38bdf8" />
            </View>

            {/* Text */}
            <View style={styles.textBox}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDesc}>
                {item.description}
              </Text>
            </View>
          </View>
        ))}
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

  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  textBox: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 4,
  },

  notificationDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 18,
  },
});
