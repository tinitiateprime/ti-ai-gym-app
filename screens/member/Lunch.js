import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function Lunch() {
  const [meals, setMeals] = useState([
    { name: 'Grilled Chicken Breast', calories: 320, protein: 36, carbs: 0, fat: 10 },
    { name: 'Brown Rice (1 cup)', calories: 215, protein: 5, carbs: 45, fat: 2 },
    { name: 'Steamed Broccoli', calories: 50, protein: 4, carbs: 10, fat: 0 },
    { name: 'Avocado Slices', calories: 120, protein: 2, carbs: 6, fat: 10 },
  ]);

  const totals = meals.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleAddMeal = () => {
    Alert.alert('Coming Soon!', 'Meal addition feature is under development.');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f2f6f9',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>🍽️ Lunch Planner</Text>
        <Text style={{ fontSize: 14, color: '#777', marginTop: 4 }}>
          Your nutrition goals at a glance
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#d1f2eb',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          shadowColor: '#333',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#00695c' }}>
          Today's Intake
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Calories', value: `${totals.calories} kcal` },
            { label: 'Protein', value: `${totals.protein} g` },
            { label: 'Carbs', value: `${totals.carbs} g` },
            { label: 'Fat', value: `${totals.fat} g` },
          ].map((item, i) => (
            <View
              key={i}
              style={{
                width: '48%',
                marginBottom: 16,
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 12,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 14, color: '#777' }}>{item.label}</Text>
              <Text
                style={{ fontSize: 16, fontWeight: '700', color: '#333', marginTop: 4 }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 80 }}>
        <Text
          style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' }}
        >
          Today's Lunch
        </Text>

        {meals.map((meal, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              padding: 14,
              borderRadius: 14,
              marginBottom: 14,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
              elevation: 2,
              alignItems: 'center',
            }}
          >
            <FontAwesome5
              name="utensils"
              size={20}
              color="#333"
              style={{ marginRight: 14 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#444',
                }}
              >
                {meal.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#888',
                  marginTop: 4,
                }}
              >
                {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: '#00796b',
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 6,
        }}
        onPress={handleAddMeal}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
