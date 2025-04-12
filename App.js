import React , { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TabNavigator from './navigation/tabNavigator'; // Ensure this import is correct
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      //await AsyncStorage.removeItem('userToken');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const token = await AsyncStorage.getItem('userToken');
      //setIsAuthenticated(!!token);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    //return null; // Or a loading spinner
      return <SplashScreen />;
    
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={(props) => (
              <LoginScreen {...props} onLoginSuccess={checkAuthStatus} />
            )} />
            <Stack.Screen name="Register" component={RegisterScreen} />

          </>
        ) : (
          <Stack.Screen 
            name="Home" 
            component={(props) => (
              <TabNavigator {...props} onLogout={checkAuthStatus} />
            )}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

  
};

export default App;
