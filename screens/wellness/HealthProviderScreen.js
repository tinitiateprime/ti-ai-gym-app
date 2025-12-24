import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const providers = [
  {
    id: '1',
    name: 'Dr. Asha Rao',
    specialty: 'Psychiatrist',
    location: 'Apollo Hospitals, Hyderabad',
    rating: 4.8,
    openHours: '9:00 AM - 6:00 PM',
    contact: 'tel:+918888888888',
    image: require('../../assets/doctor_1.png'),
  },
  {
    id: '2',
    name: 'Dr. Karan Mehta',
    specialty: 'General Physician',
    location: 'Fortis Health, Delhi',
    rating: 4.6,
    openHours: '10:00 AM - 5:30 PM',
    contact: 'tel:+919999999999',
    image: require('../../assets/doctor_2.png'),
  },
  {
    id: '3',
    name: 'Dr. Priya Deshmukh',
    specialty: 'Nutritionist',
    location: 'Cloudnine Clinic, Mumbai',
    rating: 4.9,
    openHours: '8:30 AM - 4:00 PM',
    contact: 'tel:+917777777777',
    image: require('../../assets/doctor_3.png'),
  },
];

const HealthProviderScreen = () => {
  const handleCall = (url) => {
    Linking.openURL(url);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-photo/blur-hospital_1203-7973.jpg?w=1380&t=st=1693492063~exp=1693492663~hmac=93ab8685acb07f7fe7c3d6abf7b8a2a41c33b667f5dc48ad973bbeddd89f727c',
      }}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>
          <FontAwesome5 name="clinic-medical" size={22} color="#10b981" /> Health Providers
        </Text>
        <FlatList
          data={providers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <Text style={styles.location}>
                  <MaterialIcons name="location-on" size={14} color="#6b7280" /> {item.location}
                </Text>
                <Text style={styles.rating}>
                  <FontAwesome5 name="star" size={12} color="#fbbf24" /> {item.rating} rating
                </Text>
                <Text style={styles.hours}>
                  <MaterialIcons name="access-time" size={12} color="#10b981" /> {item.openHours}
                </Text>
                <TouchableOpacity onPress={() => handleCall(item.contact)} style={styles.callBtn}>
                  <MaterialIcons name="call" size={18} color="#fff" />
                  <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </ImageBackground>
  );
};

export default HealthProviderScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(236, 253, 245, 0.85)',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#047857',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  specialty: {
    fontSize: 14,
    color: '#6b7280',
    marginVertical: 2,
  },
  location: {
    fontSize: 13,
    color: '#6b7280',
  },
  rating: {
    fontSize: 13,
    color: '#f59e0b',
    marginTop: 2,
  },
  hours: {
    fontSize: 13,
    color: '#047857',
    marginTop: 2,
  },
  callBtn: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  callText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});
