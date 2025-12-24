import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const armTips = [
  {
    icon: 'dumbbell',
    title: 'Strength Training',
    description: 'Incorporate resistance exercises to tone and build arm muscles.',
  },
  {
    icon: 'spa',
    title: 'Arm Skincare',
    description: 'Use exfoliants weekly to remove dead skin and improve texture.',
  },
  {
    icon: 'tint',
    title: 'Moisturize Regularly',
    description: 'Apply body lotion or arm cream to prevent dryness and flakiness.',
  },
  {
    icon: 'wind',
    title: 'Sun & Pollution Protection',
    description: 'Use SPF and sleeves when outdoors to protect skin health.',
  },
  {
    icon: 'heartbeat',
    title: 'Circulation Boost',
    description: 'Massage your arms or use foam rollers to stimulate blood flow.',
  },
];

export default function ArmsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Arms Care</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Top Banner */}
      <Image
        source={require('../../assets/arms.png')}
        style={styles.bannerImage}
      />

      {/* Scrollable Tips */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {armTips.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.iconBox}>
              <FontAwesome5 name={item.icon} size={22} color="#5D9CEC" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  bannerImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  iconBox: {
    backgroundColor: '#EAF3FF',
    padding: 12,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6C7A93',
  },
});
