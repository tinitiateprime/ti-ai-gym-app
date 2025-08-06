// components/Header.js
import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function Header() {
  return (
    <SafeAreaView style={styles.SafeArea}>
    <View style={styles.header}>
      
      <View style={styles.left}>
        <Image source={require('../assets/favicon_new.png')} style={styles.logo} />
        <Text style={styles.title}>XMB App</Text>
      </View>

      {/* Right: Profile */}
      <Image source={require('../assets/profile.png')} style={styles.profile} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  }, 
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
});
