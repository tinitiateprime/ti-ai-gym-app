// (Same imports as before)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const categories = ['All', 'Nutrition', 'Mental', 'Fitness'];

const mockArticles = [
  {
    id: '1',
    title: 'Healthy Eating for Mind and Body',
    content: 'Eating well improves focus and emotional balance...',
    trend: 'up',
    category: 'Nutrition',
    date: '2025-08-01',
    readTime: '3 min',
  },
  {
    id: '2',
    title: 'Social Media and Mental Wellness',
    content: 'Spending time on social media can both help and hurt your mood...',
    trend: 'down',
    category: 'Mental',
    date: '2025-08-02',
    readTime: '2 min',
  },
  {
    id: '3',
    title: 'Power of Nature Walks 🌳',
    content: 'Spending just 20 minutes in nature can lower stress hormones...',
    trend: 'up',
    category: 'Fitness',
    date: '2025-08-03',
    readTime: '4 min',
  },
  {
    id: '4',
    title: 'Importance of Sleep Hygiene',
    content: 'A consistent sleep schedule can elevate mood and performance...',
    trend: 'up',
    category: 'Mental',
    date: '2025-08-04',
    readTime: '5 min',
  },
];

const dailyTips = [
  'Take 3 deep breaths to reset your mind',
  'Drink a glass of water to refresh your body',
  'Pause and write down what you’re grateful for',
  'Stretch your back for 60 seconds',
];

export default function TrendsScreen() {
  const [bookmarked, setBookmarked] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [dailyTip, setDailyTip] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    setDailyTip(randomTip);
  }, []);

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderRightActions = () => (
    <View style={{ flexDirection: 'row' }}>
      <RectButton style={styles.swipeBtn}>
        <FontAwesome name="share-alt" size={20} color="#fff" />
        <Text style={styles.swipeText}>Share</Text>
      </RectButton>
      <RectButton style={styles.swipeBtn}>
        <FontAwesome name="save" size={20} color="#fff" />
        <Text style={styles.swipeText}>Save</Text>
      </RectButton>
    </View>
  );

  const filteredArticles =
    selectedCategory === 'All'
      ? mockArticles
      : mockArticles.filter((a) => a.category === selectedCategory);

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const isBookmarked = bookmarked.includes(item.id);
    const isLiked = liked.includes(item.id);

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)} activeOpacity={0.9}>
          <LinearGradient
            colors={['#34d399', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {item.trend === 'up' && <Text style={styles.trendingBadge}>🔥 Trending</Text>}
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.icons}>
                <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                  <FontAwesome
                    name={isBookmarked ? 'star' : 'star-o'}
                    size={20}
                    color={isBookmarked ? '#ffd700' : '#fff'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleLike(item.id)} style={{ marginLeft: 10 }}>
                  <FontAwesome
                    name={isLiked ? 'heart' : 'heart-o'}
                    size={20}
                    color={isLiked ? '#f87171' : '#fff'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.meta}>
              {item.date} • {item.readTime}
              {'  '}
              {item.trend === 'up' ? '📈' : '📉'}
            </Text>

            {isExpanded && <Text style={styles.content}>{item.content}</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca' }}
        style={styles.bg}
        blurRadius={5}
      >
        <View style={styles.overlay}>
          <Text style={styles.tip}>💡 Tip of the Day: {dailyTip}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList
            data={filteredArticles}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tip: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    position: 'relative',
  },
  trendingBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: '#ef4444',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    fontSize: 12,
    color: '#e0f2fe',
    marginTop: 8,
  },
  content: {
    color: '#f0fdf4',
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  swipeBtn: {
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    paddingVertical: 10,
    marginLeft: 4,
    borderRadius: 10,
  },
  swipeText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  categoryBar: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 10,
  },
  categoryBtnActive: {
    backgroundColor: '#34d399',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  categoryTextActive: {
    fontWeight: 'bold',
  },
});
