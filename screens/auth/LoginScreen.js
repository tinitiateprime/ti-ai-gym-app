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
  ActivityIndicator,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
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
    const passwordValue = String(password);

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
    <LinearGradient
      colors={["#030712", "#071226", "#0B1D3A", "#050816"]}
      start={{ x: 0.05, y: 0.02 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View pointerEvents="none" style={styles.glowOne} />
      <View pointerEvents="none" style={styles.glowTwo} />
      <View pointerEvents="none" style={styles.glowThree} />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            nestedScrollEnabled
            scrollEnabled
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.85}
            >
              <Ionicons name="chevron-back" size={22} color="#E5F0FF" />
            </TouchableOpacity>

            <View style={styles.headerSection}>
              <View style={styles.brandRow}>
                <View style={styles.brandDot} />
                <Text style={styles.brand}>GYMFLOW</Text>
              </View>

              <Text style={styles.welcomeMini}>WELCOME BACK</Text>

              <Text style={styles.mainHeading}>Train smart.</Text>
              <Text style={styles.mainHeading}>Move strong.</Text>
              {/* <Text style={styles.mainHeadingAccent}>Stay unstoppable.</Text> */}

              <Text style={styles.tagline}>
                Access your fitness journey with a smooth, premium experience.
              </Text>
            </View>

            <View style={styles.cardOuter}>
              <LinearGradient
                colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.04)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.cardTopRow}>
                  <View>
                    <Text style={styles.cardTitle}>Login</Text>
                    <Text style={styles.cardSubtitle}>
                      Enter your credentials to continue
                    </Text>
                  </View>

                  <View style={styles.iconBadge}>
                    <Ionicons name="flash-outline" size={18} color="#8FD3FF" />
                  </View>
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Email address</Text>
                  <View style={styles.inputWrap}>
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color="#8BA3C7"
                      style={styles.leftIcon}
                    />
                    <TextInput
                      placeholder="Enter your email"
                      placeholderTextColor="#7C8DA8"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrap}>
                    <Feather
                      name="lock"
                      size={18}
                      color="#8BA3C7"
                      style={styles.leftIcon}
                    />
                    <TextInput
                      placeholder="Enter your password"
                      placeholderTextColor="#7C8DA8"
                      style={styles.passwordInput}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.8}
                      style={styles.eyeBtn}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={18}
                        color="#B8C6DC"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    loading && styles.primaryButtonDisabled,
                  ]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={["#67E8F9", "#4F9CF9", "#6D5DFB"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryGradient}
                  >
                    {loading ? (
                      <View style={styles.loadingRow}>
                        <ActivityIndicator size="small" color="#08111F" />
                        <Text style={styles.primaryText}>SIGNING YOU IN...</Text>
                      </View>
                    ) : (
                      <View style={styles.loadingRow}>
                        <Text style={styles.primaryText}>ENTER THE GYM</Text>
                        <Ionicons
                          name="arrow-forward"
                          size={18}
                          color="#08111F"
                        />
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SelectRole")}
                  activeOpacity={0.8}
                  style={styles.footerLinkWrap}
                >
                  <Text style={styles.signupText}>
                    New athlete?{" "}
                    <Text style={styles.signupBold}>Create your account</Text>
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },

  safe: {
    flex: 1,
  },

  keyboardWrap: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 56,
  },

  glowOne: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(59,130,246,0.18)",
  },

  glowTwo: {
    position: "absolute",
    top: 180,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(103,232,249,0.12)",
  },

  glowThree: {
    position: "absolute",
    bottom: 80,
    right: 10,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(139,92,246,0.10)",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: 24,
    alignSelf: "flex-start",
  },

  headerSection: {
    paddingHorizontal: 4,
    marginBottom: 22,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: "#67E8F9",
    marginRight: 10,
    shadowColor: "#67E8F9",
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },

  brand: {
    color: "#8FD3FF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 3,
  },

  welcomeMini: {
    color: "#7B93B5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2.5,
    marginBottom: 16,
  },

  mainHeading: {
    color: "#F8FBFF",
    fontSize: 38,
    fontWeight: "300",
    lineHeight: 44,
    letterSpacing: -0.4,
  },

  mainHeadingAccent: {
    color: "#AEE8FF",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 46,
    letterSpacing: -0.4,
  },

  tagline: {
    marginTop: 16,
    color: "#90A4C2",
    fontSize: 15,
    lineHeight: 23,
    maxWidth: "88%",
  },

  cardOuter: {
    marginTop: 8,
    marginBottom: 12,
  },

  card: {
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(10,16,30,0.82)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.24,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  cardSubtitle: {
    color: "#89A0BE",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(103,232,249,0.10)",
    borderWidth: 1,
    borderColor: "rgba(103,232,249,0.18)",
  },

  inputBlock: {
    marginBottom: 16,
  },

  label: {
    color: "#C7D5E8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  inputWrap: {
    minHeight: 58,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: "#F8FBFF",
    fontSize: 15,
    paddingVertical: 14,
  },

  passwordInput: {
    flex: 1,
    color: "#F8FBFF",
    fontSize: 15,
    paddingVertical: 14,
  },

  eyeBtn: {
    paddingLeft: 10,
    paddingVertical: 6,
  },

  primaryButton: {
    marginTop: 10,
    borderRadius: 18,
    overflow: "hidden",
  },

  primaryButtonDisabled: {
    opacity: 0.8,
  },

  primaryGradient: {
    minHeight: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  primaryText: {
    color: "#08111F",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  footerLinkWrap: {
    marginTop: 20,
    paddingBottom: 4,
  },

  signupText: {
    textAlign: "center",
    color: "#A4B4CA",
    fontSize: 14,
    lineHeight: 20,
  },

  signupBold: {
    color: "#8FD3FF",
    fontWeight: "800",
  },
});