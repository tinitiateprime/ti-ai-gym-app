import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

const WorkoutScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [screen, setScreen] = useState('home');

  const achievements = [
    { icon: '🔥', label: 'Streak', value: '7 days' },
    { icon: '💪', label: 'Workouts', value: '24' },
    { icon: '⏱️', label: 'Time', value: '12h' },
    { icon: '🏆', label: 'Level', value: 'Pro' },
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];

  const workoutData = [
    {
      id: 1,
      name: 'Jumping Jacks',
      duration: '30 sec',
      calories: 50,
      difficulty: 'Beginner',
      image: require('../assets/jumping-jacks.jpg'),
      muscleGroups: ['Full Body'],
    },
    {
      id: 2,
      name: 'Push Ups',
      duration: '45 sec',
      calories: 60,
      difficulty: 'Intermediate',
      image: require('../assets/pushups.jpg'),
      muscleGroups: ['Chest', 'Triceps'],
    },
    {
      id: 3,
      name: 'Squats',
      duration: '3 sets × 15',
      calories: 25,
      difficulty: 'Beginner',
      muscleGroups: ['Legs'],
      instructions: 'Lower hips back and down, then stand back up',
      image: require('../assets/squats.jpg'),
    },
    {
      id: 4,
      name: 'Plank',
      duration: '3 sets × 30s',
      calories: 18,
      difficulty: 'Intermediate',
      muscleGroups: ['Core'],
      instructions: 'Hold straight body position on forearms',
      image: require('../assets/plank.png'),
    },
  ];

  const openWorkflow = (level, exercise) => {
    console.log(`${level} clicked for ${exercise.name}`);
    switch (level) {
      case 'Beginner':
        navigation.navigate('BeginnerWorkoutFlow',{ workout: exercise });
        break;
      case 'Intermediate':
        navigation.navigate('IntermediateWorkoutFlow',{ workout: exercise });
        break;
      case 'Advanced':
        navigation.navigate('AdvancedWorkoutFlow',{ workout: exercise });
        break;
      case 'Pro':
        navigation.navigate('ProWorkoutFlow',);
        break;
      default:
        break;
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>🏋️ Workout Programs</Text>
      {screen === 'detail' && (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              setScreen('home');
              setSelected(null);
            }}
          >
            <Text style={styles.headerButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Exercises</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      {achievements.map((item, index) => (
        <View key={index} style={styles.achievementCard}>
          <Text style={styles.achievementIcon}>{item.icon}</Text>
          <Text style={styles.achievementLabel}>{item.label}</Text>
          <Text style={styles.achievementValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );

  const renderExerciseCard = (exercise) => (
    <TouchableOpacity
      key={exercise.id}
      style={styles.card}
      onPress={() => {
        openWorkflow(level, exercise.name) ;
        setSelected(exercise);
        setScreen('detail');
        console.log(`Navigating to detail for: ${exercise.name}`);
      }}
    >
      <View style={styles.cardContent}>
        <Image source={exercise.image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardText}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.detailsText}>
            ⏱️ {exercise.duration} • 🔥 {exercise.calories} cal • {exercise.difficulty}
          </Text>
          <View style={styles.muscleGroupRow}>
            {exercise.muscleGroups.map((group, i) => (
              <Text key={i} style={styles.muscleGroupTag}>
                {group}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.difficultyRow}>
        {difficulties.map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.difficultyButton}
            onPress={() => openWorkflow(level, exercise)}
          >
            <Text style={styles.difficultyText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {screen === 'home' && renderAchievements()}
        <Text style={styles.heading}>Select Your Workout</Text>
        {workoutData.map((exercise) => renderExerciseCard(exercise))}
      </ScrollView>
    </View>
  );
};

export default WorkoutScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    backgroundColor: '#222',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  headerButton: {
    backgroundColor: '#4dd938',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  headerButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 80,
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  achievementCard: {
    backgroundColor: '#1e1e1e',
    width: '47%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  achievementLabel: {
    color: 'gray',
    fontSize: 13,
  },
  achievementValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#4dd938',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  exerciseName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailsText: {
    color: 'white',
    marginBottom: 4,
  },
  muscleGroupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleGroupTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    fontSize: 12,
    marginTop: 4,
  },
  difficultyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  difficultyButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
  },
});
