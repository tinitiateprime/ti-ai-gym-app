import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const offers = [
  {
    title: '20% off on Protein Shakes',
    image: require('../assets/offer1.png'),
    details: 'Valid till August 31, 2025',
    tag: 'Hot Deal',
  },
  {
    title: 'Buy 1 Get 1 Free on Yoga Mats',
    image: require('../assets/offer2.png'),
    details: 'Limited time only!',
    tag: 'BOGO',
  },
  {
    title: '30% Discount on Gym Membership',
    image: require('../assets/offer3.png'),
    details: 'First 100 members only',
    tag: 'Limited',
  },
];

export default function OffersScreen() {
  const navigation = useNavigation();

  const handleClaim = (title) => {
    Alert.alert('Offer Claimed', `You have claimed: ${title}`);
  };

  const handleShare = async (title) => {
    try {
      await Share.share({
        message: `Check out this offer: ${title} on the Fitness App! 💪🔥`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share the offer.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Exclusive Offers</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Offer Cards */}
      <ScrollView contentContainerStyle={styles.content}>
        {offers.map((offer, index) => (
          <View key={index} style={styles.card}>
            <Image source={offer.image} style={styles.cardImage} />

            <View style={styles.tag}>
              <Text style={styles.tagText}>{offer.tag}</Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.title}>{offer.title}</Text>

              <View style={styles.row}>
                <Entypo name="calendar" size={16} color="#aaa" />
                <Text style={styles.details}> {offer.details}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.claimButton}
                  onPress={() => handleClaim(offer.title)}
                >
                  <Text style={styles.claimText}>Claim Offer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleShare(offer.title)}
                >
                  <Feather name="share" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0e' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },

  content: { padding: 16, paddingBottom: 40 },

  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 14,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6,
  },

  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  tag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 2,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  cardBody: {
    padding: 14,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  details: {
    color: '#bbb',
    fontSize: 14,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  claimButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  claimText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  iconButton: {
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderRadius: 8,
  },
});
