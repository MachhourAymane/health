import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { registerUser } from '../config/api'; // Import the registration API function

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const registerData = { email, password };
      const response = { success: true, message: 'Registration successful' }; // Mock response for testing
      // const response = await registerUser(registerData);
      if (response.success) {
        navigation.navigate('Login'); // Navigate to login after successful registration
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Registration error', err);
      setError('Error registering user');
    }
  };

  return (
    <ImageBackground
      source="https://media.gettyimages.com/id/1769209056/vector/modern-curve-abstract-background.jpg?s=612x612&w=0&k=20&c=mZ2CQLhJYaCcuSV6t1AhvtKCmiefukGzoGDL4_9o7p8=" // Replace with your gradient image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Card Container */}
        <View style={styles.card}>
          {/* Logo */}
          <Image
            source="https://media.gettyimages.com/id/1266336633/vector/protection-shield.jpg?s=612x612&w=0&k=20&c=CgAQmOK0MfjhASrbF5ARrOyqT2Ff5f4msNyiVh2RaOw=" // Replace with your logo image
            style={styles.logo}
          />

          {/* Header */}
          <Text style={styles.header}>Create an Account</Text>

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Error Message */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 50, // Optional: Add rounded corners for circular logos
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00679a', // Creative orange-red color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default RegisterScreen;