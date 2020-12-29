import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Firebase, { db } from '../firebase';
import WatchList from '../components/Library/WatchList';
import WatchedList from '../components/Library/WatchedList';

export default function LibraryScreen() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <WatchList />
        <WatchedList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D2F',
    width: '100%'
  }
});
