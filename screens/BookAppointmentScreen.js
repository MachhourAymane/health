// AppointmentsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookAppointmentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Appointment</Text>
      {/* You can render your appointments here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default BookAppointmentScreen;
