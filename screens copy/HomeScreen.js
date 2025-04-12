import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { getDoctors } from '../config/api';

const HomeScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  // Define local house services for medical purposes
  const houseServices = [
    {
      id: 1,
      title: 'Home Healthcare',
      description: 'Professional nurses and caregivers at your doorstep.',
      icon: 'home', // Use MaterialIcons name
    },
    {
      id: 2,
      title: 'Telemedicine Consultation',
      description: 'Consult with doctors online from the comfort of your home.',
      icon: 'videocam', // Use MaterialIcons name
    },
    {
      id: 3,
      title: 'Medical Equipment Delivery',
      description: 'Get medical supplies and equipment delivered to your home.',
      icon: 'local-shipping', // Use MaterialIcons name
    },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data.data);
      } catch (err) {
        setError('Error fetching doctors');
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <ImageBackground // Replace with your gradient image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Welcome</Text>

        {/* House Services Section */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>House Services</Text>
          <FlatList
            data={houseServices}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.serviceCard}
                onPress={() => navigation.navigate('ServiceDetails', { service: item })}
              >
                {/* Icon */}
                <Icon name={item.icon} size={40} color="#00679a" style={styles.serviceIcon} />
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <Text style={styles.serviceDescription}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Doctor List Section */}
        <View style={styles.doctorListContainer}>
          <Text style={styles.sectionTitle}>Doctors List</Text>

          {/* Error Message */}
          {error && <Text style={styles.error}>{error}</Text>}

          <FlatList
            data={doctors}
            keyExtractor={(item) => item.userId.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
              >
                {/* Profile Picture or Placeholder */}
                <View style={styles.profilePictureContainer}>
                  <Text style={styles.profilePicturePlaceholder}>
                    {item.firstName[0].toUpperCase()}
                    {item.lastName?.[0]?.toUpperCase() || ''}
                  </Text>
                </View>

                {/* Doctor Details */}
                <View style={styles.detailsContainer}>
                  <Text style={styles.doctorName}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={styles.specialization}>Specialization: {item.specialization || 'General'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  serviceIcon: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  doctorListContainer: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  profilePictureContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00679a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profilePicturePlaceholder: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  specialization: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen;