import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

/**
 * Role selection first -> then go Signup with roleKey
 */
const ROLE_LABELS = {
  MEMBER: "Member",
  TRAINER: "Trainer",
  SELLER: "Market Seller",
  OWNER: "Gym Owner",
};

export default function SelectRoleScreen({ navigation }) {
  const [roleKey, setRoleKey] = useState(""); // MEMBER / TRAINER / SELLER / OWNER

  const handleContinue = () => {
    if (!roleKey) {
      Alert.alert("Select Role", "Please choose a role to continue");
      return;
    }

    navigation.navigate("Signup", {
      roleKey,
      roleLabel: ROLE_LABELS[roleKey],
    });
  };

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      style={styles.container}
    >
      <BlurView intensity={80} tint="dark" style={styles.card}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subTitle}>Select role to continue</Text>

        {/* MEMBER */}
        <TouchableOpacity
          style={[styles.roleBtn, roleKey === "MEMBER" && styles.active]}
          onPress={() => setRoleKey("MEMBER")}
        >
          <Ionicons name="person" size={22} color="#fff" />
          <Text style={styles.roleText}>Member</Text>
          {roleKey === "MEMBER" && (
            <Ionicons name="checkmark-circle" size={22} color="#4e9efc" />
          )}
        </TouchableOpacity>

        {/* TRAINER */}
        <TouchableOpacity
          style={[styles.roleBtn, roleKey === "TRAINER" && styles.active]}
          onPress={() => setRoleKey("TRAINER")}
        >
          <Ionicons name="school" size={22} color="#fff" />
          <Text style={styles.roleText}>Trainer</Text>
          {roleKey === "TRAINER" && (
            <Ionicons name="checkmark-circle" size={22} color="#4e9efc" />
          )}
        </TouchableOpacity>

        {/* SELLER */}
        <TouchableOpacity
          style={[styles.roleBtn, roleKey === "SELLER" && styles.active]}
          onPress={() => setRoleKey("SELLER")}
        >
          <Ionicons name="cart" size={22} color="#fff" />
          <Text style={styles.roleText}>Market Seller</Text>
          {roleKey === "SELLER" && (
            <Ionicons name="checkmark-circle" size={22} color="#4e9efc" />
          )}
        </TouchableOpacity>

        {/* OWNER ✅ */}
        <TouchableOpacity
          style={[styles.roleBtn, roleKey === "OWNER" && styles.active]}
          onPress={() => setRoleKey("OWNER")}
        >
          <Ionicons name="business" size={22} color="#fff" />
          <Text style={styles.roleText}>Gym Owner</Text>
          {roleKey === "OWNER" && (
            <Ionicons name="checkmark-circle" size={22} color="#4e9efc" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    borderRadius: 20,
    padding: 25,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  subTitle: {
    color: "#cbd5e1",
    textAlign: "center",
    marginVertical: 15,
  },
  roleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 15,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 12,
  },
  active: {
    borderWidth: 1,
    borderColor: "#4e9efc",
    backgroundColor: "rgba(78,158,252,0.15)",
  },
  roleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  continueBtn: {
    backgroundColor: "#4e9efc",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
});
