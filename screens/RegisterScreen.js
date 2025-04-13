import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { registerUser } from '../config/api'; // Import the registration API function

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role is "patient"
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API call

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true); // Start loading indicator
    try {
      const registerData = { name, email, password, role };
      const response = await registerUser(registerData);

      if (response.success) {
        // Navigate to login screen after successful registration
        navigation.navigate('Login');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://media.gettyimages.com/id/1769209056/vector/modern-curve-abstract-background.jpg?s=612x612&w=0&k=20&c=mZ2CQLhJYaCcuSV6t1AhvtKCmiefukGzoGDL4_9o7p8=" }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Card Container */}
        <View style={styles.card}>
          {/* Logo */}
          <Image
            source={{ uri: "https://media.gettyimages.com/id/1266336633/vector/protection-shield.jpg?s=612x612&w=0&k=20&c=CgAQmOK0MfjhASrbF5ARrOyqT2Ff5f4msNyiVh2RaOw=" }}
            style={styles.logo}
          />

          {/* Header */}
          <Text style={styles.header}>Create an Account</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Role:</Text>
            <TouchableOpacity
              style={[styles.roleButton, role === 'doctor' && styles.roleButtonActive]}
              onPress={() => setRole('doctor')}
            >
              <Text style={[styles.roleButtonText, role === 'doctor' && styles.roleButtonTextActive]}>
                Doctor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'patient' && styles.roleButtonActive]}
              onPress={() => setRole('patient')}
            >
              <Text style={[styles.roleButtonText, role === 'patient' && styles.roleButtonTextActive]}>
                Patient
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" /> // Show loading spinner
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
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
    borderRadius: 50,
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
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  roleButtonActive: {
    backgroundColor: '#00679a',
  },
  roleButtonText: {
    fontSize: 14,
    color: '#333',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00679a',
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