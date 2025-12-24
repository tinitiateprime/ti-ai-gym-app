import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/logo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>

        {/* TITLE */}
        <Text style={styles.title}>Welcome to Fitness My App</Text>

        {/* LOGIN + SIGNUP */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('Login')}>
            <Image source={require('../../assets/login.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('Signup')}>
            <Image source={require('../../assets/signup.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>Signup</Text>
          </TouchableOpacity>
        </View>

        {/* FIRST ROW */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('XMB')}>
            <Image source={require('../../assets/xmb_icon.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>XMB</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('GymOwner')}>
            <Image source={require('../../assets/gym.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>Gym Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('GymManagement')}>
            <Image source={require('../../assets/gym_management.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>Management</Text>
          </TouchableOpacity>
        </View>

        {/* SECOND ROW */}
        <View style={styles.iconRow}>

          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('TrainerScreen')}>
            <Image source={require('../../assets/trainer.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>Trainer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate('CustomerPayment')}>
            <Image source={require('../../assets/customer_payment.png')} style={styles.icon} />
            <Text style={styles.iconLabel}>Payments</Text>
          </TouchableOpacity>

          {/* NEW — CUSTOMER MARKETPLACE */}
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => navigation.navigate('CustomerMarketplace')}
          >
            <Image
              source={require('../../assets/customer_marketplace.png')}
              style={styles.icon}
            />
            <Text style={styles.iconLabel}>Marketplace</Text>
          </TouchableOpacity>
        </View>

        {/* THIRD ROW — NEW DIET ICON */}
        <View style={styles.iconRow}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => navigation.navigate('Diet')}
          >
            <Image
              source={require('../../assets/diet.png')}
              style={styles.icon}
            />
            <Text style={styles.iconLabel}>Diet</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    marginBottom: 25,
  },

  iconBox: {
    alignItems: 'center',
    width: 90,
  },

  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 60,   // 🔥 ROUND ICON
    marginBottom: 6,
  },

  iconLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
