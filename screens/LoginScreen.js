import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    Alert.alert('Login Successful', `Welcome back, ${email}`);
  };

  return (
    <ImageBackground
      source={require('../assets/background-icon.png')}
      resizeMode="cover"
      style={styles.bgImage}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back </Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>
            Don’t have an account? <Text style={styles.signupHighlight } >Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10, 
  },
  card: {
    // backgroundColor: 'rgba(0,0,0,0.65)', 
    margin: 20,
    borderRadius: 15, 
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  }, 
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#2b2b3d',
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2b2b3d',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    backgroundColor: '#2b2b3d',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 14,
  },
  loginButton: {
    backgroundColor: '#4e9efc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signupLink: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },

  signupHighlight: {
  color: '#0e17bcff',
  fontWeight: 'bold',
},

});
