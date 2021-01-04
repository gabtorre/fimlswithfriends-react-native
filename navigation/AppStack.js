import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieStackScreen from './MovieStackScreen';
import PostsStackScreen from './PostsStackScreen';
import SearchStackScreen from './SearchStackScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            }
            else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'Library') {
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
            name="Home"
            component={PostsStackScreen}
            options={{ title: 'Home' }}
        />
        <Tab.Screen
            name="Search"
            component={SearchStackScreen}
            options={{ title: 'Search' }}
        />
        <Tab.Screen
            name="Library"
            component={MovieStackScreen}
            options={{ title: 'Library' }}
        />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
        />
    </Tab.Navigator>
  );
};

export default AppStack;
