import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import AddPostModal from './AddPostModal';

const MainStack = createStackNavigator();

export default function PostsStackScreen() {
  return (
    <MainStack.Navigator mode="modal" headerMode="none">
      <MainStack.Screen name="Search" component={SearchScreen} />
      <MainStack.Screen name="AddPostModal" component={AddPostModal} />
    </MainStack.Navigator>
  );
}
