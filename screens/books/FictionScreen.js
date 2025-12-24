import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const fictionBooks = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    icon: 'magic',
    cover: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    icon: 'eye',
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    icon: 'star',
    cover: 'https://covers.openlibrary.org/b/id/6050036-L.jpg',
  },
];

const fictionFeatures = [
  '✨ Fantasy, Sci-fi, and Romance',
  '🔍 Imaginative storytelling',
  '🎭 Rich characters and world-building',
  '📖 Escape from reality',
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const FictionScreen = () => {
  const [likedBooks, setLikedBooks] = useState({});
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const toggleLike = (id) => {
    setLikedBooks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredBooks = fictionBooks.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item, index }) => {
    const animation = new Animated.Value(0);

    Animated.timing(animation, {
      toValue: 1,
      duration: 700 + index * 200,
      useNativeDriver: true,
    }).start();

    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    });

    const opacity = animation;

    return (
      <Animated.View style={{ transform: [{ translateY }], opacity }}>
        <LinearGradient
          colors={darkMode ? ['#6a11cb', '#2575fc'] : ['#ffffff', '#d4f3ff']}
          style={[styles.card, { backgroundColor: darkMode ? '#000' : '#fff' }]}
        >
          <Image source={{ uri: item.cover }} style={styles.coverImage} />
          <View style={styles.textContainer}>
            <Text style={[styles.bookTitle, !darkMode && { color: '#222' }]}>{item.title}</Text>
            <Text style={[styles.bookAuthor, !darkMode && { color: '#555' }]}>{item.author}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <FontAwesome
              name={likedBooks[item.id] ? 'bookmark' : 'bookmark-o'}
              size={24}
              color={likedBooks[item.id] ? '#fff700' : darkMode ? '#fff' : '#222'}
            />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <ImageBackground
      source={{
        uri: darkMode
          ? 'https://images.unsplash.com/photo-1544717301-9cdcb1f5940f'
          : 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
      }}
      style={styles.background}
      blurRadius={6}
    >
      <View style={[styles.overlay, { backgroundColor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)' }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, !darkMode && { color: '#000' }]}>📚 Fiction Collection</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
            thumbColor={darkMode ? '#fff' : '#000'}
            trackColor={{ false: '#ccc', true: '#555' }}
          />
        </View>

        <TextInput
          placeholder="Search books..."
          placeholderTextColor={darkMode ? '#ccc' : '#444'}
          style={[
            styles.searchBar,
            {
              backgroundColor: darkMode ? '#333' : '#eee',
              color: darkMode ? '#fff' : '#000',
            },
          ]}
          onChangeText={setSearch}
          value={search}
        />

        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />

        <Text style={[styles.featureTitle, !darkMode && { color: '#111' }]}>🧩 What Fiction Offers</Text>
        {fictionFeatures.map((feature, idx) => (
          <Text key={idx} style={[styles.featureItem, !darkMode && { color: '#444' }]}>
            {feature}
          </Text>
        ))}
      </View>
    </ImageBackground>
  );
};

export default FictionScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
  },
  searchBar: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 12,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  coverImage: {
    width: 50,
    height: 75,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  bookTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    color: '#ccc',
    fontSize: 14,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 4,
  },
});
