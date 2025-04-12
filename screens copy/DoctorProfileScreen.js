// DoctorProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DoctorProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Profile</Text>
      {/* Render the doctor's profile details here */}
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

export default DoctorProfileScreen;
