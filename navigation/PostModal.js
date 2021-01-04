import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Comments from "../components/Post/Comments";
import AddComment from "../components/Post/AddComment";
import WatchButton from '../components/Library/WatchButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";

export default function PostModal({ route, navigation }) {
  const {
    title,
    poster,
    movieid,
    date,
    comments,
    postid,
    photoURL,
    text,
    username,
    rating,
    createdAt,
  } = route.params;

  // console.log(comments)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
    <StatusBar hidden />
        <ScrollView bounces={false} style={styles.posts}>
          <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()} >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          <View style={styles.container}>
            <ImageBackground
              style={styles.postPoster}
              resizeMode={"cover"}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${poster}`,
              }}
            >
            </ImageBackground>
            <WatchButton title={title} poster={poster} movieid={movieid} date={date} navigation={navigation} />
            <View key={postid} style={styles.postBigWrapper}>
              <View style={styles.sectionWrapper}>
                <View key={postid} style={styles.postWrapper}>
                  <View style={styles.row}>
                    <View style={styles.postLeft}>
                      <View style={styles.postWrapper}>
                        <View style={styles.row}>
                          <Image
                            style={styles.profilepic}
                            source={{
                              uri: `${photoURL}`,
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={styles.postRight}>
                      <Text style={styles.postTitle}>{text}</Text>
                      <View style={styles.minicolumn}>
                        <Text style={styles.postText}>
                          {username} rated {rating} stars
                        </Text>
                        <Text style={styles.postText}>
                          submitted {moment(createdAt.toDate()).fromNow()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              { comments.length>0 ? <Comments comments={comments} /> : null}
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
    backgroundColor: "#181D2F",
    alignItems: "center",
  },
  sectionWrapper: {
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  minicolumn: {
    flexDirection: "column",
    marginLeft: 5,
  },
  postLeft: {
    width: "30%",
    padding: 10,
  },
  postRight: {
    width: "70%",
    padding: 10,
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  posts: {
    width: "100%",
    flexDirection: "column",
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  postWrapper: {
    padding: 10,
    alignItems: "center",
    width: "99%",
    overflow: "hidden",
    borderRadius: 10,
    margin: 5,
  },
  postBigWrapper: {
    padding: 10,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#0E111D",
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 20,
    margin: 5,
    color: "white",
  },
  postText: {
    color: "white",
    fontSize: 10,
    margin: 2,
  },
  posterWrapper: {
    alignItems: "center",
    width: "100%",
  },
  postPoster: {
    minHeight: 500,
    minWidth: "100%",
    resizeMode: "cover",
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 999,
  }
});
