import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const yogaPoses = [
  {
    id: 1,
    name: 'Downward Dog',
    sanskrit: 'Adho Mukha Svanasana',
    duration: '1-3 minutes',
    difficulty: 'Beginner',
    benefits: ['Strengthens arms', 'Stretches hamstrings', 'Energizes body'],
    image: require('../../assets/downward_dog.png'),
    gradient: ['#FF9A9E', '#FECFEF', '#FECFEF'],
    description: 'A foundational pose that strengthens and stretches the entire body.',
    instructions: 'Start on hands and knees, tuck toes under, lift hips up and back.',
    chakra: 'Heart Chakra',
    color: '#FF9A9E',
  }, 
  {
    id: 2,
    name: 'Tree Pose',
    sanskrit: 'Vrikshasana',
    duration: '30-60 seconds each side',
    difficulty: 'Intermediate',
    benefits: ['Improves balance', 'Strengthens legs', 'Enhances focus'],
    image: require('../../assets/tree_pose.png'),
    gradient: ['#A8E6CF', '#7FCDCD', '#88D8C0'],
    description: 'A balancing pose that promotes stability and concentration.',
    instructions: 'Stand on one leg, place other foot on inner thigh, hands at heart center.',
    chakra: 'Root Chakra',
    color: '#A8E6CF',
  },
  {
    id: 3,
    name: 'Child\'s Pose',
    sanskrit: 'Balasana',
    duration: '1-5 minutes',
    difficulty: 'Beginner',
    benefits: ['Relieves stress', 'Stretches hips', 'Calms mind'],
    image: require('../../assets/childs_pose.png'),
    gradient: ['#C7CEEA', '#A8B2E8', '#9B9FE8'],
    description: 'A restorative pose that provides deep relaxation and introspection.',
    instructions: 'Kneel down, sit back on heels, fold forward with arms extended.',
    chakra: 'Crown Chakra',
    color: '#C7CEEA',
  },
  {
    id: 4,
    name: 'Warrior I',
    sanskrit: 'Virabhadrasana I',
    duration: '30-60 seconds each side',
    difficulty: 'Intermediate',
    benefits: ['Builds strength', 'Opens hips', 'Increases confidence'],
    image: require('../../assets/warrior_pose.png'),
    gradient: ['#FFD93D', '#6BCF7F', '#4CAF50'],
    description: 'A powerful standing pose that embodies strength and determination.',
    instructions: 'Step back into lunge, raise arms overhead, ground through feet.',
    chakra: 'Solar Plexus',
    color: '#FFD93D',
  },
  {
    id: 5,
    name: 'Lotus Pose',
    sanskrit: 'Padmasana',
    duration: '5-20 minutes',
    difficulty: 'Advanced',
    benefits: ['Deep meditation', 'Hip flexibility', 'Spiritual connection'],
    image: require('../../assets/lotus_pose.png'),
    gradient: ['#E8B7FF', '#C99FFF', '#B284FF'],
    description: 'The ultimate meditation pose for spiritual practice and inner peace.',
    instructions: 'Sit cross-legged, place each foot on opposite thigh, spine straight.',
    chakra: 'Crown Chakra',
    color: '#E8B7FF',
  },
];

const meditationModes = [
  { icon: '🧘‍♀️', name: 'Morning Flow', duration: '10 min', type: 'Energizing' },
  { icon: '🌅', name: 'Sun Salutation', duration: '15 min', type: 'Dynamic' },
  { icon: '🌙', name: 'Evening Calm', duration: '20 min', type: 'Restorative' },
  { icon: '💫', name: 'Deep Meditation', duration: '30 min', type: 'Spiritual' },
];

const breathingTechniques = [
  { name: 'Pranayama', count: '4-7-8', benefit: 'Stress Relief' },
  { name: 'Box Breathing', count: '4-4-4-4', benefit: 'Focus' },
  { name: 'Alternate Nostril', count: 'Variable', benefit: 'Balance' },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return ['#4CAF50', '#66BB6A'];
    case 'Intermediate': return ['#FF9800', '#FFB74D'];
    case 'Advanced': return ['#9C27B0', '#BA68C8'];
    default: return ['#4CAF50', '#66BB6A'];
  }
};

export default function YogaScreen() {
  const [selectedPose, setSelectedPose] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Floating animation for elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const renderParallaxHeader = () => {
    const headerTranslateY = scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [0, -150],
      extrapolate: 'clamp',
    });

    const headerScale = scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 1.3],
      extrapolate: 'clamp',
    });

    const overlayOpacity = scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0.3, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View 
        style={[
          styles.headerContainer,
          {
            transform: [
              { translateY: headerTranslateY },
              { scale: headerScale }
            ],
          },
        ]}
      >
        <ImageBackground
          source={require('../../assets/yoga.png')}
          style={styles.headerBackground}
          imageStyle={styles.headerImage}
        >
          <Animated.View 
            style={[
              styles.headerOverlay,
              { opacity: overlayOpacity }
            ]}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.headerGradient}
          >
            <BlurView intensity={20} style={styles.headerContent}>
              <Animated.View 
                style={[
                  styles.headerTextContainer,
                  { 
                    opacity: fadeAnim,
                    transform: [{ 
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -10],
                      })
                    }],
                  },
                ]}
              >
                <Text style={styles.headerTitle}>🧘‍♀️ YOGA SANCTUARY</Text>
                <Text style={styles.headerSubtitle}>Mind • Body • Soul</Text>
                <Text style={styles.headerDescription}>
                  Journey into inner peace and physical harmony
                </Text>
                
                {/* Chakra Energy Indicators */}
                <View style={styles.chakraContainer}>
                  {['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚪'].map((chakra, index) => (
                    <Animated.View
                      key={index}
                      style={[
                        styles.chakraIndicator,
                        {
                          transform: [{
                            scale: breatheAnim.interpolate({
                              inputRange: [1, 1.1],
                              outputRange: [0.8 + index * 0.05, 1 + index * 0.05],
                            })
                          }],
                        },
                      ]}
                    >
                      <Text style={styles.chakraEmoji}>{chakra}</Text>
                    </Animated.View>
                  ))}
                </View>
              </Animated.View>
            </BlurView>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    );
  };

  const renderMeditationModes = () => (
    <View style={styles.meditationSection}>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
        style={styles.sectionCard}
      >
        <Text style={styles.sectionTitle}>🎵 Guided Sessions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {meditationModes.map((mode, index) => (
            <TouchableOpacity key={index} style={styles.meditationCard}>
              <LinearGradient
                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                style={styles.meditationCardGradient}
              >
                <Text style={styles.meditationIcon}>{mode.icon}</Text>
                <Text style={styles.meditationName}>{mode.name}</Text>
                <Text style={styles.meditationDuration}>{mode.duration}</Text>
                <View style={styles.meditationTypeBadge}>
                  <Text style={styles.meditationTypeText}>{mode.type}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );

  const renderBreathingSection = () => (
    <View style={styles.breathingSection}>
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
        style={styles.breathingCard}
      >
        <Text style={styles.sectionTitle}>💨 Breathing Techniques</Text>
        {breathingTechniques.map((technique, index) => (
          <TouchableOpacity key={index} style={styles.breathingItem}>
            <View style={styles.breathingInfo}>
              <Text style={styles.breathingName}>{technique.name}</Text>
              <Text style={styles.breathingCount}>Rhythm: {technique.count}</Text>
            </View>
            <LinearGradient
              colors={['#FF9A9E', '#FECFEF']}
              style={styles.breathingBenefit}
            >
              <Text style={styles.breathingBenefitText}>{technique.benefit}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </View>
  );

  const renderYogaPose = (pose, index) => (
    <TouchableOpacity
      key={pose.id}
      activeOpacity={0.9}
      onPress={() => setSelectedPose(selectedPose === pose.id ? null : pose.id)}
      style={styles.poseCardContainer}
    >
      <LinearGradient
        colors={['rgba(20,20,40,0.95)', 'rgba(30,30,60,0.9)']}
        style={[styles.poseCard, selectedPose === pose.id && styles.selectedPoseCard]}
      >
        {/* Pose Header */}
        <View style={styles.poseHeader}>
          <View style={styles.poseImageContainer}>
            <Image source={pose.image} style={styles.poseImage} />
            <LinearGradient
              colors={pose.gradient}
              style={styles.poseImageOverlay}
            >
              <View style={styles.poseNumberContainer}>
                <Text style={styles.poseNumber}>{index + 1}</Text>
              </View>
            </LinearGradient>
          </View>
          
          <View style={styles.poseInfo}>
            <Text style={styles.poseName}>{pose.name}</Text>
            <Text style={styles.poseSanskrit}>{pose.sanskrit}</Text>
            <View style={styles.poseMetrics}>
              <View style={styles.poseMetric}>
                <Text style={styles.metricIcon}>⏱️</Text>
                <Text style={styles.metricText}>{pose.duration}</Text>
              </View>
              <LinearGradient
                colors={getDifficultyColor(pose.difficulty)}
                style={styles.difficultyBadge}
              >
                <Text style={styles.difficultyText}>{pose.difficulty}</Text>
              </LinearGradient>
            </View>
          </View>
          
          <TouchableOpacity style={styles.chakraButton}>
            <LinearGradient
              colors={[pose.color + '40', pose.color + '20']}
              style={styles.chakraButtonGradient}
            >
              <Text style={styles.chakraButtonText}>🔮</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Pose Description */}
        <Text style={styles.poseDescription}>{pose.description}</Text>

        {/* Expandable Content */}
        {selectedPose === pose.id && (
          <Animated.View style={styles.expandedContent}>
            {/* Benefits */}
            <View style={styles.benefitsSection}>
              <Text style={styles.expandedSectionTitle}>✨ Benefits</Text>
              <View style={styles.benefitsContainer}>
                {pose.benefits.map((benefit, idx) => (
                  <LinearGradient
                    key={idx}
                    colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                    style={styles.benefitTag}
                  >
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </LinearGradient>
                ))}
              </View>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsSection}>
              <Text style={styles.expandedSectionTitle}>📋 How to Practice</Text>
              <Text style={styles.instructionsText}>{pose.instructions}</Text>
            </View>

            {/* Chakra Info */}
            <View style={styles.chakraSection}>
              <Text style={styles.expandedSectionTitle}>🔮 Chakra Connection</Text>
              <LinearGradient
                colors={[pose.color + '30', pose.color + '10']}
                style={styles.chakraInfo}
              >
                <Text style={styles.chakraName}>{pose.chakra}</Text>
              </LinearGradient>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.primaryActionButton}>
                <LinearGradient
                  colors={pose.gradient}
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.actionButtonText}>🎵 Start Guided Session</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryActionButton}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                  style={styles.actionButtonGradient}
                >
                  <Text style={styles.secondaryActionButtonText}>📖 Learn More</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {renderParallaxHeader()}
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentSpacing} />
        
        {renderMeditationModes()}
        {renderBreathingSection()}
        
        {/* Yoga Poses Section */}
        <View style={styles.posesSection}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'transparent']}
            style={styles.posesSectionHeader}
          >
            <Text style={styles.posesSectionTitle}>🧘‍♀️ Sacred Asanas</Text>
            <Text style={styles.posesSectionSubtitle}>Tap to explore each pose in detail</Text>
          </LinearGradient>
          
          {yogaPoses.map((pose, index) => renderYogaPose(pose, index))}
        </View>
        
        {/* Premium Session Button */}
        <Animated.View 
          style={[
            styles.sessionButtonContainer,
            { transform: [{ scale: breatheAnim }] }
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.sessionButton}>
            <LinearGradient
              colors={['#FF9A9E', '#FECFEF', '#C7CEEA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.sessionButtonGradient}
            >
              <BlurView intensity={30} style={styles.sessionButtonBlur}>
                <View style={styles.sessionButtonContent}>
                  <Text style={styles.sessionButtonText}>🌟 Begin Sacred Practice</Text>
                  <Text style={styles.sessionButtonSubtext}>60 min full journey</Text>
                </View>
                <View style={styles.sessionButtonIcon}>
                  <Text style={styles.sessionButtonArrow}>🕉️</Text>
                </View>
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A15',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    zIndex: 1,
  },
  headerBackground: {
    flex: 1,
  },
  headerImage: {
    opacity: 0.8,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A0A15',
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContent: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 3,
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  chakraContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  chakraIndicator: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chakraEmoji: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 380,
    paddingHorizontal: 20,
  },
  contentSpacing: {
    height: 20,
  },
  meditationSection: {
    marginBottom: 25,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  horizontalScroll: {
    marginHorizontal: -10,
  },
  meditationCard: {
    width: 140,
    marginHorizontal: 8,
  },
  meditationCardGradient: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  meditationIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  meditationName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  meditationDuration: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  meditationTypeBadge: {
    backgroundColor: 'rgba(255,154,158,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  meditationTypeText: {
    fontSize: 10,
    color: '#FF9A9E',
    fontWeight: '600',
  },
  breathingSection: {
    marginBottom: 25,
  },
  breathingCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  breathingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  breathingInfo: {
    flex: 1,
  },
  breathingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  breathingCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  breathingBenefit: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  breathingBenefitText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  posesSection: {
    marginBottom: 30,
  },
  posesSectionHeader: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  posesSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  posesSectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  poseCardContainer: {
    marginBottom: 20,
  },
  poseCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedPoseCard: {
    borderColor: '#FF9A9E',
    borderWidth: 2,
  },
  poseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  poseImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  poseImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  poseImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  poseNumberContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poseNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  poseInfo: {
    flex: 1,
  },
  poseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  poseSanskrit: {
    fontSize: 14,
    color: '#FF9A9E',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  poseMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  poseMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metricText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  chakraButton: {
    marginLeft: 10,
  },
  chakraButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chakraButtonText: {
    fontSize: 18,
  },
  poseDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: 15,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 20,
  },
  expandedSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9A9E',
    marginBottom: 12,
  },
  benefitsSection: {
    marginBottom: 20,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  benefitTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  benefitText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  instructionsSection: {
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  chakraSection: {
    marginBottom: 20,
  },
  chakraInfo: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  chakraName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionButtons: {
    gap: 10,
  },
  primaryActionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
})