import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const allLocations = [
  {
    name: 'Healthy Foods Store',
    distance: '1.2 km',
    category: 'Food',
    open: true,
    icon: <MaterialIcons name="store" size={24} color="#fff" />,
  },
  {
    name: 'Fitness Gym Plus',
    distance: '2.5 km',
    category: 'Gym',
    open: false,
    icon: <FontAwesome5 name="dumbbell" size={22} color="#fff" />,
  },
  {
    name: 'Fresh Juice Bar',
    distance: '900 m',
    category: 'Juice',
    open: true,
    icon: <Ionicons name="cafe" size={24} color="#fff" />,
  },
  {
    name: 'Organic Market',
    distance: '1.5 km',
    category: 'Food',
    open: true,
    icon: <MaterialIcons name="local-grocery-store" size={24} color="#fff" />,
  },
];

const categories = ['All', 'Food', 'Gym', 'Juice'];

export default function NearMeLocationScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLocations =
    selectedCategory === 'All'
      ? allLocations
      : allLocations.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Near Me</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Category Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.activeFilterText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* List */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.distance}>{item.distance} away</Text>
              </View>
              <Text
                style={[
                  styles.status,
                  { color: item.open ? '#4CAF50' : '#FF5252' },
                ]}
              >
                {item.open ? 'Open Now' : 'Closed'}
              </Text>
            </View>

            <TouchableOpacity style={styles.directionsBtn}>
              <Ionicons name="navigate" size={18} color="#fff" />
              <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101010' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#222',
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  distance: { color: '#aaa', marginTop: 2 },
  status: { fontWeight: 'bold' },
  directionsBtn: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  directionsText: { color: '#fff', marginLeft: 6 },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  filterRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#181818',
  },
  filterButton: {
    backgroundColor: '#222',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  filterText: { color: '#bbb', fontSize: 14 },
  activeFilter: { backgroundColor: '#444' },
  activeFilterText: { color: '#fff', fontWeight: 'bold' },
});
