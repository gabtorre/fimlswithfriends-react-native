import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './navigation';
import firebase from "firebase/app";

export default function App() {

  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181D2F",
  },
})
