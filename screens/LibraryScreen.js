import React from 'react';
import { ScrollView } from 'react-native';
import Firebase, { db } from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import WatchList from '../components/Library/WatchList';
import WatchedList from '../components/Library/WatchedList';

export default function LibraryScreen() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;

  return (
    <ScrollView bounces={false}>
      <WatchList key="watchlist" />
      <WatchedList key="watchedlist" />
    </ScrollView>
  );
};
