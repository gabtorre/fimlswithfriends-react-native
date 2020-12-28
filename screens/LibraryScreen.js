import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase, { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function HomeScreen() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser.uid;
  const [userdata] = useDocumentData(db.doc('users/' + currentUser));

  return (
    <View style={styles.container}>
      {userdata && userdata.watchlist.map(post => <Text key={post.id}>{post.title}</Text> )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
