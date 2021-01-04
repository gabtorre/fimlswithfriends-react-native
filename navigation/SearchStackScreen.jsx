import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from "../screens/SearchScreen"
import SearchModal from './SearchModal';

const MainStack = createStackNavigator();

export default function PostsStackScreen() {
  return (
    <MainStack.Navigator mode="modal" headerMode="none">
      <MainStack.Screen name="Search" component={SearchScreen} />
      <MainStack.Screen name="SearchModal" component={SearchModal} />
    </MainStack.Navigator>
  );
}
