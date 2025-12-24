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

  useEffect(() => {
    if (!roleKey) navigation.replace("SelectRole");
  }, [roleKey]);

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const handleSignup = async () => {
  if (!roleKey) return Alert.alert("Error", "Please select a role first");
  if (!fullName || !mobile || !email || !password || !confirmPassword)
    return Alert.alert("Error", "All fields are required");
  if (!isValidEmail(email)) return Alert.alert("Error", "Invalid email");
  if (password.length < 6) return Alert.alert("Error", "Password min 6 characters");
  if (password !== confirmPassword) return Alert.alert("Error", "Passwords do not match");

  const API_BASE = Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://localhost:3001";

  try {
    const resp = await fetch(`${API_BASE}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, mobile, email: email.trim(), password, roleKey }),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok || !data.ok) return Alert.alert("Signup Failed", data.error || "Unknown error");

    // ✅ Navigate to user's home screen without resetting the stack
    const target = ROLE_HOME[roleKey];
    // reset navigation stack so home becomes root
navigation.reset({
  index: 0,
  routes: [
    {
      name: target,
      params: {
        email: email.trim().toLowerCase(),
        fullName,
        role: roleKey,
      },
    },
  ],
});


  } catch (e) {
    Alert.alert("Network Error", "Cannot connect to backend. Is server running?");
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
          <Text style={styles.roleText}>{ROLE_LABELS[roleKey] || roleLabel || "Role"}</Text>
        </View>

        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#ccc" value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Mobile" placeholderTextColor="#ccc" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <View style={styles.passwordBox}>
          <TextInput style={styles.passwordInput} placeholder="Password" placeholderTextColor="#ccc" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordBox}>
          <TextInput style={styles.passwordInput} placeholder="Confirm Password" placeholderTextColor="#ccc" secureTextEntry={!showConfirm} value={confirmPassword} onChangeText={setConfirmPassword} />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons name={showConfirm ? "eye-off" : "eye"} size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  back: { position: "absolute", top: 50, left: 20 },
  card: { borderRadius: 20, padding: 25, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  title: { color: "#fff", fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  roleBox: { backgroundColor: "#4e9efc", padding: 12, borderRadius: 10, marginBottom: 16 },
  roleText: { color: "#fff", fontSize: 16, fontWeight: "800", textAlign: "center" },
  input: { backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", padding: 14, borderRadius: 10, marginBottom: 15 },
  passwordBox: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, marginBottom: 15, paddingHorizontal: 10 },
  passwordInput: { flex: 1, color: "#fff", padding: 14 },
  btn: { backgroundColor: "#4e9efc", padding: 15, borderRadius: 10 },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
});
