import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
