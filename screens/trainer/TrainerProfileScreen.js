import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TrainerPage() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Top Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.pageLabel}>TRAINER PROFILE</Text>
            <Text style={styles.headerTitle}>Premium Trainer Space</Text>
            <Text style={styles.headerSub}>
              Modern profile dashboard with luxury styling
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.topIconBtn}>
            <Ionicons name="create-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={["#111827", "#0f172a", "#1e1b4b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.heroBadge}>
            <Ionicons name="flash-outline" size={14} color="#93c5fd" />
            <Text style={styles.heroBadgeText}>ELITE TRAINER</Text>
          </View>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Rahul Verma</Text>
          <Text style={styles.role}>Certified Fitness Trainer</Text>

          <View style={styles.heroMiniRow}>
            <View style={styles.miniPill}>
              <Ionicons name="star" size={12} color="#facc15" />
              <Text style={styles.miniPillText}>Top Rated</Text>
            </View>
            <View style={styles.miniPill}>
              <Ionicons name="fitness-outline" size={12} color="#93c5fd" />
              <Text style={styles.miniPillText}>Pro Coach</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>120+</Text>
            <Text style={styles.statLabel}>Clients</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>Quick Actions</Text>
          <Text style={styles.sectionHeaderSub}>
            Modern shortcuts for trainer workflow
          </Text>
        </View>

        <View style={styles.quickRow}>
          <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
            <LinearGradient
              colors={["#2563eb", "#3b82f6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickBtn}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.quickText}>Edit</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
            <LinearGradient
              colors={["#7c3aed", "#8b5cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickBtn}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
              <Text style={styles.quickText}>Message</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.quickWrap}>
            <LinearGradient
              colors={["#0f766e", "#14b8a6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickBtn}
            >
              <Ionicons name="log-out-outline" size={18} color="#fff" />
              <Text style={styles.quickText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.glassCard}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="person-outline" size={18} color="#93c5fd" />
            </View>
            <Text style={styles.sectionTitle}>About</Text>
          </View>

          <Text style={styles.sectionText}>
            Experienced trainer focused on weight loss, muscle building, and
            functional fitness. Helping clients stay strong, disciplined, and
            consistent with modern coaching methods.
          </Text>
        </View>

        {/* Specializations */}
        <View style={styles.glassCard}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="barbell-outline" size={18} color="#c4b5fd" />
            </View>
            <Text style={styles.sectionTitle}>Specializations</Text>
          </View>

          <View style={styles.specialGrid}>
            <View style={styles.skillPill}>
              <Text style={styles.skillText}>Weight Training</Text>
            </View>
            <View style={styles.skillPill}>
              <Text style={styles.skillText}>Cardio & HIIT</Text>
            </View>
            <View style={styles.skillPill}>
              <Text style={styles.skillText}>Strength Conditioning</Text>
            </View>
            <View style={styles.skillPill}>
              <Text style={styles.skillText}>Diet Guidance</Text>
            </View>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.glassCard}>
          <View style={styles.cardTitleRow}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="sparkles-outline" size={18} color="#67e8f9" />
            </View>
            <Text style={styles.sectionTitle}>Highlights</Text>
          </View>

          <View style={styles.highlightItem}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.highlightText}>
              Personalized programs for every fitness goal
            </Text>
          </View>

          <View style={styles.highlightItem}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.highlightText}>
              Strong track record with client transformation journeys
            </Text>
          </View>

          <View style={styles.highlightItem}>
            <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
            <Text style={styles.highlightText}>
              Focus on discipline, form, and sustainable progress
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Trainer App</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.footerLink}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.footerLink}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.footerLink}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050816",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: "#050816",
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
    fontSize: 26,
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
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },

  heroGlowOne: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(59,130,246,0.14)",
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
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 18,
  },

  heroBadgeText: {
    color: "#dbeafe",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  avatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
    marginBottom: 14,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.18)",
  },

  name: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
  },

  role: {
    fontSize: 14,
    color: "#cbd5e1",
    fontWeight: "600",
    marginBottom: 14,
  },

  heroMiniRow: {
    flexDirection: "row",
    gap: 10,
  },

  miniPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  miniPillText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionHeaderTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },

  sectionHeaderSub: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  quickWrap: {
    flex: 1,
  },

  quickBtn: {
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  quickText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
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
    marginBottom: 12,
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

  sectionText: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 22,
    fontWeight: "500",
  },

  specialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  skillPill: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },

  skillText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "700",
  },

  highlightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },

  highlightText: {
    flex: 1,
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },

  footer: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  footerText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },

  footerLink: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "800",
  },
});