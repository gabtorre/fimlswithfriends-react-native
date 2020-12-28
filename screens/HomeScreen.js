import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function HomeScreen() {

  const postRef = db.collection('posts');
  const sortedPostsRef = postRef.orderBy('createdAt', 'desc');
  const [ sortedposts ] = useCollectionData(sortedPostsRef, {idField: 'id'});

  return (
    <View style={styles.container}>
      {sortedposts && sortedposts.map(post => <Text key={post.id}>{post.title}</Text> )}
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
