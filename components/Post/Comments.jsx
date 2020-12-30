import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

export default function Comments(props) {
  let commentsArray = [props.data[0]];

  function generateComment(comments) {
    return comments.map((comment) => {
      return (
        <View key={comment.id} style={styles.commentWrapper}>
          <View style={styles.row}>
            <View style={styles.postLeft}>
              <View style={styles.commentWrapper}>
                <View style={styles.row}>
                  <Image
                    style={styles.profilepic}
                    source={{
                      uri: `${comment.photoURL}`,
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.postRight}>
              <Text style={styles.postTitle}>{comment.content}</Text>
              <View style={styles.minicolumn}>
                <Text style={styles.postText}>{comment.username} replied</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  return <View style={styles.sectionWrapper}>{commentsArray ? generateComment(commentsArray) : null}</View>;
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
  commentWrapper: {
    padding: 10,
    alignItems: "center",
    width: "99%",
    overflow: "hidden",
    backgroundColor: "#171C2E",
    borderRadius: 10,
    margin: 5,
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
    borderRadius: 10,
  },
});
