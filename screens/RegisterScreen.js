import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Use this for newer React Native versions
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please enter name, email, and password');
      return;
    }

    try {
      const registerData = { name, email, password, role };
      const response = await axios.post('http://localhost:5000/api/user/register', registerData);

      if (response.data.success) {
        navigation.navigate('Login');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Registration error', err);
      setError('Error registering');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://media.gettyimages.com/id/1769209056/vector/modern-curve-abstract-background.jpg?s=612x612&w=0&k=20&c=mZ2CQLhJYaCcuSV6t1AhvtKCmiefukGzoGDL4_9o7p8=',
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://media.gettyimages.com/id/1266336633/vector/protection-shield.jpg?s=612x612&w=0&k=20&c=CgAQmOK0MfjhASrbF5ARrOyqT2Ff5f4msNyiVh2RaOw=',
            }}
            style={styles.logo}
          />
          <Text style={styles.header}>Create an Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              style={styles.picker}
              onValueChange={(itemValue) => setRole(itemValue)}
            >
              <Picker.Item label="Patient" value="patient" />
              <Picker.Item label="Doctor" value="doctor" />
            </Picker>
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

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
    elevation: 5,
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
  pickerContainer: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
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