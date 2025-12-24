import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const feetTips = [
  {
    icon: 'shoe-prints',
    title: 'Clean Feet Daily',
    description: 'Wash your feet thoroughly with warm water and soap to avoid infections.',
  },
  {
    icon: 'spa',
    title: 'Moisturize Regularly',
    description: 'Apply foot cream or lotion to prevent dryness and cracking.',
  },
  {
    icon: 'cut',
    title: 'Trim Toenails Properly',
    description: 'Cut nails straight across to avoid ingrown toenails.',
  },
  {
    icon: 'wind',
    title: 'Let Them Breathe',
    description: 'Wear open-toed shoes or sandals occasionally to keep feet fresh.',
  },
  {
    icon: 'walking',
    title: 'Foot Exercises',
    description: 'Do simple stretches and movements to improve circulation and strength.',
  },
];

export default function FeetScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/feet.png')} // Make sure feet.png exists in assets
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Feet Care</Text>
        <View style={{ width: 28 }} /> {/* for symmetry */}
      </View>

      {/* Scrollable Tips */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {feetTips.map((tip, index) => (
          <View key={index} style={styles.card}>
            <FontAwesome5 name={tip.icon} size={26} color="#ff9f68" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{tip.title}</Text>
            <Text style={styles.cardDescription}>{tip.description}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 30,
  },
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});
