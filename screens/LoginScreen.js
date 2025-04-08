import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../config/api'; // Make sure to check this import

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const loginData = { email, password };
      const response = await loginUser(loginData);  // Call loginUser correctly
      if (response.success) {
        navigation.navigate('Home');
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Error logging in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        CLICK HERE TO REGISTER
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
