import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MemberHomeScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState("Home");

  const email = route?.params?.email || "";
  const fullName = route?.params?.fullName || "";
  const role = route?.params?.role || "MEMBER";

  useEffect(() => {
    const backAction = () => {
      navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const go = (screen, tabName) => {
    if (tabName) setActiveTab(tabName);
    navigation.navigate(screen, { email, fullName, role });
  };

  const dashboardItems = useMemo(
    () => [
      {
        title: "Profile",
        subtitle: "Personal details & account",
        icon: "person-circle-outline",
        screen: "MyProfile",
        tone: "blue",
      },
      {
        title: "Calendar",
        subtitle: "View upcoming sessions",
        icon: "calendar-clear-outline",
        screen: "MyCalendar",
        tone: "purple",
      },
      {
        title: "Subscription",
        subtitle: "Manage your current plan",
        icon: "diamond-outline",
        screen: "MySubscription",
        tone: "amber",
      },
      {
        title: "Payments",
        subtitle: "Billing and transactions",
        icon: "card-outline",
        screen: "MyPayment",
        tone: "teal",
      },
      {
        title: "Notifications",
        subtitle: "Latest alerts and updates",
        icon: "notifications-outline",
        screen: "MyNotifications",
        tone: "red",
      },
      {
        title: "Workouts",
        subtitle: "Your training programs",
        icon: "barbell-outline",
        screen: "MyWorkoutTracker",
        tone: "blue",
      },
      {
        title: "Exercise Logger",
        subtitle: "Track sets, reps and time",
        icon: "timer-outline",
        screen: "ExerciseLogger",
        tone: "purple",
      },
      {
        title: "Reports",
        subtitle: "Check performance stats",
        icon: "stats-chart-outline",
        screen: "ExerciseReports",
        tone: "teal",
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroGlowOne} />
          <View style={styles.heroGlowTwo} />

          <View style={styles.heroTopRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="sparkles-outline" size={14} color="#7dd3fc" />
              <Text style={styles.heroBadgeText}>Member Space</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.heroActionBtn}
              onPress={() => go("MyProfile", "Profile")}
            >
              <Ionicons name="person-outline" size={18} color="#08111d" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Member Dashboard</Text>
          <Text style={styles.subtitle}>
            {fullName
              ? `Welcome back, ${fullName}`
              : "Train smarter, track faster, stay consistent."}
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>8</Text>
              <Text style={styles.heroStatLabel}>Modules</Text>
            </View>

            <View style={styles.heroDivider} />

            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>Live</Text>
              <Text style={styles.heroStatLabel}>Progress</Text>
            </View>

            <View style={styles.heroDivider} />

            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>Pro</Text>
              <Text style={styles.heroStatLabel}>Fitness Flow</Text>
            </View>
          </View>

          <View style={styles.heroQuickRow}>
            <TouchableOpacity
              activeOpacity={0.92}
              style={styles.heroQuickPrimary}
              onPress={() => go("ExerciseLogger", "Log")}
            >
              <View style={styles.heroQuickPrimaryIcon}>
                <Ionicons name="play-circle-outline" size={18} color="#08111d" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroQuickPrimaryTitle}>Start Logging</Text>
                <Text style={styles.heroQuickPrimarySub}>
                  Open the exercise logger quickly
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.92}
              style={styles.heroQuickSecondary}
              onPress={() => go("ExerciseReports", "Reports")}
            >
              <Ionicons name="analytics-outline" size={18} color="#93c5fd" />
              <Text style={styles.heroQuickSecondaryText}>Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <Text style={styles.sectionSub}>Everything you need in one place</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.sectionMiniBtn}
            onPress={() => go("ExerciseLogger", "Log")}
          >
            <Ionicons name="flash-outline" size={16} color="#7dd3fc" />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              tone={item.tone}
              onPress={() => go(item.screen)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrap}>
        <View style={styles.bottomBar}>
          <Tab
            icon="home"
            outlineIcon="home-outline"
            label="Home"
            active={activeTab === "Home"}
            onPress={() => setActiveTab("Home")}
          />
          <Tab
            icon="timer"
            outlineIcon="timer-outline"
            label="Log"
            active={activeTab === "Log"}
            onPress={() => go("ExerciseLogger", "Log")}
          />
          <Tab
            icon="stats-chart"
            outlineIcon="stats-chart-outline"
            label="Reports"
            active={activeTab === "Reports"}
            onPress={() => go("ExerciseReports", "Reports")}
          />
          <Tab
            icon="person"
            outlineIcon="person-outline"
            label="Profile"
            active={activeTab === "Profile"}
            onPress={() => go("MyProfile", "Profile")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function DashboardCard({ title, subtitle, icon, onPress, tone = "blue" }) {
  const toneMap = {
    blue: {
      borderColor: "rgba(59,130,246,0.22)",
      iconBg: "rgba(59,130,246,0.12)",
      iconColor: "#93c5fd",
      dot: "#60a5fa",
    },
    purple: {
      borderColor: "rgba(168,85,247,0.22)",
      iconBg: "rgba(168,85,247,0.12)",
      iconColor: "#c4b5fd",
      dot: "#a78bfa",
    },
    teal: {
      borderColor: "rgba(20,184,166,0.22)",
      iconBg: "rgba(20,184,166,0.12)",
      iconColor: "#99f6e4",
      dot: "#2dd4bf",
    },
    amber: {
      borderColor: "rgba(245,158,11,0.22)",
      iconBg: "rgba(245,158,11,0.12)",
      iconColor: "#fcd34d",
      dot: "#f59e0b",
    },
    red: {
      borderColor: "rgba(239,68,68,0.22)",
      iconBg: "rgba(239,68,68,0.12)",
      iconColor: "#fca5a5",
      dot: "#f87171",
    },
  };

  const colors = toneMap[tone] || toneMap.blue;

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: colors.borderColor }]}
      onPress={onPress}
      activeOpacity={0.92}
    >
      <View style={styles.cardTopRow}>
        <View style={[styles.iconCircle, { backgroundColor: colors.iconBg }]}>
          <Ionicons name={icon} size={22} color={colors.iconColor} />
        </View>

        <View style={styles.cardTopRight}>
          <View style={[styles.liveDot, { backgroundColor: colors.dot }]} />
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={14} color="#cbd5e1" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.cardText}>{title}</Text>
        <Text style={styles.cardSub}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Tab({ icon, outlineIcon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}>
        <Ionicons
          name={active ? icon : outlineIcon}
          size={19}
          color={active ? "#08111d" : "#94a3b8"}
        />
      </View>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },

  heroCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 30,
    padding: 18,
    marginBottom: 18,
    backgroundColor: "#071120",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.14)",
  },

  heroGlowOne: {
    position: "absolute",
    top: -30,
    right: -10,
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: "rgba(56,189,248,0.13)",
  },

  heroGlowTwo: {
    position: "absolute",
    bottom: -35,
    left: -20,
    width: 135,
    height: 135,
    borderRadius: 999,
    backgroundColor: "rgba(139,92,246,0.10)",
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.76)",
    borderWidth: 1,
    borderColor: "rgba(125,211,252,0.18)",
  },

  heroBadgeText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "800",
  },

  heroActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7dd3fc",
  },

  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 18,
    letterSpacing: 0.2,
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
    maxWidth: "94%",
  },

  heroStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "rgba(15,23,42,0.74)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.10)",
  },

  heroStatCard: {
    flex: 1,
    alignItems: "center",
  },

  heroStatValue: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "900",
  },

  heroStatLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  heroDivider: {
    width: 1,
    height: 26,
    backgroundColor: "rgba(148,163,184,0.18)",
  },

  heroQuickRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  heroQuickPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 20,
    padding: 14,
    backgroundColor: "#7dd3fc",
  },

  heroQuickPrimaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(8,17,29,0.10)",
  },

  heroQuickPrimaryTitle: {
    color: "#08111d",
    fontSize: 14,
    fontWeight: "900",
  },

  heroQuickPrimarySub: {
    color: "rgba(8,17,29,0.72)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  heroQuickSecondary: {
    width: 94,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.18)",
  },

  heroQuickSecondaryText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 6,
  },

  sectionHead: {
    marginBottom: 14,
    paddingHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "900",
  },

  sectionSub: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },

  sectionMiniBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b1220",
    borderWidth: 1,
    borderColor: "rgba(56,189,248,0.18)",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    minHeight: 156,
    borderRadius: 24,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#0b1220",
    borderWidth: 1,
    justifyContent: "space-between",
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  cardTopRight: {
    alignItems: "flex-end",
    gap: 10,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(148,163,184,0.08)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.10)",
  },

  cardText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#f8fafc",
    marginTop: 16,
  },

  cardSub: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 6,
    fontWeight: "700",
    lineHeight: 17,
  },

  bottomBarWrap: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
  },

  bottomBar: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "space-around",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(30,41,59,0.95)",
    backgroundColor: "rgba(8,15,28,0.98)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 68,
  },

  tabIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  tabIconWrapActive: {
    backgroundColor: "#7dd3fc",
    borderWidth: 1,
    borderColor: "#7dd3fc",
  },

  tabText: {
    fontSize: 11,
    marginTop: 5,
    color: "#94a3b8",
    fontWeight: "700",
  },

  tabTextActive: {
    color: "#7dd3fc",
  },
});
