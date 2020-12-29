import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import MovieModal from './MovieModal';

const MainStack = createStackNavigator();

export default function MainStackScreen() {
  return (
    <MainStack.Navigator mode="modal" headerMode="none">
      <MainStack.Screen name="Library" component={LibraryScreen} />
      <MainStack.Screen name="MyModal" component={MovieModal} />
    </MainStack.Navigator>
  );
}
