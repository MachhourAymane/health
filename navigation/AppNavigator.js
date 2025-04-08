import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";

const AppNavigator = () => {
  const router = createBrowserRouter([
    { path: "/", element: <HomeScreen /> },
    { path: "/login", element: <LoginScreen /> },
    { path: "/register", element: <RegisterScreen /> },
    { path: "/appointments", element: <AppointmentsScreen /> },
  ]);

  return <RouterProvider router={router} />;
};

export default AppNavigator;
