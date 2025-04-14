import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { loginUser } from '../config/api';  // Ensure this import is correct
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setIsLoading(true); 
    try {
      const loginData = { email, password };
      const response = await loginUser(loginData);
      //await new Promise(resolve => setTimeout(resolve, 2000));
      //const response = {success: true,message: 'Login successful', token:'abcdefgh'}; // Mock response for testing
      
      if (response.success) {
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('userId', response._id);
        await AsyncStorage.setItem('userName', response.name);
        onLoginSuccess();  // Call the function passed from App.js to update authentication status
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    
    <View style={styles.container}>
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#2196F3" style={styles.spinner} />
      ) : (
        <Button title="Login" onPress={handleLogin} disabled={isLoading} />
      )
      }
      
      {error && <Text style={styles.error}>{error}</Text>}
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>Don't have an account? Register</Text>
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
  spinner: {
    marginVertical: 20,
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

export default LoginScreen;