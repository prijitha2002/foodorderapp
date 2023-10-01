// Navigation.js
import React from 'react';
import { useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen'; // Create this component
import SignUpScreen from './SignUpScreen'; // Create this component
import HomeScreen from './HomeScreen'; // Create this component

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
