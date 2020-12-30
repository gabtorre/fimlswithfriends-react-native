import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import moment from 'moment'

export default function Posts({ navigation }) {

  const postRef = db.collection('posts');
  const sortedPostsRef = postRef.orderBy('createdAt', 'desc');
  const [ sortedposts ] = useCollectionData(sortedPostsRef, {idField: 'id'});

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.header} aria-level="3">Activicty Feed</Text>
      </SafeAreaView>

      <ScrollView style={styles.posts}>
      <View style={styles.container}>

        {sortedposts && sortedposts.map(post =>
        <TouchableOpacity style={styles.container} key={post.id}
        onPress={() => navigation.navigate('PostModal', {
          title: post.title,
          poster: post.poster,
          date: post.release.substring(0, 4),
          movieid: post.movieid,
          postid: post.id,
          comments: post.comments,
          photoURL: post.photoURL,
          rating: post.rating,
          text: post.text,
          username: post.username
        })} >

        <View key={post.id} style={styles.postWrapper}>
          <View style={styles.row}>

            <View style={styles.postLeft}>
              <View style={styles.posterWrapper}>
                <Image
                style={styles.postPoster}
                resizeMode={"cover"}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${post.poster}`
                }}/>
                <Text style={styles.postText}>{post.likes.length} Likes </Text>
              </View>
            </View>

            <View style={styles.postRight}>
              <View style={styles.row}>
                <Image style={styles.profilepic} source={{
                  uri: `${post.photoURL}`}}/>
                  <View style={styles.minicolumn}>
                    <Text style={styles.postText}> {post.username}</Text>
                    <Text style={styles.postText}> Rated {post.rating} stars {moment(post.createdAt.toDate()).fromNow()}</Text>
                  </View>
                </View>
              <Text style={styles.postTitle}>{post.text}</Text>
              <Text style={styles.postText}>{post.title} ({post.release.substring(0, 4)})</Text>
            </View>

          </View>
        </View>
        </TouchableOpacity>
        )}

      </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#181D2F',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  minicolumn: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  postLeft:{
    width: '30%',
    padding: 10
  },
  postRight: {
    width: '70%',
    padding: 10
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  posts: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'column',
  },
  profilepic: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  postWrapper: {
    padding: 10,
    alignItems: 'center',
    width: '90%',
    margin: 10,
    overflow : "hidden",
    backgroundColor: '#0E111D',
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 20,
    margin: 5,
    color: 'white',
  },
  postText: {
    color: 'white',
    fontSize: 10,
    margin: 2
  },
  posterWrapper:{
    alignItems: 'center',
    width: '100%',
  },
  postPoster: {
    minHeight: 150,
    minWidth: '100%',
    resizeMode: "cover",
    borderRadius: 10,
  }
});
