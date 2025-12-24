import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const hairTips = [
  {
    icon: 'tint',
    title: 'Hydration is Key',
    description: 'Use moisturizing shampoos and conditioners to prevent dryness and split ends.',
  },
  {
    icon: 'cut',
    title: 'Trim Regularly',
    description: 'Trim your hair every 6-8 weeks to maintain healthy ends.',
  },
  {
    icon: 'sun',
    title: 'Protect from Sun',
    description: 'Use a hat or UV spray to shield your hair from sun damage.',
  },
  {
    icon: 'spa',
    title: 'Oil Treatments',
    description: 'Apply coconut or argan oil weekly to strengthen and nourish the scalp.',
  },
  {
    icon: 'wind',
    title: 'Avoid Heat Styling',
    description: 'Minimize use of flat irons and blow dryers to reduce heat damage.',
  },
];

export default function HairScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/hair.png')} 
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Hair Care</Text>
          <View style={{ width: 28 }} /> {/* Spacer */}
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          {hairTips.map((tip, index) => (
            <View key={index} style={styles.card}>
              <FontAwesome5 name={tip.icon} size={24} color="#3ba99c" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>{tip.title}</Text>
              <Text style={styles.cardDescription}>{tip.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.85,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark overlay
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
