import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentCard = ({ appointment }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Doctor: {appointment.doctorName}</Text>
      <Text style={styles.text}>Date: {appointment.date}</Text>
      <Text style={styles.text}>Time: {appointment.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
  },
});

export default AppointmentCard;
