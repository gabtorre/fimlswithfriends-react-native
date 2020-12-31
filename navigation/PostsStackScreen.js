import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PostModal from './PostModal';

const MainStack = createStackNavigator();

export default function PostsStackScreen() {
  return (
    <MainStack.Navigator mode="modal" headerMode="none">
      <MainStack.Screen name="Posts" component={HomeScreen} />
      <MainStack.Screen name="PostModal" component={PostModal} />
    </MainStack.Navigator>
  );
}
