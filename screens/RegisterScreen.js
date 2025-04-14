import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { registerUser } from '../config/api';  // Import the registration API function
import { Ionicons } from '@expo/vector-icons';
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
  const [name, setName] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const registerData = {name, email, password, role: userType };
      const response = await registerUser(registerData);
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
    <View style={styles.container}>
    <TextInput  // Add name input field
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* Role Selection */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Register as:</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkboxRow}
            onPress={() => setUserType('patient')}
          >
            <Ionicons 
              name={userType === 'patient' ? 'checkbox' : 'square-outline'} 
              size={24} 
              color="#2196F3"
            />
            <Text style={styles.checkboxLabel}>Patient</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.checkboxRow}
            onPress={() => setUserType('doctor')}
          >
            <Ionicons 
              name={userType === 'doctor' ? 'checkbox' : 'square-outline'} 
              size={24} 
              color="#2196F3"
            />
            <Text style={styles.checkboxLabel}>Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button title="Register" onPress={handleRegister} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Already have an account? Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen;
