import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const spfTips = [
  {
    icon: '🕐',
    title: 'Apply Early',
    description: 'Apply sunscreen 15–30 mins before sun exposure for maximum protection.',
    color: '#FF6B6B',
  },
  {
    icon: '🔁',
    title: 'Reapply Often',
    description: 'Reapply every 2 hours or after sweating/swimming for continuous protection.',
    color: '#4ECDC4',
  },
  {
    icon: '💦',
    title: 'Water Resistant',
    description: 'Use water-resistant sunscreen if swimming or sweating heavily.',
    color: '#45B7D1',
  },
  {
    icon: '💡',
    title: 'SPF Rating',
    description: 'SPF 30 is minimum; SPF 50+ is better for prolonged outdoor activities.',
    color: '#96CEB4',
  },
];

const skinTypes = [
  {
    type: 'Oily Skin',
    recommendation: 'Gel-based, matte finish',
    icon: '🌟',
    gradient: ['#667eea'],
  },
  {
    type: 'Dry Skin',
    recommendation: 'Cream-based, hydrating formula',
    icon: '💧',
    gradient: ['#fcb69f'],
  },
  {
    type: 'Sensitive Skin',
    recommendation: 'Fragrance-free, mineral sunscreen',
    icon: '🌸',
    gradient: ['#fed6e3'],
  },
  {
    type: 'Acne-Prone',
    recommendation: 'Non-comedogenic, lightweight',
    icon: '✨',
    gradient: ['#fef9d7'],
  },
];

const recommendedSPFs = [
  {
    name: 'Neutrogena Ultra Sheer SPF 50',
    image: 'https://m.media-amazon.com/images/I/71GL0UMRBbL._SX679_.jpg',
    rating: 4.5,
    price: '₹299',
    features: ['Broad Spectrum', 'Non-Greasy', 'Water Resistant'],
  },
  {
    name: 'Minimalist SPF 60 PA+++',
    image: 'https://m.media-amazon.com/images/I/51CK9jw5mtL._SX679_.jpg',
    rating: 4.7,
    price: '₹349',
    features: ['Fragrance-Free', 'No White Cast', 'Lightweight'],
  },
  {
    name: 'La Roche-Posay Anthelios',
    image: 'https://m.media-amazon.com/images/I/61Cy2VnG6RL._SX679_.jpg',
    rating: 4.8,
    price: '₹899',
    features: ['Dermatologist Tested', 'Sensitive Skin', 'UVA/UVB Protection'],
  },
];

const SpfScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>⭐</Text>);
    }
    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>✨</Text>);
    }
    return stars;
  };

  const TipCard = ({ tip, index }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.delay(index * 200).start(() => {
        Animated.spring(animatedValue, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }).start();
      });
    }, []);

    return (
      <Animated.View
        style={[
          styles.tipCard,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
            opacity: animatedValue,
          },
        ]}
      >
        <View style={[styles.tipIcon, { backgroundColor: tip.color }]}>
          <Text style={styles.tipIconText}>{tip.icon}</Text>
        </View>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipDescription}>{tip.description}</Text>
        </View>
      </Animated.View>
    );
  };

  const SkinTypeCard = ({ skinType, index }) => (
    <TouchableOpacity style={styles.skinTypeCard} activeOpacity={0.8}>
      <View style={[styles.skinTypeGradient, { backgroundColor: skinType.gradient[0] }]}>
        <Text style={styles.skinTypeIcon}>{skinType.icon}</Text>
        <Text style={styles.skinTypeTitle}>{skinType.type}</Text>
        <Text style={styles.skinTypeRecommendation}>{skinType.recommendation}</Text>
      </View>
    </TouchableOpacity>
  );

  const ProductCard = ({ product, index }) => (
    <TouchableOpacity 
      style={[styles.productCard, selectedProduct === index && styles.selectedProduct]}
      activeOpacity={0.9}
      onPress={() => setSelectedProduct(selectedProduct === index ? null : index)}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{product.price}</Text>
        </View>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(product.rating)}
          </View>
          <Text style={styles.ratingText}>({product.rating})</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {product.features.map((feature, idx) => (
            <View key={idx} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>SPF Protection</Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1350&q=80',
          }}
          style={styles.hero}
          imageStyle={{ opacity: 0.4 }}
        >
          <View style={styles.heroOverlay}>
            <Animated.View style={[styles.heroContent, { opacity: fadeAnim }]}>
              <Text style={styles.heroTitle}>☀️ SPF Protection</Text>
              <Text style={styles.heroSubtext}>
                Block harmful UV rays. Protect your skin every day.
              </Text>
              <View style={styles.uvIndex}>
                <Text style={styles.uvIndexLabel}>Today's UV Index</Text>
                <Text style={styles.uvIndexValue}>8</Text>
                <Text style={styles.uvIndexStatus}>Very High</Text>
              </View>
            </Animated.View>
          </View>
        </ImageBackground>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Essential SPF Tips</Text>
          <Text style={styles.sectionSubtitle}>Follow these guidelines for optimal protection</Text>
          {spfTips.map((tip, index) => (
            <TipCard key={index} tip={tip} index={index} />
          ))}
        </View>

        {/* Skin Type Guide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 Choose by Skin Type</Text>
          <Text style={styles.sectionSubtitle}>Find the perfect sunscreen for your skin</Text>
          <View style={styles.skinTypesContainer}>
            {skinTypes.map((skinType, index) => (
              <SkinTypeCard key={index} skinType={skinType} index={index} />
            ))}
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 Recommended Sunscreens</Text>
          <Text style={styles.sectionSubtitle}>Top-rated products for maximum protection</Text>
          <View style={styles.productContainer}>
            {recommendedSPFs.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    color: '#ffcc00',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtext: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  uvIndex: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  uvIndexLabel: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 5,
  },
  uvIndexValue: {
    color: '#ff4757',
    fontSize: 28,
    fontWeight: 'bold',
  },
  uvIndexStatus: {
    color: '#ff4757',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#87ceeb',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tipIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tipIconText: {
    fontSize: 20,
  },
  tipContent: {
    flex: 1,
    justifyContent: 'center',
  },
  tipTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  skinTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skinTypeCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  skinTypeGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    borderRadius: 15,
  },
  skinTypeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  skinTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  skinTypeRecommendation: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  productContainer: {
    gap: 20,
  },
  productCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedProduct: {
    borderColor: '#ffcc00',
    borderWidth: 2,
  },
  productImageContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  productImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffcc00',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 12,
  },
  ratingText: {
    color: '#888',
    fontSize: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 5,
  },
  featureTag: {
    backgroundColor: 'rgba(135,206,235,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 5,
  },
  featureText: {
    color: '#87ceeb',
    fontSize: 10,
    fontWeight: '500',
  },
  addToCartButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SpfScreen;