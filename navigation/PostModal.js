import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Comments from "../components/Post/Comments";
import AddComment from "../components/Post/AddComment";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import  {LikeButton} from "../components/Post/LikeButton";
import WatchButton from '../components/Library/WatchButton';
import { db } from '../firebase';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import { LinearGradient } from 'expo-linear-gradient';

export default function PostModal({ route, navigation }) {
  const {
    title,
    poster,
    movieid,
    date,
    createdAt,
    postid,
    photoURL,
    text,
    username,
    rating,
  } = route.params;

  const [comments] = useDocumentData(db.doc('posts/' + postid));

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
    <StatusBar hidden />
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>
      <ScrollView bounces={false}>
        <ImageBackground
          style={styles.postPoster}
          resizeMode={"cover"}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${poster}`, }}
        >
          <View style={styles.btnsRow}>
            <WatchButton
              title={title}
              poster={poster}
              movieid={movieid}
              date={date}
              navigation={navigation}
            />
            <LikeButton postid={postid} />
          </View>
          <LinearGradient
          colors={['transparent','rgba(24,29,47,1)']}
          style={styles.gradientPosition}
          />
        </ImageBackground>
        <View style={styles.container}>
          <Text style={styles.movieTitle}>{title}</Text>
          <View key={postid} style={styles.postBigWrapper}>
            <View style={styles.postRow}>
              <Image
                style={styles.profilepic}
                source={{
                  uri: `${photoURL}`,
                }}
              />
              <View style={styles.postRight}>
                <Text style={styles.postText}>{username} rated {rating} stars</Text>
                <Text style={styles.postText}>submitted {moment(createdAt.toDate()).fromNow()}</Text>
              </View>
              <Text style={styles.postTitle}>{text}</Text>
            </View>
            {comments ? <Comments comments={comments.comments} /> : null}
            <AddComment postid={postid} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: '100%',
    backgroundColor: "#181D2F",
    paddingHorizontal: 20,
  },
  btnsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 500,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  gradientPosition: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 500,
    zIndex: 0,
  },
  movieTitle: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'left',
  },
  postBigWrapper: {
    padding: 10,
    width: "100%",
    backgroundColor: "#0E111D",
    marginVertical: 10,
    borderRadius: 20,
  },
  postRow: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  postRight: {
    width: "70%",
    padding: 8,
  },
  postText: {
    color: "white",
    fontSize: 10,
    margin: 2,
    marginLeft: 10,
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  postTitle: {
    display: 'flex',
    fontSize: 20,
    marginTop: 20,
    color: "white",
  },
  postPoster: {
    height: 500,
    minWidth: "100%",
    resizeMode: "cover",
  },
  close: {
    position: "absolute",
    right: "5%",
    top: "5%",
    zIndex: 999,
    shadowOffset: { width: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5,
  },
});
