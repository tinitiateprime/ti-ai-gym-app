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

const faceTips = [
  {
    icon: 'soap',
    title: 'Gentle Cleanser',
    description: 'Avoid harsh scrubs. Use pH-balanced cleansers.',
  },
  {
    icon: 'tint',
    title: 'Hydration',
    description: 'Hydrate with water-based serums & moisturizers.',
  },
  {
    icon: 'cloud-sun',
    title: 'Sun Protection',
    description: 'Apply SPF 30+ every morning, even indoors.',
  },
  {
    icon: 'leaf',
    title: 'Natural Products',
    description: 'Choose skincare products with clean ingredients.',
  },
  {
    icon: 'smile',
    title: 'Facial Massage',
    description: 'Boost circulation and reduce puffiness.',
  },
];

export default function FaceScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={22} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Face Skincare</Text>
        <View style={{ width: 22 }} />
      </View>

      <Image source={require('../../assets/face.png')} style={styles.bannerImage} />

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {faceTips.map((tip, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name={tip.icon} size={24} color="#5AA9E6" />
            </View>
            <Text style={styles.title}>{tip.title}</Text>
            <Text style={styles.description}>{tip.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  scrollArea: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrap: {
    marginBottom: 12,
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 40,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
