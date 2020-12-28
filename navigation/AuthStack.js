import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Tab = createBottomTabNavigator();

const AuthStack = () => {

  return (
    <Tab.Navigator>
        <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
        />
        <Tab.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: 'Singup' }}
        />
    </Tab.Navigator>
  );
};

export default AuthStack;
