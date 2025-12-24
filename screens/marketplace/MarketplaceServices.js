import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample services data
const servicesData = [
  {
    id: "1",
    title: "Personal Training",
    description: "One-on-one fitness sessions with certified trainers.",
    price: 1500,
  },
  {
    id: "2",
    title: "Yoga Classes",
    description: "Group yoga sessions for all levels.",
    price: 800,
  },
  {
    id: "3",
    title: "Diet Consultation",
    description: "Customized meal plans for your fitness goals.",
    price: 1200,
  },
  {
    id: "4",
    title: "Physiotherapy",
    description: "Recovery and rehab sessions for injuries.",
    price: 1000,
  },
];

export default function MarketplaceServices({ navigation }) {
  const [services, setServices] = useState(servicesData);

  const renderItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <Text style={styles.servicePrice}>₹{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.editBtn}>
        <Ionicons name="pencil" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("MarketplaceHomeScreen")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Services</Text>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#020617" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0f172a",
    gap: 16,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },

  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
  },

  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  serviceDescription: {
    fontSize: 13,
    color: "#94a3b8",
    marginVertical: 2,
  },
  servicePrice: {
    fontSize: 14,
    color: "#4e9efc",
    fontWeight: "600",
  },

  editBtn: {
    backgroundColor: "#4e9efc",
    padding: 8,
    borderRadius: 8,
  },
});
