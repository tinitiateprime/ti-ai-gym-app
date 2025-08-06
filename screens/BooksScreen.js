// screens/BooksScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const books = [
  { key: 'Fiction', icon: 'book-open', screen: 'FictionScreen' },
  { key: 'Non-fiction', icon: 'bookmark', screen: 'NonFictionScreen' },
];

const BooksScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>
      <View style={styles.iconRow}>
        {books.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.iconWrapper}
            onPress={() => navigation.navigate(item.screen)}
          >
            <FontAwesome5 name={item.icon} size={40} color="white" />
            <Text style={styles.label}>{item.key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: 'white',
    marginBottom: 30,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 40,
  },
  iconWrapper: {
    alignItems: 'center',
    padding: 10,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    color: 'white',
  },
});

