// AppointmentsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,FlatList,
  ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo-vector-icons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppointments } from '../config/api';

const AppointmentsScreen = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = await getAppointments(userId);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Could not load appointments');
    } finally {
      setIsLoading(false);
    }
  };
  const AppointmentCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>{item.doctorInfo.name}</Text>
        <View style={[styles.statusBadge, 
          { backgroundColor: item.status === 'pending' ? '#FFC107' : '#4CAF50' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="medical" size={20} color="#2196F3" />
          <Text style={styles.specialization}>{item.doctorInfo.specialization}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#2196F3" />
          <Text style={styles.dateTime}>{item.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time" size={20} color="#2196F3" />
          <Text style={styles.dateTime}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  if (appointments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noAppointmentsText}>No Appointments Found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      
      <FlatList
        data={appointments}
        renderItem={({ item }) => <AppointmentCard item={item} />}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No appointments found</Text>
        )}
      />
      {/* You can render your appointments here */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('BookAppointment')}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  specialization: {
    fontSize: 16,
    color: '#666',
  },
  dateTime: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },

  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
});

export default AppointmentsScreen;
