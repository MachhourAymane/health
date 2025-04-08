import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../config/api";  // Ensure this API call is correct

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      const response = await registerUser({ name, email, password });
      if (response.success) {
        navigation.navigate("Login");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nice To Meet You</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        CLICK HERE TO LOGIN
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginBottom: 15, paddingLeft: 10 },
  error: { color: "red", marginTop: 10 },
  link: { color: "blue", marginTop: 15, textAlign: "center" },
});

export default RegisterScreen;
