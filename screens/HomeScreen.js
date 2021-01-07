import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

export default function Posts({ navigation }) {

  const postRef = db.collection('posts');
  const sortedPostsRef = postRef.orderBy('createdAt', 'desc');
  const [ sortedposts ] = useCollectionData(sortedPostsRef, {idField: 'id'});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <Text style={styles.header}>Activity Feed</Text>
          {sortedposts && sortedposts.map(post =>
            <TouchableOpacity key={post.id}
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
              username: post.username,
              createdAt: post.createdAt
            })} >

              <View key={post.id} style={styles.postWrapper}>

                <View style={styles.row}>
                  <Image style={styles.profilepic} source={{ uri: `${post.photoURL}` }}/>
                  <View style={styles.postRight}>
                    <Text style={styles.postUsername}> {post.username}</Text>
                    {post.createdAt ? <Text style={styles.postText}> Rated {post.rating} stars {moment(post.createdAt.toDate()).fromNow()}</Text> : null }
                  </View>
                </View>

                <View style={styles.row}>
                  <Text style={styles.postTitle}>{post.text}</Text>
                </View>

                <View style={styles.row}>
                  <View style={styles.movieDiv}>
                    <Image style={styles.image} resizeMode={"cover"} source={{ uri: `https://image.tmdb.org/t/p/w500/${post.poster}` }}/>
                  </View>
                  <View style={styles.textDiv}>
                    <Text style={styles.title}>{post.title} ({post.release.substring(0, 4)})</Text>
                    <Text style={styles.synopsis}>{post.synopsis}</Text>
                  </View>
                </View>

                <View style={styles.btnsRow}>
                  <Text style={styles.iconText}><FontAwesome name="comments" size={24} color="white" /> {post.comments.length}</Text>
                  <Text style={styles.iconText}><FontAwesome name="heart" size={22} color="white" /> {post.likes.length}</Text>
                </View>

              </View>
            </TouchableOpacity>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#181D2F',
  },
  header: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    marginTop: 10,
    marginLeft: 20,
  },
  postWrapper: {
    display: 'flex',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#0E111D',
    borderRadius: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 10,
  },
  postRight: {
    width: '70%',
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  postTitle: {
    fontSize: 20,
    margin: 5,
    color: 'white',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  postText: {
    color: 'white',
    fontSize: 10,
    margin: 2
  },
  synopsis: {
    color: 'white',
    fontSize: 12,
  },
  postUsername: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  movieDiv: {
    flexGrow: 1,
    marginRight: 15,
  },
  textDiv: {
    flexShrink: 1,
    flexWrap: 'nowrap',
    marginRight: 15,
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 20,
  },
  btnsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconText: {
    color: 'white',
    fontSize: 17,
    marginLeft: 10
  },
});
