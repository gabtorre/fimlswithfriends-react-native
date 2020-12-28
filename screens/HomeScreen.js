import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground } from 'react-native';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function HomeScreen() {

  const postRef = db.collection('posts');
  const sortedPostsRef = postRef.orderBy('createdAt', 'desc');
  const [ sortedposts ] = useCollectionData(sortedPostsRef, {idField: 'id'});

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.header}>Latest Posts</Text>
      </SafeAreaView>

      <View style={styles.posts}>
        {sortedposts && sortedposts.map(post =>
        <View style={styles.postWrapper}>
          <Text style={styles.postTitle} key={post.id}>{post.title} by {post.username}</Text>
          <Image
          style={styles.postPoster}
          key={post.id+1}
          resizeMode={"cover"}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${post.poster}`
          }}/>
        </View>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D2F',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 20,
  },
  posts: {
    paddingTop: 10,
  },
  postWrapper: {
    paddingTop: 10,
    overflow : "hidden",
  },
  postTitle: {
    color: 'white',
  },
  postPoster: {
    height: 100,
    width: 300,
      resizeMode: "cover",
      borderRadius: 10,
  }
});
