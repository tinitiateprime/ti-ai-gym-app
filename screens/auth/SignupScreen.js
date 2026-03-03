// screens/auth/SignupScreen.js
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

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

export default function SignupScreen({ navigation, route }) {
  const roleKey = route?.params?.roleKey;
  const roleLabel = route?.params?.roleLabel;

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roleKey) navigation.replace("SelectRole");
  }, [roleKey, navigation]);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignup = async () => {
    const fullNameValue = fullName.trim();
    const mobileValue = mobile.trim();
    const emailValue = email.trim().toLowerCase();

    if (!roleKey) {
      Alert.alert("Error", "Please select a role first");
      return;
    }

    if (!fullNameValue || !mobileValue || !emailValue || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (!isValidEmail(emailValue)) {
      Alert.alert("Error", "Invalid email");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password min 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const resp = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullNameValue,
          mobile: mobileValue,
          email: emailValue,
          password,
          roleKey,
        }),
      });

      const data = await resp.json().catch(() => ({}));
      setLoading(false);

      if (!resp.ok || !data.ok) {
        Alert.alert("Signup Failed", data.error || "Unknown error");
        return;
      }

      const homeRoute = ROLE_HOME[roleKey] || "HomeScreen";

      // Keep your existing requirement: after signup -> payment first
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "CustomerPayment",
            params: {
              roleId: roleKey,
              roleLabel: ROLE_LABELS[roleKey] || roleLabel || roleKey,
              homeRoute,
              fullName: fullNameValue,
              email: emailValue,
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
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <BlurView intensity={80} tint="dark" style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.roleBox}>
          <Text style={styles.roleText}>
            {ROLE_LABELS[roleKey] || roleLabel || "Role"}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons name={showConfirm ? "eye-off" : "eye"} size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? "PLEASE WAIT..." : "SIGN UP"}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  back: { position: "absolute", top: 50, left: 20 },
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
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  roleBox: {
    backgroundColor: "#4e9efc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  roleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: { flex: 1, color: "#fff", padding: 14 },
  btn: { backgroundColor: "#4e9efc", padding: 15, borderRadius: 10 },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
});
