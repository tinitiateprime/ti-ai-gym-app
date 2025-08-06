import React from 'react';
import { StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/ps3_wave.gif')}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
});
