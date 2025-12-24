import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function Diet() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Diet Plan</Text>

      <Image
        source={require("../../assets/diet.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Daily Diet Plan</Text>
        <Text style={styles.item}>• Morning: Warm water + Lemon</Text>
        <Text style={styles.item}>• Breakfast: Oats / Idly / Eggs</Text>
        <Text style={styles.item}>• Lunch: Rice + Dal + Vegetables</Text>
        <Text style={styles.item}>• Snacks: Fruits / Dry fruits</Text>
        <Text style={styles.item}>• Dinner: Rotis + Curry (Light Meal)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🥗 Weight Loss Tips</Text>
        <Text style={styles.item}>• Avoid sugar & junk food</Text>
        <Text style={styles.item}>• Drink 3-4 liters of water</Text>
        <Text style={styles.item}>• Eat more vegetables & protein</Text>
        <Text style={styles.item}>• Avoid heavy food after 8 PM</Text>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "90%",
    height: 180,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginVertical: 3,
  },
});
