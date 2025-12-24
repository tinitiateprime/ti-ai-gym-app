// screens/CardioScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Modal,
  Animated
} from 'react-native';

const { width } = Dimensions.get('window');

const CardioScreen = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const cardioWorkouts = [
    {
      id: 1,
      name: 'HIIT Sprint',
      duration: '15 min',
      calories: '200-300',
      intensity: 'High',
      description: 'High intensity interval training with sprint bursts',
      exercises: [
        '30s Sprint + 30s Rest',
        'Repeat 15 times',
        '2 min cool down'
      ],
      color: '#ff6b6b'
    },
    {
      id: 2,
      name: 'Steady Jog',
      duration: '30 min',
      calories: '250-400',
      intensity: 'Medium',
      description: 'Consistent pace running for endurance building',
      exercises: [
        '5 min warm-up walk',
        '20 min steady jog',
        '5 min cool-down walk'
      ],
      color: '#4ecdc4'
    },
    {
      id: 3,
      name: 'Cardio Circuit',
      duration: '25 min',
      calories: '300-450',
      intensity: 'High',
      description: 'Mixed cardio exercises for full body engagement',
      exercises: [
        'Jumping Jacks - 1 min',
        'Burpees - 30s',
        'Mountain Climbers - 1 min',
        'High Knees - 30s',
        'Rest 1 min, repeat 5x'
      ],
      color: '#45b7d1'
    },
    {
      id: 4,
      name: 'Fat Burn Walk',
      duration: '45 min',
      calories: '200-300',
      intensity: 'Low',
      description: 'Low impact walking for sustainable fat burning',
      exercises: [
        'Brisk walk pace',
        'Include 5 min inclines',
        'Focus on breathing'
      ],
      color: '#96ceb4'
    },
    {
      id: 5,
      name: 'Bike Sprint',
      duration: '20 min',
      calories: '250-350',
      intensity: 'High',
      description: 'Cycling intervals for leg strength and cardio',
      exercises: [
        '5 min warm-up',
        '1 min sprint + 1 min easy',
        'Repeat 8 times',
        '3 min cool down'
      ],
      color: '#f7dc6f'
    },
    {
      id: 6,
      name: 'Dance Cardio',
      duration: '35 min',
      calories: '300-500',
      intensity: 'Medium',
      description: 'Fun dance movements for cardio fitness',
      exercises: [
        '10 min warm-up dance',
        '20 min high energy dancing',
        '5 min cool down stretches'
      ],
      color: '#bb8fce'
    }
  ];

  const startTimer = (workoutId) => {
    setActiveTimer(workoutId);
    setTimerSeconds(0);
    // In real app, you'd implement actual timer logic here
  };

  const stopTimer = () => {
    setActiveTimer(null);
    setTimerSeconds(0);
  };

  const openWorkoutModal = (workout) => {
    setSelectedWorkout(workout);
    setModalVisible(true);
  };

  const getIntensityColor = (intensity) => {
    switch(intensity) {
      case 'Low': return '#96ceb4';
      case 'Medium': return '#f7dc6f';
      case 'High': return '#ff6b6b';
      default: return '#bbb';
    }
  };

  const WorkoutCard = ({ workout }) => (
    <TouchableOpacity 
      style={[styles.workoutCard, { borderLeftColor: workout.color }]}
      onPress={() => openWorkoutModal(workout)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <View style={[styles.intensityBadge, { backgroundColor: getIntensityColor(workout.intensity) }]}>
          <Text style={styles.intensityText}>{workout.intensity}</Text>
        </View>
      </View>
      
      <Text style={styles.workoutDescription}>{workout.description}</Text>
      
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>⏱️ {workout.duration}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={styles.statValue}>🔥 {workout.calories}</Text>
        </View>
      </View>

      {activeTimer === workout.id ? (
        <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
          <Text style={styles.buttonText}>⏸️ Stop Workout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: workout.color }]}
          onPress={() => startTimer(workout.id)}
        >
          <Text style={styles.buttonText}>▶️ Start Workout</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏃‍♂️ Cardio Training</Text>
        <Text style={styles.subtitle}>
          Boost your heart health and burn calories with these effective cardio workouts
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cardioWorkouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedWorkout && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedWorkout.name}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalDescription}>{selectedWorkout.description}</Text>

                <View style={styles.modalStats}>
                  <Text style={styles.modalStatText}>⏱️ {selectedWorkout.duration}</Text>
                  <Text style={styles.modalStatText}>🔥 {selectedWorkout.calories} cal</Text>
                  <Text style={[styles.modalStatText, { color: getIntensityColor(selectedWorkout.intensity) }]}>
                    💪 {selectedWorkout.intensity} Intensity
                  </Text>
                </View>

                <Text style={styles.exerciseTitle}>Workout Plan:</Text>
                {selectedWorkout.exercises.map((exercise, index) => (
                  <Text key={index} style={styles.exerciseItem}>• {exercise}</Text>
                ))}

                <TouchableOpacity 
                  style={[styles.startModalButton, { backgroundColor: selectedWorkout.color }]}
                  onPress={() => {
                    startTimer(selectedWorkout.id);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.startModalButtonText}>Start This Workout</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#bbb',
    fontSize: 16,
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  workoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  intensityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  intensityText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  workoutDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  startButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalDescription: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    paddingVertical: 15,
    backgroundColor: '#0d0d0d',
    borderRadius: 10,
  },
  modalStatText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  exerciseTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseItem: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  startModalButton: {
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startModalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

