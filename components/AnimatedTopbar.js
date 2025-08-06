import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define sections with icons
const sections = [
  {
    name: 'Exercise',
    icon: <FontAwesome5 name="dumbbell" size={20} color="#fff" />,
  },
  {
    name: 'Food',
    icon: <MaterialCommunityIcons name="food" size={24} color="#fff" />,
  },
  {
    name: 'Skincare',
    icon: <MaterialCommunityIcons name="face-woman" size={24} color="#fff" />,
  },
  {
    name: 'Home',
    icon: <Ionicons name="home" size={24} color="#fff" />,
  },
];

export default function AnimatedTopbar({ setActiveSection, active }) {
  const positions = useRef(sections.map(() => new Animated.Value(-100))).current;
  const animations = useRef([]).current;
  const isRunning = useRef(sections.map(() => true)).current;

  const animate = (index) => {
    const start = -100;
    const end = width;
    const duration = 8000 + index * 1000;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(positions[index], {
          toValue: end,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(positions[index], {
          toValue: start,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animations[index] = animation;
    animation.start();
  };

  useEffect(() => {
    sections.forEach((_, index) => animate(index));

    return () => {
      animations.forEach((anim, index) => {
        if (anim?.stop) anim.stop();
        isRunning[index] = false;
      });
    };
  }, []);

  const handlePress = (sectionName, index) => {
    setActiveSection(sectionName);
    isRunning[index] = false;
    animations[index]?.stop();

    sections.forEach((_, i) => {
      if (i !== index && !isRunning[i]) {
        isRunning[i] = true;
        animate(i);
      }
    });
  };

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <Animated.View
          key={section.name}
          style={[
            styles.animatedView,
            {
              transform: [{ translateX: positions[index] }],
              zIndex: active === section.name ? 1 : 0,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.icon, active === section.name && styles.active]}
            onPress={() => handlePress(section.name, index)}
          >
            {section.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    // backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  animatedView: {
    position: 'absolute',
    top: 20,
  },
  icon: {
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#333',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: 'crimson',
  },
});
