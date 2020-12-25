import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {firestore} from './firebase.js'
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function App() {

  const postRef = firestore.collection('posts');
  const sortedPostsRef = postRef.orderBy('createdAt', 'desc');
  const [ sortedposts ] = useCollectionData(sortedPostsRef, {idField: 'id'});

  console.log(sortedposts)

  return (
    <View style={styles.container}>
      {sortedposts && sortedposts.map(post => <Text key={post.id}>{post.title}</Text> )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
