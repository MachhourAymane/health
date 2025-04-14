import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const SplashScreen = () => {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo_skeleton.png')} // Make sure to add your splash image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#42cbf5', // Or your app's background color
    },
    logo: {
      width: 200,
      height: 200,
    },
  });
  
  export default SplashScreen;