import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// ✅ FIX: correct path
import { saveUserProfile } from "../../api/storage/userStorage";

export default function CustomerPaymentScreen({ navigation, route }) {
  const { roleId, roleLabel, homeRoute, fullName, email } = route.params || {};

  const handlePayNow = async () => {
    const emailKey = (email || "").toLowerCase();
    const target = homeRoute || "HomeScreen";
    const rootRoute = "HomeScreen";

    const now = new Date();
    const membershipStart = now.toISOString().slice(0, 10);

    const end = new Date(now);
    end.setDate(end.getDate() + 180);
    const membershipEnd = end.toISOString().slice(0, 10);

    if (emailKey) {
      await saveUserProfile(emailKey, {
        email: emailKey,
        roleId,
        roleLabel,
        homeRoute: target,
        fullName,
        isPaid: true,
        membershipStart,
        membershipEnd,
      });
    }

    if (target === rootRoute) {
      navigation.reset({ index: 0, routes: [{ name: rootRoute }] });
    } else {
      navigation.reset({
        index: 1,
        routes: [
          { name: rootRoute },
          { name: target, params: { roleId, roleLabel, fullName, email: emailKey } },
        ],
      });
    }
  };

  const memberName = fullName || "Premium Member";
  const memberEmail = email || "guest@member.com";

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />

      <View style={styles.container}>
        {/* Top header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.pageLabel}>MEMBERSHIP PAYMENT</Text>
            <Text style={styles.headerTitle}>Secure Checkout</Text>
            <Text style={styles.headerSub}>
              Premium access activation for your fitness membership
            </Text>
          </View>

          <View style={styles.topIconBtn}>
            <Ionicons name="card-outline" size={18} color="#ffffff" />
          </View>
        </View>

        {/* Hero card */}
        <LinearGradient
          colors={["#111827", "#0f172a", "#1e1b4b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.heroBadge}>
            <Ionicons name="shield-checkmark-outline" size={14} color="#93c5fd" />
            <Text style={styles.heroBadgeText}>PAYMENT PROTECTED</Text>
          </View>

          <Text style={styles.heroTitle}>Unlock your {roleLabel || "premium"} membership</Text>
          <Text style={styles.heroSubtitle}>
            Complete your payment to activate access and continue into your personalized
            dashboard experience.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>180 Days</Text>
              <Text style={styles.heroStatLabel}>Membership</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>Instant</Text>
              <Text style={styles.heroStatLabel}>Activation</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>Secure</Text>
              <Text style={styles.heroStatLabel}>Access</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Member card */}
        <View style={styles.glassCard}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="person-outline" size={18} color="#93c5fd" />
            </View>
            <Text style={styles.sectionTitle}>Member Details</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{memberName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{memberEmail}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Membership</Text>
            <Text style={styles.detailValue}>{roleLabel || "Standard Access"}</Text>
          </View>
        </View>

        {/* Benefits card */}
        <View style={styles.glassCard}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="sparkles-outline" size={18} color="#c4b5fd" />
            </View>
            <Text style={styles.sectionTitle}>What You Unlock</Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.benefitText}>Premium trainer access and membership activation</Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.benefitText}>180 days of uninterrupted membership access</Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.benefitText}>Seamless entry into your personalized home screen</Text>
          </View>
        </View>

        {/* Payment CTA */}
        <TouchableOpacity activeOpacity={0.92} onPress={handlePayNow}>
          <LinearGradient
            colors={["#2563eb", "#3b82f6", "#7c3aed"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.payBtn}
          >
            <Ionicons name="lock-closed-outline" size={18} color="#ffffff" />
            <Text style={styles.payBtnText}>Pay Now</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Logged in as: {fullName || email || "Guest"}
          </Text>
          <Text style={styles.footerSub}>
            Your membership will be activated immediately after payment.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050816",
  },

  container: {
    flex: 1,
    backgroundColor: "#050816",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  pageLabel: {
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 6,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 0.3,
  },

  headerSub: {
    marginTop: 6,
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "600",
    lineHeight: 18,
    maxWidth: 280,
  },

  topIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroCard: {
    borderRadius: 30,
    padding: 22,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  heroGlowOne: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(59,130,246,0.16)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -30,
    left: -10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(139,92,246,0.14)",
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 16,
  },

  heroBadgeText: {
    color: "#dbeafe",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    marginBottom: 8,
    maxWidth: "94%",
  },

  heroSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 18,
    maxWidth: "96%",
  },

  heroStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  heroStatCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  heroStatValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4,
    textAlign: "center",
  },

  heroStatLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  glassCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cardIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    marginRight: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#ffffff",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  detailLabel: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "700",
  },

  detailValue: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "800",
    maxWidth: "60%",
    textAlign: "right",
  },

  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },

  benefitText: {
    flex: 1,
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },

  payBtn: {
    marginTop: 6,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  payBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  footer: {
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  footerText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  footerSub: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
});

