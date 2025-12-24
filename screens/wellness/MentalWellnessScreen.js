import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const wellnessSections = [
  {
    id: '1',
    title: 'Meditation & Breathing',
    description: 'Guided audio sessions for relaxation and mindfulness.',
    image: require('../../assets/meditation_1.png'),
  },
  {
    id: '2',
    title: 'Journaling',
    description: 'Clear your mind by writing your thoughts and feelings.',
    image: require('../../assets/journaling.png'),
  },
  {
    id: '3',
    title: 'Digital Detox',
    description: 'Unplug from devices to rest your mind.',
    image: require('../../assets/detox.png'),
  },
  {
    id: '4',
    title: 'Daily Affirmations',
    description: 'Boost self-esteem with daily positive messages.',
    image: require('../../assets/affirmation.png'),
  },
  {
    id: '5',
    title: 'Mood Tracker',
    description: 'Track how you feel every day with simple check-ins.',
    image: require('../../assets/mood.png'),
  },
  {
    id: '6',
    title: 'Sleep & Relaxation',
    description: 'Listen to sleep sounds and tips to improve rest.',
    image: require('../../assets/sleep.png'),
  },
  {
    id: '7',
    title: 'Yoga for Mind',
    description: 'Gentle yoga sessions for stress relief and focus.',
    image: require('../../assets/yoga.png'),
  },
  {
    id: '8',
    title: 'Mental Health Resources',
    description: 'Explore articles, tips, and advice by professionals.',
    image: require('../../assets/resource.png'),
  },
  {
    id: '9',
    title: 'Contact a Counselor',
    description: 'Reach out to mental health experts when needed.',
    image: require('../../assets/help.png'),
  },
];


const MentalWellnessScreen = () => {
  const [activeTimers, setActiveTimers] = useState({});
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimers((prev) => {
        const updated = { ...prev };
        for (let key in updated) {
          if (updated[key]?.running) {
            updated[key].time += 1;
          }
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id) => {
    setActiveTimers((prev) => {
      const isRunning = prev[id]?.running;
      if (isRunning) return { ...prev, [id]: { ...prev[id], running: false } };
      return {
        ...prev,
        [id]: { time: prev[id]?.time || 0, running: true },
      };
    });
  };

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/wellness_bg.jpg')}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(99,102,241,0.7)', 'rgba(99,102,241,0.3)', 'transparent']}
          style={styles.gradientOverlay}
        >
          <Text style={styles.headerTitle}>
            <FontAwesome5 name="brain" size={20} color="#fff" /> Mental Wellness
          </Text>
          <Text style={styles.headerSubtitle}>
            Your mind matters. Discover practices to stay mentally fit.
          </Text>
        </LinearGradient>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={wellnessSections}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const timer = activeTimers[item.id]?.time || 0;
            const isRunning = activeTimers[item.id]?.running;
            const showDetail = showDetails[item.id];

            return (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>

                  {showDetail && (
                    <Text style={styles.detailText}>
                      This activity can help you reset your mind, lower stress levels, and bring clarity. Try doing this daily for 5–10 minutes.
                    </Text>
                  )}

                  {timer > 0 && (
                    <Text style={styles.timerText}>
                      Time Spent: {Math.floor(timer / 60)}m {timer % 60}s
                    </Text>
                  )}

                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => toggleTimer(item.id)}>
                      <Ionicons name={isRunning ? "stop-circle-outline" : "play-circle-outline"} size={20} color="#6366f1" />
                      <Text style={styles.actionText}>{isRunning ? 'Stop' : 'Start'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => toggleDetails(item.id)}>
                      <MaterialIcons name="info-outline" size={20} color="#6366f1" />
                      <Text style={styles.actionText}>{showDetail ? 'Hide' : 'Details'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default MentalWellnessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    padding: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 4,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 60,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 13.5,
    color: '#6b7280',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 6,
  },
  timerText: {
    fontSize: 13,
    color: '#10b981',
    marginBottom: 6,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 13,
    color: '#4f46e5',
    marginLeft: 6,
    fontWeight: '500',
  },
});
