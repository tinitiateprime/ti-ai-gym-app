import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Payment</Text>
      <Text style={styles.subtitle}>
        Complete your payment to unlock your {roleLabel || "membership"}.
      </Text>

      <Button title="Pay Now" onPress={handlePayNow} />

      <Text style={styles.note}>Logged in as: {fullName || email || "Guest"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", backgroundColor: "#020617" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center", color: "#e5e7eb" },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#9ca3af" },
  note: { marginTop: 20, fontSize: 14, textAlign: "center", opacity: 0.7, color: "#9ca3af" },
});
