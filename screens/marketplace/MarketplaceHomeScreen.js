import React, { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  BackHandler,
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
      <Text style={styles.header}>🏪 Marketplace Dashboard</Text>
      <Text style={styles.subHeader}>Manage your products, services & more</Text>

      <Card
        title="My Profile"
        icon={<Ionicons name="person-circle-outline" size={28} color="#4e9efc" />}
        onPress={() => navigation.navigate("MarketplaceProfile")}
      />

      <Card
        title="My Services"
        icon={<MaterialIcons name="miscellaneous-services" size={28} color="#4e9efc" />}
        onPress={() => navigation.navigate("MarketplaceServices")}
      />

      <Card
        title="My Products"
        icon={<FontAwesome5 name="box-open" size={28} color="#4e9efc" />}
        onPress={() => navigation.navigate("MarketplaceProducts")}
      />

      <Card
        title="My Payments"
        icon={<Ionicons name="card-outline" size={28} color="#4e9efc" />}
        onPress={() => navigation.navigate("MarketplacePayments")}
      />

      <Card
        title="My Notifications"
        icon={<Ionicons name="notifications-outline" size={28} color="#4e9efc" />}
        onPress={() => navigation.navigate("MarketplaceNotifications")}
      />
    </ScrollView>
  );
}

function Card({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {icon}
        <Text style={styles.cardText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#020617",
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
