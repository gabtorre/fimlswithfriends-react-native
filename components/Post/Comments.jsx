import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

export default function Comments({comments}) {

  function generateComment(comments) {
    return comments.map((comment) => {
      return(
        <View key={comment.id} style={styles.commentWrapper}>
          <View style={styles.row}>
            <Image
              style={styles.profilepic}
              source={{
                uri: `${comment.photoURL}`,
              }}
            />
            <View style={styles.postRight}>
              <Text style={styles.postTitle}>{comment.content}</Text>
              <Text style={styles.postText}>{comment.username} replied</Text>
            </View>
          </View>
        </View>
      )
    });
  }

  return <View>{comments ? generateComment(comments) : null}</View>;
}

const styles = StyleSheet.create({
  commentWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#171C2E",
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  postRight: {
    width: "70%",
    marginLeft: 10,
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  postTitle: {
    fontSize: 20,
    margin: 2,
    color: "white",
  },
  postText: {
    color: "white",
    fontSize: 10,
    margin: 2,
  },
});
