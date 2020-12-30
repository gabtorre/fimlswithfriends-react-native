import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import moment from "moment";
import Comments from "./Comments";
import AddComment from "./AddComment";

export default function Post(props) {
    const postRef = db.collection("posts");
    const sortedPostsRef = postRef.orderBy("createdAt", "desc").limit(1);
    const [sortedposts] = useCollectionData(sortedPostsRef, { idField: "id" });

    return (
      <>
        {sortedposts &&
          sortedposts.map((post) => (
            <View style={styles.container}>
              <SafeAreaView>
                <Text style={styles.header} aria-level="3">{post.title} ({post.release.substring(0, 4)})</Text>
              </SafeAreaView>
              <ScrollView style={styles.posts}>
                <View style={styles.container}>
                  <Image
                    style={styles.postPoster}
                    resizeMode={"cover"}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${post.poster}`,
                    }}
                  />

                  <View key={post.id} style={styles.postBigWrapper}>
                    <View style={styles.sectionWrapper}>
                      <View key={post.id} style={styles.postWrapper}>
                        <View style={styles.row}>
                          <View style={styles.postLeft}>
                            <View style={styles.postWrapper}>
                              <View style={styles.row}>
                                <Image
                                  style={styles.profilepic}
                                  source={{
                                    uri: `${post.photoURL}`,
                                  }}
                                />
                              </View>
                            </View>
                          </View>

                          <View style={styles.postRight}>
                            <Text style={styles.postTitle}>{post.text}</Text>
                            <View style={styles.minicolumn}>
                              <Text style={styles.postText}>
                                {post.username} rated {post.rating} stars
                              </Text>
                              <Text style={styles.postText}>
                                submitted {moment(post.createdAt.toDate()).fromNow()}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Comments data={post.comments} />
                    <AddComment />
                  </View>
                </View>
              </ScrollView>
            </View>
          ))}
      </>
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
      paddingTop: 10,
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
  });
