import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDoctors } from '../config/api';

const HomeScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data.data);
      } catch (error) {
        setError('Error fetching doctors');
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctors List</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            {/* Add other doctor details here */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default HomeScreen;
