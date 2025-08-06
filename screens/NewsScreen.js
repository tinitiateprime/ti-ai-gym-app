import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const newsItems = [
  {
    title: '5 Healthy Habits to Start Today',
    summary: 'Improve your daily routine with these simple health tips.',
    image: require('../assets/news1.png'),
    date: 'Aug 1, 2025',
    category: 'Health',
  },
  {
    title: 'Top 10 Exercises for Home',
    summary: 'No gym? No problem. Try these at-home workouts.',
    image: require('../assets/news2.png'),
    date: 'Aug 3, 2025',
    category: 'Fitness',
  },
  {
    title: 'Benefits of Intermittent Fasting',
    summary: 'Explore how fasting helps in fat loss and energy.',
    image: require('../assets/news3.png'),
    date: 'Aug 5, 2025',
    category: 'Nutrition',
  },
];

const categories = ['All', 'Health', 'Fitness', 'Nutrition'];

export default function NewsScreen() {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState({});
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleLike = (index) => {
    setLikedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleBookmark = (index) => {
    setBookmarkedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCardPress = (item) => {
    Alert.alert('Coming Soon', `Read full article: "${item.title}"`);
  };

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Health News</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search news..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.chip,
              activeCategory === cat && styles.activeChip,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.chipText,
                activeCategory === cat && styles.activeChipText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* News Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {filteredNews.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => handleCardPress(item)}
          >
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.cardImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
              />
              <TouchableOpacity
                style={styles.bookmark}
                onPress={() => toggleBookmark(index)}
              >
                <Feather
                  name="bookmark"
                  size={20}
                  color={bookmarkedItems[index] ? '#ff5555' : '#fff'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleLike(index)}>
                  <AntDesign
                    name={likedItems[index] ? 'heart' : 'hearto'}
                    size={20}
                    color={likedItems[index] ? '#ff3333' : '#aaa'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.date}>{item.date} • {item.category}</Text>
              <Text style={styles.summary}>{item.summary}</Text>

              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => handleCardPress(item)}
              >
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0e' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#1d1d1d',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 6 },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 14,
  },

  chipContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    flexGrow: 0,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#222',
    borderRadius: 20,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: '#ff5555',
  },
  chipText: {
    color: '#aaa',
    fontSize: 13,
  },
  activeChipText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#1b1b1b',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 5,
  },
  imageWrapper: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '100%',
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 6,
  },

  cardBody: {
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 8,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginBottom: 6,
  },
  summary: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },

  readMoreButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
