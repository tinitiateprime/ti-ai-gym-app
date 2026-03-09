// screens/auth/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getUserProfile } from "../../api/storage/userStorage";

const ROLE_HOME = {
  MEMBER: "MemberHome",
  TRAINER: "TrainerHomeScreen",
  SELLER: "MarketplaceHome",
  OWNER: "OwnerDashboard",
};

const ROLE_LABELS = {
  MEMBER: "Member",
  TRAINER: "Trainer",
  SELLER: "Market Seller",
  OWNER: "Gym Owner",
};

const API_BASE =
  Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://localhost:3001";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailValue = email.trim().toLowerCase();
    const passwordValue = String(password); // ✅ ensure string

    if (!emailValue || !passwordValue) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const resp = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      const data = await resp.json().catch(() => ({}));
      setLoading(false);

      if (!resp.ok || !data.ok) {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
        return;
      }

      const roleKey = data.user?.roleKey;
      const target = ROLE_HOME[roleKey];

      if (!target) {
        Alert.alert("Error", `No screen mapped for role: ${roleKey}`);
        return;
      }

      const emailKey = (data.user?.email || "").toLowerCase();

      const profile = await getUserProfile(emailKey);
      const isPaid = Boolean(profile?.isPaid);

      if (!isPaid) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "CustomerPayment",
              params: {
                roleId: roleKey,
                roleLabel: ROLE_LABELS[roleKey] || roleKey,
                homeRoute: target,
                fullName: data.user?.fullName,
                email: emailKey,
              },
            },
          ],
        });
        return;
      }

      navigation.reset({
        index: 0,
        routes: [
          {
            name: target,
            params: {
              email: emailKey,
              fullName: data.user?.fullName,
              role: roleKey,
            },
          },
        ],
      });
    } catch (e) {
      setLoading(false);
      Alert.alert(
        "Network Error",
        "Cannot connect to backend. Make sure the server is running on port 3001."
      );
    }
  };

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <View style={styles.topSection}>
        <Text style={styles.brand}>GYMFLOW</Text>
        <Text style={styles.mainHeading}>DISCIPLINE</Text>
        <Text style={styles.mainHeading}>BUILDS</Text>
        <Text style={styles.mainHeadingBold}>CHAMPIONS</Text>
        <Text style={styles.tagline}>Log in. Show up. Never quit.</Text>
      </View>

      <View style={styles.bottomSection}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryText}>
            {loading ? "PLEASE WAIT..." : "ENTER THE GYM"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SelectRole")}>
          <Text style={styles.signupText}>
            New athlete? <Text style={styles.signupBold}>Join the grind</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22 },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 10 },
  topSection: { flex: 1.3, justifyContent: "flex-end", paddingBottom: 40 },
  brand: { color: "#4e9efc", fontWeight: "800", letterSpacing: 2, marginBottom: 20 },
  mainHeading: { color: "#fff", fontSize: 40, fontWeight: "300", lineHeight: 44 },
  mainHeadingBold: { color: "#fff", fontSize: 44, fontWeight: "900", lineHeight: 48 },
  tagline: { color: "#aaa", marginTop: 14, fontSize: 15 },
  bottomSection: { flex: 1, paddingTop: 30 },
  input: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    color: "#fff",
    fontSize: 16,
    marginBottom: 24,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    marginBottom: 36,
  },
  passwordInput: { flex: 1, height: 52, color: "#fff", fontSize: 16 },
  primaryButton: {
    height: 58,
    borderRadius: 16,
    backgroundColor: "#4e9efc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "900", letterSpacing: 1.2 },
  signupText: { textAlign: "center", color: "#bbb", fontSize: 14 },
  signupBold: { color: "#4e9efc", fontWeight: "700" },
});

