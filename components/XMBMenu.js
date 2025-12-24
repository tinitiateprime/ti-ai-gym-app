import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  useWindowDimensions,
  Animated,
  Easing 
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

function throttle(fn, wait) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn(...args);
    }
  };
}

const initialSections = [
  { key: '', icon: '', label: '' },
  { key: '', icon: '', label: '' },
  { key: 'Home', icon: 'home', label: 'Home', subItems: [
      { key: 'News', label: 'News', icon: 'newspaper' },
      { key: 'Offers', label: 'Offers', icon: 'tags' },
      { key: 'NearMeLocation', label: 'Near Me Location', icon: 'map-marker-alt' },
  ] },
  { key: 'Exercise', icon: 'dumbbell', label: 'Exercise', subItems: [
      { key: 'Cardio', label: 'Cardio', icon: 'heartbeat' },
      { key: 'Workout', label: 'Workout', icon: 'running' },
      { key: 'Yoga', label: 'Yoga', icon: 'child' },
  ] },
  { key: 'Food', icon: 'utensils', label: 'Food', subItems: [
      { key: 'Breakfast', label: 'Breakfast', icon: 'coffee' },
      { key: 'Lunch', label: 'Lunch', icon: 'hamburger' },
      { key: 'Nutrition', label: 'Nutrition', icon: 'apple-alt' },
  ] },
  { key: 'Restaurant', label: 'Restaurant', icon: 'store' },
  { key: 'Skincare', icon: 'spa', label: 'Skincare', subItems: [
      { key: 'Routine', label: 'Routine', icon: 'clock' },
      { key: 'Spf', label: 'SPF', icon: 'sun' },
      { key: 'Moisturizing', label: 'Moisturizing', icon: 'tint' },
      { key: 'Hair', label: 'Hair', icon: 'cut' },
      { key: 'Face', label: 'Face', icon: 'smile' },
      { key: 'Body', label: 'Body', icon: 'user' },
      { key: 'Arms', label: 'Arms', icon: 'hand-rock' },
      { key: 'Legs', label: 'Legs', icon: 'walking' },
      { key: 'Feet', label: 'Feet', icon: 'shoe-prints' },
  ] },
  { key: 'HealthCare', icon: 'clinic-medical', label: 'Healthcare', subItems: [
      { key: 'Provider', label: 'Health Provider', icon: 'clinic-medical' },
  ] },
  { key: 'MentalWellness', label: 'Mental Wellness', icon: 'brain' },
  { key: 'Articles', icon: 'file-alt', label: 'Articles', subItems: [
      { key: 'DailyTips', label: 'Daily Tips', icon: 'lightbulb' },
      { key: 'Trends', label: 'Trends', icon: 'chart-line' },
  ] },
  { key: 'Books', icon: 'book', label: 'Books', subItems: [
      { key: 'Fiction', icon: 'book-open', label: 'Fiction' },
      { key: 'NonFiction', icon: 'bookmark', label: 'Non-fiction' },
  ] },
  { key: 'Shop', icon: 'shopping-bag', label: 'Shop', subItems: [
      { key: 'Products', label: 'Products', icon: 'boxes' },
      { key: 'Deals', label: 'Deals', icon: 'percent' },
  ] },
  { key: 'Settings', icon: 'cogs', label: 'Settings', subItems: [
      { key: 'SystemUpdate', label: 'System Update', icon: 'sync' },
      { key: 'DisplaySettings', label: 'Display Settings', icon: 'desktop' },
      { key: 'SystemSettings', label: 'System Settings', icon: 'tools' },
  ] },
  { key: '', icon: '', label: '' },
  { key: '', icon: '', label: '' },
];

export default function XMBMenu() {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const iconRefs = useRef({});
  const { width: windowWidth } = useWindowDimensions();
  const [activeSection, setActiveSection] = useState('Home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [iconScales, setIconScales] = useState({});
  const tickerAnim = useRef(new Animated.Value(0)).current;
  const tickerTextRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const containerWidth = useWindowDimensions().width;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  let animation;

  const startAnimation = () => {
    tickerAnim.setValue(containerWidth);
    animation = Animated.timing(tickerAnim, {
      toValue: -textWidth,
      duration: ((containerWidth + textWidth) / 60) * 1000, // 60px/sec speed
      easing: Easing.linear,
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      if (finished) startAnimation();
    });
  };

  if (textWidth > 0) {
    startAnimation();
  }

  return () => {
    if (animation) animation.stop();
  };
}, [textWidth]);

  const handleOpenSection = (key) => {
    switch (key) {
      case 'Books': navigation.navigate('BooksScreen'); break;
      case 'Fiction': navigation.navigate('FictionScreen'); break;
      case 'NonFiction': navigation.navigate('NonFictionScreen'); break;
      case 'Routine': navigation.navigate('Routine'); break;
      case 'Spf': navigation.navigate('Spf'); break;
      case 'Moisturizing': navigation.navigate('Moisturizing'); break;
      case 'Yoga': navigation.navigate('Yoga'); break;
      case 'Workout': navigation.navigate('Workout'); break;
      case 'Cardio': navigation.navigate('Cardio'); break;
      case 'Nutrition': navigation.navigate('Nutrition'); break;
      case 'Breakfast': navigation.navigate('Breakfast'); break;
      case 'Lunch': navigation.navigate('Lunch'); break;
      case 'Hair': navigation.navigate('Hair'); break;
      case 'Face': navigation.navigate('Face'); break;
      case 'Body': navigation.navigate('Body'); break;
      case 'Arms': navigation.navigate('Arms'); break;
      case 'Legs': navigation.navigate('Legs'); break;
      case 'Feet': navigation.navigate('Feet'); break;
      case 'Restaurant': navigation.navigate('Restaurant'); break;
      case 'Products': navigation.navigate('Products'); break;
      case 'Deals': navigation.navigate('Deals'); break;
      case 'DailyTips': navigation.navigate('DailyTips'); break;
      case 'Trends': navigation.navigate('Trends'); break;
      case 'MentalWellness': navigation.navigate('MentalWellness'); break;
      case 'Provider': navigation.navigate('HealthProvider'); break;
      case 'News': navigation.navigate('News'); break;
      case 'Offers': navigation.navigate('Offers'); break;
      case 'NearMeLocation': navigation.navigate('NearMeLocation'); break;
      default: Alert.alert(`${key} Screen Opened`); break;
    }
  };

  const handleIconPress = (key) => {
    if (activeSection === key) handleOpenSection(key);
    else {
      setActiveSection(key);
      scrollToIcon(key);
    }
  };

  const scrollToIcon = (key) => {
    const iconRef = iconRefs.current[key];
    if (iconRef && typeof iconRef.measureLayout === 'function') {
      iconRef.measureLayout(scrollRef.current, (x, y, width) => {
        const highlightX = windowWidth * 0.30;
        const offset = x + width / 2 - highlightX;
        scrollRef.current.scrollTo({ x: offset, y: 0, animated: true });
      });
    }
  };

  const handleScroll = throttle(() => {
    const highlightX = windowWidth * 0.28;
    const sizeThreshold = 20;
    const measurePromises = Object.entries(iconRefs.current).map(([key, ref]) => {
      return new Promise((resolve) => {
        if (ref && typeof ref.measureInWindow === 'function') {
          ref.measureInWindow((x, y, width) => {
            const iconCenter = x + width / 2;
            const distance = Math.abs(highlightX - iconCenter);
            resolve({ key, distance });
          });
        } else resolve(null);
      });
    });

    Promise.all(measurePromises).then((results) => {
      const filtered = results.filter(Boolean);
      const closest = filtered.sort((a, b) => a.distance - b.distance)[0];
      if (closest && closest.distance < sizeThreshold && closest.key !== activeSection) {
        setActiveSection(closest.key);
      }
      const updatedSizes = {};
      filtered.forEach(({ key, distance }) => {
        updatedSizes[key] = distance < sizeThreshold ? 1.3 : 1;
      });
      setIconScales(updatedSizes);
    });
  }, 10);

  const shouldShowSubItems = (sectionKey) => Platform.OS === 'web' ? hoveredSection === sectionKey : activeSection === sectionKey;

  return (
    <View style={styles.background}>
      <Video source={require('../assets/ps3_wave.mp4')} style={StyleSheet.absoluteFill} resizeMode="cover" isLooping shouldPlay isMuted />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../assets/favicon_new.png')} style={styles.brandImage} resizeMode="contain" />
        <Text style={styles.clock}>{currentTime}</Text>
      </View>

      <View style={{ flex: 1, paddingBottom: 90 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.iconRow}
          style={styles.scrollContainer}
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          {initialSections.map((section, index) => (
            <View
              key={section.key || `section-${index}`}
              style={styles.iconColumn}
              onMouseEnter={() => setHoveredSection(section.key)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <TouchableOpacity
                ref={(ref) => (iconRefs.current[section.key || `section-${index}`] = ref)}
                onPress={() => handleIconPress(section.key)}
              >
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name={section.icon} size={30 * (iconScales[section.key] || 1)} color="white" />
                  <Text style={[styles.label, activeSection === section.key && styles.activeLabel]}>{section.label}</Text>
                </View> 
              </TouchableOpacity>
              {shouldShowSubItems(section.key) && section.subItems && (
                <View style={styles.inlineSubItems}>
                  {section.subItems.map((subItem, idx) => (
                    <TouchableOpacity key={idx} style={styles.inlineSubItem} onPress={() => handleOpenSection(subItem.key || subItem.label)}>
                      <FontAwesome5 name={subItem.icon} size={16} color="#bbb" />
                      <Text style={styles.inlineSubItemText}>{subItem.label}</Text>
                    </TouchableOpacity> 
                  ))}
                </View>  
              )}
            </View> 
          ))}
        </ScrollView>
      </View>

  <View style={styles.tickerWrapper}>
  <View style={styles.tickerLine} />
  <View style={{ overflow: 'hidden', width: '100%' }}>
    <Animated.Text
      ref={tickerTextRef}
      onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
      style={[
        styles.tickerText,
        {
          transform: [{ translateX: tickerAnim }],
        },
      ]}
    >
      FitnessApp — Achieve your health goals one step at a time!
    </Animated.Text>
  </View>
</View>


      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 © tinitiate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#000' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center' },
  backButton: { position: 'absolute', left: 5, zIndex: 10 },
  clock: { color: 'white', fontSize: 16 },
  brandImage: { width: 50, height: 100, marginTop: 10, left: 20 },
  scrollContainer: { marginTop: 60 },
  iconRow: { flexDirection: 'row', paddingHorizontal: 1 },
  iconColumn: { width: 64, alignItems: 'center', marginRight: 30 },
  iconWrapper: { alignItems: 'center' },
  label: { color: 'white', fontSize: 15, marginTop: 5 },
  activeLabel: { fontWeight: 'bold' },
  inlineSubItems: { marginTop: 10, flexDirection: 'column', alignItems: 'center', gap: 10 },
  inlineSubItem: { alignItems: 'center' },
  inlineSubItemText: { fontSize: 12, color: '#bbb', marginTop: 2 },
  tickerWrapper: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center', height: 30, overflow: 'hidden' },
  tickerLine: { width: '100%', height: 1, backgroundColor: '#999', marginBottom: 4},
  tickerText: { color: '#fff', fontSize: 14 },
  footer: { position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', paddingVertical: 15 },
  footerText: { color: '#888', fontSize: 20 },
});
