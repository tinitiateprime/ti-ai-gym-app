import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  TouchableOpacity,
  Share,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Swipeable } from 'react-native-gesture-handler';

const tips = [
  { id: '1', title: 'Drink More Water', tip: 'Start your day with a glass of water to boost hydration.' },
  { id: '2', title: 'Get Enough Sleep', tip: 'Aim for at least 7-8 hours every night for optimal mental and physical recovery.' },
  { id: '3', title: 'Stretch Daily', tip: 'A 5-minute morning stretch enhances mobility, posture, and blood circulation.' },
  { id: '4', title: 'Limit Screen Time', tip: 'Take breaks every hour to rest your eyes and mind.' },
  { id: '5', title: 'Practice Gratitude', tip: 'Write down 3 things you’re grateful for every day.' },
];

const { width } = Dimensions.get('window');

const DailyTipsScreen = () => {
  const [doneTips, setDoneTips] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Random tip for the day
  const [dailyTip, setDailyTip] = useState(null);

  useEffect(() => {
    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleDone = (id) => {
    setDoneTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (tipText) => {
    try {
      await Share.share({ message: tipText });
    } catch (error) {
      console.error('Error sharing tip:', error);
    }
  };

  const renderRightActions = (item) => (
    <View style={styles.swipeActions}>
      <TouchableOpacity onPress={() => handleShare(item.tip)} style={styles.actionBtn}>
        <Ionicons name="share-social" size={22} color="#4ade80" />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <Animated.View style={[styles.cardWrapper, { opacity: fadeAnim }]}>
        <BlurView intensity={40} tint="light" style={styles.card}>
          <TouchableOpacity onPress={() => toggleDone(item.id)}>
            <Ionicons
              name={doneTips[item.id] ? 'checkmark-circle' : 'ellipse-outline'}
              size={26}
              color={doneTips[item.id] ? '#22c55e' : '#9ca3af'}
              style={styles.checkIcon}
            />
          </TouchableOpacity>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.tip}>{item.tip}</Text>
          </View>
        </BlurView>
      </Animated.View>
    </Swipeable>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1587502536263-9298f1a9b9f4?auto=format&fit=crop&w=1080&q=80',
      }}
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>✨ Daily Wellness Tips</Text>

        {/* Daily Tip */}
        {dailyTip && (
          <View style={styles.dailyHighlight}>
            <Text style={styles.dailyTipTitle}>🌞 Tip of the Day</Text>
            <Text style={styles.dailyTipText}>
              <Text style={{ fontWeight: 'bold' }}>{dailyTip.title}: </Text>
              {dailyTip.tip}
            </Text>
          </View>
        )}

        <FlatList
          data={tips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default DailyTipsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 30,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  checkIcon: {
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  tip: {
    fontSize: 14.5,
    color: '#374151',
  },
  swipeActions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  actionBtn: {
    backgroundColor: '#ecfdf5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    color: '#065f46',
    fontSize: 13,
  },
  dailyHighlight: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  dailyTipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 6,
  },
  dailyTipText: {
    fontSize: 14,
    color: '#1f2937',
  },
});
