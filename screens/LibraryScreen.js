import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Firebase, { db } from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import WatchList from '../components/Library/WatchList';
import WatchedList from '../components/Library/WatchedList';

export default function LibraryScreen() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;

  return (
    <View style={styles.container}>
    <ScrollView bounces={false} style={styles.viewWidth}>
      <WatchList key="watchlist" />
      <WatchedList key="watchedlist" />
    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewWidth: {
    width: '90%'
  }
});
