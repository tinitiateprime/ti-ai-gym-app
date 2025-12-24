
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TRAINERS = [
  {
    id: "1",
    name: "Rahul Verma",
    speciality: "Strength & Conditioning",
    experience: "5 Years",
    status: "Active",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
  {
    id: "2",
    name: "Anjali Sharma",
    speciality: "Yoga & Flexibility",
    experience: "3 Years",
    status: "Active",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
  },
  {
    id: "3",
    name: "Kiran Reddy",
    speciality: "CrossFit Coach",
    experience: "4 Years",
    status: "Inactive",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
  },
];

export default function OwnerTrainerPage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Trainers</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddTrainer")}
        >
          <Ionicons name="add" size={22} color="#fff" />
          <Text style={styles.addText}>Add Trainer</Text>
        </TouchableOpacity>
      </View>

      {/* Trainer List */}
      <FlatList
        data={TRAINERS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.speciality}</Text>
              <Text style={styles.meta}>Experience: {item.experience}</Text>
            </View>

            <View style={styles.right}>
              <Text
                style={[
                  styles.status,
                  item.status === "Active" ? styles.active : styles.inactive,
                ]}
              >
                {item.status}
              </Text>

              <View style={styles.actions}>
                <Ionicons name="call" size={18} color="#4e9efc" />
                <Ionicons name="chatbubble" size={18} color="#4e9efc" />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#4e9efc",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  addText: {
    color: "#fff",
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
  },

  name: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "700",
  },

  meta: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
  },

  status: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
  },

  active: {
    backgroundColor: "rgba(34,197,94,0.15)",
    color: "#22c55e",
  },

  inactive: {
    backgroundColor: "rgba(239,68,68,0.15)",
    color: "#ef4444",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
