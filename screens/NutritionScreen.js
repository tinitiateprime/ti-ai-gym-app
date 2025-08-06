import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Dynamic Configuration
const THEMES = {
  ocean: {
    background: ['#667eea', '#764ba2', '#f093fb'],
    primary: ['#4CAF50', '#45a049'],
    secondary: ['#2196F3', '#1976D2'],
    accent: ['#FF9800', '#F57C00'],
  },
  sunset: {
    background: ['#ff7e5f', '#feb47b', '#ff6b6b'],
    primary: ['#e74c3c', '#c0392b'],
    secondary: ['#f39c12', '#e67e22'],
    accent: ['#9b59b6', '#8e44ad'],
  },
  forest: {
    background: ['#11998e', '#38ef7d', '#16a085'],
    primary: ['#27ae60', '#229954'],
    secondary: ['#3498db', '#2980b9'],
    accent: ['#e67e22', '#d35400'],
  },
  night: {
    background: ['#2c3e50', '#3498db', '#2980b9'],
    primary: ['#9b59b6', '#8e44ad'],
    secondary: ['#e74c3c', '#c0392b'],
    accent: ['#f39c12', '#e67e22'],
  },
};

const MEAL_CATEGORIES = {
  breakfast: { emoji: '🥣', colors: ['#FFA726', '#FF7043'] },
  lunch: { emoji: '🍗', colors: ['#66BB6A', '#4CAF50'] },
  snack: { emoji: '🍯', colors: ['#AB47BC', '#8E24AA'] },
  dinner: { emoji: '🐟', colors: ['#42A5F5', '#1E88E5'] },
  drink: { emoji: '🥛', colors: ['#7E57C2', '#673AB7'] },
  dessert: { emoji: '🍰', colors: ['#FF7043', '#FF5722'] },
  salad: { emoji: '🥗', colors: ['#4CAF50', '#388E3C'] },
  soup: { emoji: '🍲', colors: ['#FF9800', '#F57C00'] },
};

export default function NutritionScreen() {
  // Dynamic State Management
  const [currentTheme, setCurrentTheme] = useState('ocean');
  const [viewMode, setViewMode] = useState('day'); // day, night, week
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  
  // Dynamic Meal Data
  const [mealData, setMealData] = useState({
    day: [
      { id: 1, time: 'Breakfast', meal: 'Oatmeal with fruits and nuts', calories: 320, category: 'breakfast' },
      { id: 2, time: 'Lunch', meal: 'Grilled chicken with quinoa & salad', calories: 650, category: 'lunch' },
      { id: 3, time: 'Snack', meal: 'Greek yogurt with honey', calories: 180, category: 'snack' },
    ],
    night: [
      { id: 4, time: 'Dinner', meal: 'Steamed fish with vegetables', calories: 450, category: 'dinner' },
      { id: 5, time: 'Snack', meal: 'Warm milk with almonds', calories: 150, category: 'drink' },
    ],
    week: [
      { id: 6, time: 'Monday', meal: 'Total: 1850 calories', calories: 1850, category: 'breakfast' },
      { id: 7, time: 'Tuesday', meal: 'Total: 2100 calories', calories: 2100, category: 'lunch' },
      { id: 8, time: 'Wednesday', meal: 'Total: 1950 calories', calories: 1950, category: 'snack' },
      { id: 9, time: 'Thursday', meal: 'Total: 2200 calories', calories: 2200, category: 'dinner' },
      { id: 10, time: 'Friday', meal: 'Total: 1800 calories', calories: 1800, category: 'drink' },
    ],
  });

  // New Meal Form State
  const [newMeal, setNewMeal] = useState({
    time: '',
    meal: '',
    calories: '',
    category: 'breakfast',
  });

  // Dynamic Calculations
  const currentMeals = mealData[viewMode] || [];
  const consumedCalories = currentMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const progress = Math.min(consumedCalories / calorieGoal, 1);
  const theme = THEMES[currentTheme];

  // Dynamic View Modes
  const VIEW_MODES = [
    { key: 'day', label: 'Day', emoji: '☀️', colors: theme.primary },
    { key: 'night', label: 'Night', emoji: '🌙', colors: theme.secondary },
    { key: 'week', label: 'Week', emoji: '📅', colors: theme.accent },
  ];

  const handleModeChange = (mode) => {
    setViewMode(mode);
    Animated.spring(slideAnim, {
      toValue: VIEW_MODES.findIndex(m => m.key === mode),
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const addMeal = () => {
    if (!newMeal.time || !newMeal.meal || !newMeal.calories) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const meal = {
      id: Date.now(),
      ...newMeal,
      calories: parseInt(newMeal.calories),
    };

    setMealData(prev => ({
      ...prev,
      [viewMode]: [...prev[viewMode], meal],
    }));

    setNewMeal({ time: '', meal: '', calories: '', category: 'breakfast' });
    setShowAddMeal(false);
  };

  const deleteMeal = (id) => {
    Alert.alert(
      'Delete Meal',
      'Are you sure you want to delete this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMealData(prev => ({
              ...prev,
              [viewMode]: prev[viewMode].filter(meal => meal.id !== id),
            }));
          },
        },
      ]
    );
  };

  const resetData = () => {
    Alert.alert(
      'Reset Data',
      'This will clear all meal data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setMealData({ day: [], night: [], week: [] });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={theme.background}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Dynamic Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => setShowSettings(true)}
            style={styles.settingsButton}
          >
            <LinearGradient
              colors={theme.primary}
              style={styles.headerIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.headerEmoji}>⚙️</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <Text style={styles.header}>Nutrition Hub</Text>
          <Text style={styles.subtitle}>
            {viewMode === 'week' ? 'Weekly Overview' : `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Tracking`}
          </Text>
        </View>

        {/* Dynamic Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.toggleBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {VIEW_MODES.map((mode, index) => (
              <TouchableOpacity
                key={mode.key}
                style={[styles.toggleBtn, viewMode === mode.key && styles.activeToggle]}
                onPress={() => handleModeChange(mode.key)}
              >
                {viewMode === mode.key && (
                  <LinearGradient
                    colors={mode.colors}
                    style={styles.activeToggleGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
                <Text style={styles.toggleEmoji}>{mode.emoji}</Text>
                <Text style={[styles.toggleText, viewMode === mode.key && styles.activeText]}>
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </View>

        {/* Dynamic Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
            style={styles.statCard}
          >
            <LinearGradient colors={theme.primary} style={styles.statIcon}>
              <Text style={styles.statEmoji}>📈</Text>
            </LinearGradient>
            <Text style={styles.statLabel}>Consumed</Text>
            <Text style={styles.statValue}>{consumedCalories}</Text>
            <Text style={styles.statUnit}>calories</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
            style={styles.statCard}
          >
            <LinearGradient colors={theme.secondary} style={styles.statIcon}>
              <Text style={styles.statEmoji}>🎯</Text>
            </LinearGradient>
            <Text style={styles.statLabel}>Goal</Text>
            <Text style={styles.statValue}>{calorieGoal}</Text>
            <Text style={styles.statUnit}>calories</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
            style={styles.statCard}
          >
            <LinearGradient colors={theme.accent} style={styles.statIcon}>
              <Text style={styles.statEmoji}>⚡</Text>
            </LinearGradient>
            <Text style={styles.statLabel}>Progress</Text>
            <Text style={styles.statValue}>{Math.round(progress * 100)}%</Text>
            <Text style={styles.statUnit}>complete</Text>
          </LinearGradient>
        </View>

        {/* Dynamic Progress */}
        <LinearGradient
          colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
          style={styles.progressContainer}
        >
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              {viewMode === 'week' ? 'Weekly Progress' : 'Daily Progress'}
            </Text>
            <TouchableOpacity 
              onPress={() => setShowAddMeal(true)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          <ProgressBar 
            progress={progress} 
            color={theme.primary[0]} 
            style={styles.progressBar}
          />
        </LinearGradient>

        {/* Dynamic Meal List */}
        <View style={styles.mealSection}>
          <Text style={styles.mealSectionTitle}>
            {viewMode === 'week' ? '📊 Weekly Summary' : 
             viewMode === 'day' ? '🌅 Day Meals' : '🌙 Night Meals'}
          </Text>
          
          {currentMeals.map((item) => {
            const category = MEAL_CATEGORIES[item.category] || MEAL_CATEGORIES.breakfast;
            return (
              <TouchableOpacity
                key={item.id}
                onLongPress={() => deleteMeal(item.id)}
                style={styles.mealItem}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                  style={styles.mealItemGradient}
                />
                <View style={styles.mealContent}>
                  <LinearGradient
                    colors={category.colors}
                    style={styles.mealIcon}
                  >
                    <Text style={styles.mealEmoji}>{category.emoji}</Text>
                  </LinearGradient>
                  
                  <View style={styles.mealDetails}>
                    <View style={styles.mealHeader}>
                      <Text style={styles.mealTime}>{item.time}</Text>
                      <LinearGradient
                        colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.6)']}
                        style={styles.caloriesBadge}
                      >
                        <Text style={styles.caloriesText}>{item.calories} cal</Text>
                      </LinearGradient>
                    </View>
                    <Text style={styles.mealText}>{item.meal}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {currentMeals.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No meals added yet</Text>
              <TouchableOpacity 
                onPress={() => setShowAddMeal(true)}
                style={styles.emptyStateButton}
              >
                <Text style={styles.emptyStateButtonText}>Add Your First Meal</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal visible={showSettings} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={theme.background}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Settings</Text>
            
            <View style={styles.settingSection}>
              <Text style={styles.settingLabel}>Theme</Text>
              <View style={styles.themeSelector}>
                {Object.keys(THEMES).map((themeKey) => (
                  <TouchableOpacity
                    key={themeKey}
                    onPress={() => setCurrentTheme(themeKey)}
                    style={[
                      styles.themeOption,
                      currentTheme === themeKey && styles.selectedTheme
                    ]}
                  >
                    <LinearGradient
                      colors={THEMES[themeKey].primary}
                      style={styles.themePreview}
                    />
                    <Text style={styles.themeText}>{themeKey}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.settingLabel}>Daily Calorie Goal</Text>
              <TextInput
                style={styles.goalInput}
                value={calorieGoal.toString()}
                onChangeText={(text) => setCalorieGoal(parseInt(text) || 2000)}
                keyboardType="numeric"
                placeholder="2000"
              />
            </View>

            <TouchableOpacity onPress={resetData} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset All Data</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setShowSettings(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Add Meal Modal */}
      <Modal visible={showAddMeal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={theme.background}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Add Meal</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Meal time (e.g., Breakfast)"
              value={newMeal.time}
              onChangeText={(text) => setNewMeal({...newMeal, time: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Meal description"
              value={newMeal.meal}
              onChangeText={(text) => setNewMeal({...newMeal, meal: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Calories"
              value={newMeal.calories}
              onChangeText={(text) => setNewMeal({...newMeal, calories: text})}
              keyboardType="numeric"
            />

            <View style={styles.categorySelector}>
              <Text style={styles.settingLabel}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(MEAL_CATEGORIES).map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setNewMeal({...newMeal, category})}
                    style={[
                      styles.categoryOption,
                      newMeal.category === category && styles.selectedCategory
                    ]}
                  >
                    <Text style={styles.categoryEmoji}>{MEAL_CATEGORIES[category].emoji}</Text>
                    <Text style={styles.categoryText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={addMeal} style={styles.addMealButton}>
                <Text style={styles.addMealButtonText}>Add Meal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setShowAddMeal(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  backgroundGradient: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  headerContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  settingsButton: { position: 'absolute', right: 0, top: 0 },
  headerIcon: { width: 50, height: 50, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  headerEmoji: { fontSize: 24 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 8 },
  toggleContainer: { marginBottom: 25 },
  toggleBackground: { flexDirection: 'row', padding: 6, borderRadius: 20 },
  toggleBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 15, position: 'relative' },
  activeToggle: { elevation: 8 },
  activeToggleGradient: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: 15 },
  toggleEmoji: { fontSize: 16, marginRight: 6 },
  toggleText: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
  activeText: { color: '#fff', fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, gap: 10 },
  statCard: { flex: 1, padding: 15, borderRadius: 20, alignItems: 'center' },
  statIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statEmoji: { fontSize: 20 },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 5 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  statUnit: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  progressContainer: { padding: 20, borderRadius: 20, marginBottom: 25 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  progressTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  addButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  addButtonText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  progressBar: { height: 10, borderRadius: 5 },
  mealSection: { marginBottom: 25 },
  mealSectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  mealItem: { borderRadius: 20, marginBottom: 15, position: 'relative', overflow: 'hidden' },
  mealItemGradient: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  mealContent: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  mealIcon: { width: 50, height: 50, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  mealEmoji: { fontSize: 24 },
  mealDetails: { flex: 1 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  mealTime: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  caloriesBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  caloriesText: { fontSize: 12, fontWeight: '600', color: '#333' },
  mealText: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyStateText: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 15 },
  emptyStateButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15 },
  emptyStateButtonText: { color: '#fff', fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.9, maxHeight: '80%', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 25 },
  settingSection: { marginBottom: 25 },
  settingLabel: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 10 },
  themeSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  themeOption: { alignItems: 'center', padding: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)' },
  selectedTheme: { backgroundColor: 'rgba(255,255,255,0.3)' },
  themePreview: { width: 30, height: 30, borderRadius: 8, marginBottom: 5 },
  themeText: { fontSize: 12, color: '#fff', textTransform: 'capitalize' },
  goalInput: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 15, borderRadius: 12, fontSize: 16 },
  input: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 15 },
  categorySelector: { marginBottom: 20 },
  categoryOption: { alignItems: 'center', padding: 10, marginRight: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', minWidth: 80 },
  selectedCategory: { backgroundColor: 'rgba(255,255,255,0.3)' },
  categoryEmoji: { fontSize: 24, marginBottom: 5 },
  categoryText: { fontSize: 12, color: '#fff', textTransform: 'capitalize' },
  modalButtons: { flexDirection: 'row', gap: 15 },
  addMealButton: { flex: 1, backgroundColor: 'rgba(76,175,80,0.8)', padding: 15, borderRadius: 12, alignItems: 'center' },
  addMealButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 12, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  resetButton: { backgroundColor: 'rgba(244,67,54,0.8)', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  resetButtonText: { color: '#fff', fontWeight: 'bold' },
  closeButton: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 12, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontWeight: '600' },
});