import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Switch,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const books = [
  {
    id: '1',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    icon: 'globe',
    cover: 'https://covers.openlibrary.org/b/id/11153227-L.jpg',
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    icon: 'check-circle',
    cover: 'https://covers.openlibrary.org/b/id/10441550-L.jpg',
  },
  {
    id: '3',
    title: 'Educated',
    author: 'Tara Westover',
    icon: 'graduation-cap',
    cover: 'https://covers.openlibrary.org/b/id/9252030-L.jpg',
  },
];

export default function NonFictionScreen() {
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [featured, setFeatured] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setFeatured(books[Math.floor(Math.random() * books.length)].title);
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const renderItem = ({ item }) => (
    <BlurView intensity={darkMode ? 90 : 70} tint={darkMode ? 'dark' : 'light'} style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.cover }} style={styles.cover} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.bookTitle, darkMode && { color: '#fff' }]}>{item.title}</Text>
          <Text style={[styles.bookAuthor, darkMode && { color: '#ccc' }]}>{item.author}</Text>
        </View>
        <FontAwesome name={item.icon} size={24} color={darkMode ? '#0ff' : '#06f'} />
      </View>
    </BlurView>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=80',
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={[styles.container, darkMode && { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, darkMode && { color: '#fff' }]}>📘 Non-Fiction Books</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <TextInput
          placeholder="🔍 Search books..."
          placeholderTextColor={darkMode ? '#ccc' : '#666'}
          style={[styles.searchBar, darkMode && { backgroundColor: '#444', color: '#fff' }]}
          value={search}
          onChangeText={setSearch}
        />

        <BlurView intensity={darkMode ? 100 : 80} tint={darkMode ? 'dark' : 'light'} style={styles.featured}>
          <Text style={[styles.featuredText, darkMode && { color: '#fff' }]}>
            💡 Featured Book: {featured}
          </Text>
        </BlurView>

        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  featured: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  featuredText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  card: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cover: {
    width: 50,
    height: 75,
    borderRadius: 8,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
