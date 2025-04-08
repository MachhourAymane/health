import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { registerUser } from '../config/api';  // Import the registration API function

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
