import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Modal,
  Animated
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Breakfast() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyTip, setDailyTip] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setDailyTip(Math.floor(Math.random() * breakfastTips.length));
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(timer);
  }, []);

  const breakfastTips = [
    "💡 Eating protein-rich breakfast helps maintain energy levels throughout the day",
    "🥛 Don't skip breakfast - it kickstarts your metabolism",
    "🍌 Add fruits to your breakfast for natural vitamins and fiber",
    "🥚 Eggs are a complete protein source perfect for morning meals",
    "🌾 Whole grains provide sustained energy for your morning activities",
    "☕ Limit coffee intake and drink plenty of water in the morning"
  ];

  const breakfastMeals = [
    {
      id: 1,
      name: 'Masala Dosa',
      emoji: '🥞',
      time: '15 min',
      calories: 350,
      protein: '8g',
      type: 'South Indian',
      difficulty: 'Medium',
      ingredients: ['Rice batter', 'Potato filling', 'Onions', 'Spices', 'Curry leaves'],
      instructions: [
        'Heat the tawa and spread dosa batter',
        'Cook until golden and crispy',
        'Add potato masala filling',
        'Fold and serve hot with chutney'
      ],
      color: '#ff9f43',
      bgGradient: ['#ff9f43', '#ff6348']
    },
    {
      id: 2,
      name: 'Upma',
      emoji: '🍚',
      time: '10 min',
      calories: 200,
      protein: '5g',
      type: 'South Indian',
      difficulty: 'Easy',
      ingredients: ['Semolina', 'Vegetables', 'Mustard seeds', 'Curry leaves', 'Ginger'],
      instructions: [
        'Roast semolina until fragrant',
        'Heat oil, add mustard seeds and curry leaves',
        'Add vegetables and cook',
        'Mix with roasted semolina and water'
      ],
      color: '#26de81',
      bgGradient: ['#26de81', '#20bf6b']
    },
    {
      id: 3,
      name: 'Poha',
      emoji: '🍛',
      time: '8 min',
      calories: 180,
      protein: '4g',
      type: 'Indian',
      difficulty: 'Easy',
      ingredients: ['Flattened rice', 'Onions', 'Peanuts', 'Turmeric', 'Lemon'],
      instructions: [
        'Wash and soak poha briefly',
        'Heat oil, add mustard seeds',
        'Add onions and cook until soft',
        'Mix poha with turmeric and lemon'
      ],
      color: '#fd79a8',
      bgGradient: ['#fd79a8', '#e84393']
    },
    {
      id: 4,
      name: 'Idli Sambar',
      emoji: '⚪',
      time: '20 min',
      calories: 250,
      protein: '10g',
      type: 'South Indian',
      difficulty: 'Medium',
      ingredients: ['Rice batter', 'Urad dal', 'Sambar powder', 'Vegetables', 'Tamarind'],
      instructions: [
        'Steam idli batter in idli maker',
        'Prepare sambar with vegetables',
        'Season with mustard seeds',
        'Serve hot idlis with sambar'
      ],
      color: '#a29bfe',
      bgGradient: ['#a29bfe', '#6c5ce7']
    },
    {
      id: 5,
      name: 'Paratha',
      emoji: '🫓',
      time: '25 min',
      calories: 300,
      protein: '7g',
      type: 'North Indian',
      difficulty: 'Medium',
      ingredients: ['Wheat flour', 'Stuffing (potato/paneer)', 'Ghee', 'Spices'],
      instructions: [
        'Prepare dough with wheat flour',
        'Make stuffing with vegetables',
        'Roll paratha with stuffing inside',
        'Cook on tawa with ghee'
      ],
      color: '#00b894',
      bgGradient: ['#00b894', '#00a085']
    },
    {
      id: 6,
      name: 'Smoothie Bowl',
      emoji: '🥣',
      time: '5 min',
      calories: 280,
      protein: '12g',
      type: 'Healthy',
      difficulty: 'Easy',
      ingredients: ['Mixed fruits', 'Yogurt', 'Nuts', 'Seeds', 'Honey'],
      instructions: [
        'Blend fruits with yogurt',
        'Pour into bowl',
        'Top with nuts and seeds',
        'Drizzle honey on top'
      ],
      color: '#e17055',
      bgGradient: ['#e17055', '#d63031']
    }
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "🌙 Early Bird";
    if (hour < 10) return "🌅 Good Morning";
    if (hour < 12) return "☀️ Late Morning";
    return "🌞 Brunch Time";
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const MealCard = ({ meal }) => (
    <TouchableOpacity 
      style={[styles.mealCard, { borderColor: meal.color }]}
      onPress={() => {
        setSelectedMeal(meal);
        setModalVisible(true);
      }}
      activeOpacity={0.9}
    >
      <View style={[styles.mealHeader, { backgroundColor: meal.color + '20' }]}>
        <Text style={styles.mealEmoji}>{meal.emoji}</Text>
        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealType}>{meal.type}</Text>
        </View>
        <View style={styles.difficultyBadge}>
          <Text style={[styles.difficultyText, { color: meal.color }]}>{meal.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.mealStats}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>⏱️ {meal.time}</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>🔥 {meal.calories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>💪 {meal.protein}</Text>
          <Text style={styles.statLabel}>Protein</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.cookButton, { backgroundColor: meal.color }]}
        onPress={() => {
          setSelectedMeal(meal);
          setModalVisible(true);
        }}
      >
        <Text style={styles.cookButtonText}>👨‍🍳 View Recipe</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.timeSection}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.currentTime}>{formatTime()}</Text>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.title}>🍳 Breakfast Menu</Text>
          <Text style={styles.subtitle}>Start your day with delicious Indian breakfast</Text>
        </View>
      </Animated.View>

      {/* Daily Tip */}
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>{breakfastTips[dailyTip]}</Text>
      </View>

      {/* Meals Grid */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mealsGrid}>
          {breakfastMeals.map(meal => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </View>
      </ScrollView>

      {/* Recipe Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedMeal && (
              <>
                <View style={[styles.modalHeader, { backgroundColor: selectedMeal.color }]}>
                  <Text style={styles.modalEmoji}>{selectedMeal.emoji}</Text>
                  <View style={styles.modalTitleSection}>
                    <Text style={styles.modalTitle}>{selectedMeal.name}</Text>
                    <Text style={styles.modalSubtitle}>{selectedMeal.type} • {selectedMeal.difficulty}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll}>
                  <View style={styles.modalStats}>
                    <Text style={styles.modalStatText}>⏱️ {selectedMeal.time}</Text>
                    <Text style={styles.modalStatText}>🔥 {selectedMeal.calories} cal</Text>
                    <Text style={styles.modalStatText}>💪 {selectedMeal.protein} protein</Text>
                  </View>

                  <Text style={styles.sectionTitle}>📝 Ingredients:</Text>
                  {selectedMeal.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientItem}>• {ingredient}</Text>
                  ))}

                  <Text style={styles.sectionTitle}>👩‍🍳 Instructions:</Text>
                  {selectedMeal.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructionItem}>
                      {index + 1}. {instruction}
                    </Text>
                  ))}
                </ScrollView>

                <TouchableOpacity 
                  style={[styles.startCookingButton, { backgroundColor: selectedMeal.color }]}
                  onPress={() => {
                    setModalVisible(false);
                    // Here you could add cooking timer functionality
                  }}
                >
                  <Text style={styles.startCookingText}>🍳 Start Cooking!</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2d3436',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greeting: {
    color: '#ffeaa7',
    fontSize: 18,
    fontWeight: '600',
  },
  currentTime: {
    color: '#74b9ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleSection: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#b2bec3',
    fontSize: 14,
    textAlign: 'center',
  },
  tipContainer: {
    margin: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00b894',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    color: '#2d3436',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  mealsGrid: {
    gap: 15,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  mealEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 2,
  },
  mealType: {
    fontSize: 12,
    color: '#636e72',
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  mealStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#636e72',
  },
  cookButton: {
    margin: 15,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: height * 0.85,
    minHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  modalTitleSection: {
    flex: 1,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  modalSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    margin: 20,
    marginTop: 10,
    borderRadius: 15,
  },
  modalStatText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientItem: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 5,
    lineHeight: 20,
  },
  instructionItem: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 8,
    lineHeight: 22,
  },
  startCookingButton: {
    margin: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  startCookingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
