

import React, { useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  BackHandler,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function MarketplaceHomeScreen({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>💪 Marketplace Gym</Text>
      <Text style={styles.subHeader}>Power your fitness business</Text>

      {/* STATS */}
      <View style={styles.statsRow}>
        <StatCard title="₹12.5K" label="Revenue" />
        <StatCard title="38" label="Orders" />
        <StatCard title="12" label="Services" />
      </View>

      {/* MENU */}
      <GymCard
        title="My Profile"
        subtitle="Personal & business info"
        icon="person"
        onPress={() => navigation.navigate("MarketplaceProfile")}
      />

      <GymCard
        title="My Services"
        subtitle="Training & plans"
        icon="fitness-center"
        onPress={() => navigation.navigate("MarketplaceServices")}
      />

      <GymCard
        title="My Products"
        subtitle="Supplements & gear"
        icon="box-open"
        isFA
        onPress={() => navigation.navigate("MarketplaceProducts")}
      />

      <GymCard
        title="Payments"
        subtitle="Income & history"
        icon="card"
        onPress={() => navigation.navigate("MarketplacePayments")}
      />

      <GymCard
        title="Notifications"
        subtitle="Alerts & updates"
        icon="notifications"
        onPress={() => navigation.navigate("MarketplaceNotifications")}
      />

      {/* QUICK ACTION */}
      <TouchableOpacity
        style={styles.quickAction}
        onPress={() => alert("Add New Service")}
      >
        <Ionicons name="add-circle" size={22} color="#020617" />
        <Text style={styles.quickText}>Add New Service</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ title, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{title}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* ---------------- GYM CARD ---------------- */
function GymCard({ title, subtitle, icon, onPress, isFA }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
      >
        <View style={styles.left}>
          <View style={styles.iconBox}>
            {isFA ? (
              <FontAwesome5 name={icon} size={20} color="#22c55e" />
            ) : (
              <MaterialIcons name={icon} size={24} color="#22c55e" />
            )}
          </View>

          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSub}>{subtitle}</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#22c55e" />
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#020617",
    flexGrow: 1,
  },

  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "#22c55e",
  },

  subHeader: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 20,
  },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#052e16",
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  statValue: {
    color: "#22c55e",
    fontSize: 18,
    fontWeight: "800",
  },

  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },

  /* CARDS */
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1f2933",
    elevation: 6,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconBox: {
    height: 48,
    width: 48,
    borderRadius: 14,
    backgroundColor: "#052e16",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  cardSub: {
    color: "#94a3b8",
    fontSize: 13,
  },

  /* QUICK ACTION */
  quickAction: {
    marginTop: 30,
    backgroundColor: "#22c55e",
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  quickText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "800",
  },
});




