
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

const servicesData = [
  {
    id: "1",
    title: "Personal Training",
    description: "One-on-one fitness sessions with certified trainers.",
    price: 1500,
    icon: "barbell-outline",
  },
  {
    id: "2",
    title: "Yoga Classes",
    description: "Group yoga sessions for all levels.",
    price: 800,
    icon: "leaf-outline",
  },
  {
    id: "3",
    title: "Diet Consultation",
    description: "Customized meal plans for your fitness goals.",
    price: 1200,
    icon: "nutrition-outline",
  },
  {
    id: "4",
    title: "Physiotherapy",
    description: "Recovery and rehab sessions for injuries.",
    price: 1000,
    icon: "medkit-outline",
  },
];

export default function MarketplaceServices({ navigation }) {
  const [services] = useState(servicesData);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Green Accent */}
      <View style={styles.accent} />

      {/* Icon */}
      <View style={styles.iconBox}>
        <Ionicons name={item.icon} size={22} color="#22c55e" />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
      </View>

      {/* Edit */}
      <TouchableOpacity style={styles.editBtn}>
        <Ionicons name="create-outline" size={18} color="#022c22" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>My Services</Text>
          <Text style={styles.headerSub}>Healthy business, healthy life</Text>
        </View>
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#052e16",
  },
  headerTitle: {
    color: "#ecfdf5",
    fontSize: 20,
    fontWeight: "800",
  },
  headerSub: {
    color: "#86efac",
    fontSize: 13,
    marginTop: 2,
  },

  list: {
    padding: 16,
    paddingBottom: 80,
  },

  card: {
    backgroundColor: "#022c22",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#22c55e",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  content: {
    flex: 1,
  },
  title: {
    color: "#ecfdf5",
    fontSize: 16,
    fontWeight: "700",
  },
  desc: {
    color: "#a7f3d0",
    fontSize: 13,
    marginVertical: 4,
  },
  price: {
    color: "#22c55e",
    fontSize: 15,
    fontWeight: "800",
  },

  editBtn: {
    backgroundColor: "#86efac",
    padding: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
});
