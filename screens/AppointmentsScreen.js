// AppointmentsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
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

export default AppointmentsScreen;
