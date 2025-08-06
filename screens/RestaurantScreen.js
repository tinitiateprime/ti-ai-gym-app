import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const restaurants = [
  {
    name: 'Healthy Bites',
    description: 'Organic meals and smoothies',
    image: require('../assets/restaurant1.png'),
    rating: 4.5,
    openHours: '9 AM - 10 PM',
    phone: '+91 98765 43210',
    distance: '2.3 km',
    mapsLink: 'https://maps.google.com?q=Healthy+Bites',
  },
  {
    name: 'Veggie Delight',
    description: 'Vegetarian and Vegan dishes',
    image: require('../assets/restaurant2.png'),
    rating: 4.2,
    openHours: '10 AM - 9 PM',
    phone: '+91 87654 32109',
    distance: '3.1 km',
    mapsLink: 'https://maps.google.com?q=Veggie+Delight',
  },
  {
    name: 'Fit Fuel Cafe',
    description: 'Protein-rich meals and salads',
    image: require('../assets/restaurant3.png'),
    rating: 4.7,
    openHours: '8 AM - 11 PM',
    phone: '+91 76543 21098',
    distance: '1.8 km',
    mapsLink: 'https://maps.google.com?q=Fit+Fuel+Cafe',
  },
];

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }
      let currentLoc = await Location.getCurrentPositionAsync({});
      setLocation(currentLoc.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Restaurants</Text>
        <View style={{ width: 28 }} /> {/* Spacer */}
      </View>

      {/* Banner */}
      <Image
        source={require('../assets/restaurant-banner.png')}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* List */}
      <ScrollView contentContainerStyle={styles.content}>
        {restaurants.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>

              {/* Rating */}
              <View style={styles.ratingRow}>
                <MaterialIcons name="star-rate" color="#f4c10f" size={18} />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>

              {/* Open Hours */}
              <Text style={styles.infoText}>
                🕒 {item.openHours}
              </Text>

              {/* Contact */}
              <Text style={styles.infoText}>
                📞 {item.phone}
              </Text>

              {/* Distance */}
              <Text style={styles.infoText}>
                📍 {item.distance}
              </Text>

              {/* Map View Button */}
              <TouchableOpacity
                onPress={() => Linking.openURL(item.mapsLink)}
                style={styles.mapButton}
              >
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#222',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  banner: {
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardText: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
  infoText: {
    color: '#bbb',
    fontSize: 13,
    marginTop: 4,
  },
  mapButton: {
    marginTop: 8,
    backgroundColor: '#e91e63',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 13,
  },
});

