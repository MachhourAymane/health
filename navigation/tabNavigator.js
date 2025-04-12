import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo-vector-icons
import HomeScreen from '../screens/HomeScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import { TouchableOpacity } from 'react-native';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
const AppointmentStack = createStackNavigator();

const AppointmentStackScreen = () => (
  <AppointmentStack.Navigator>
  
    <AppointmentStack.Screen 
      name="AppointmentsList" 
      component={AppointmentsScreen}
      options={{ headerShown: false }}
    />
    
    <AppointmentStack.Screen 
      name="BookAppointment" 
      component={BookAppointmentScreen}
      options={{
        title: 'Book Appointment',
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
      }}
    />
  </AppointmentStack.Navigator>
);

const TabNavigator = ({navigation,onLogout}) => {
    const handleLogout = async () => {
        try {
            console.log("je suis la")
          await AsyncStorage.removeItem('userToken');
          await onLogout();
          // Navigation will reset automatically due to auth state change in App.js
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    
      const LogoutButton = () => (
        <TouchableOpacity 
          onPress={handleLogout}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="log-out-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
      );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <LogoutButton />, // Add this line to show logout button
        headerShown: true, // Make sure headers are visible    
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Doctors') {
            iconName = focused ? 'medical' : 'medical-outline';
          } else if (route.name === 'Patients') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointements" component={AppointmentStackScreen} />
      <Tab.Screen name="Patients" component={DoctorProfileScreen} />
      <Tab.Screen name="BookAppointment" component={BookAppointmentScreen} />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;