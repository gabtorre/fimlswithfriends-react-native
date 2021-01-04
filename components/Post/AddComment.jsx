import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import { db } from "../../firebase";
import {AuthContext} from "../../navigation/AuthProvider"

export default function AddComment({ postid }) {
  const [comment, setComment] = useState("");
  const {user, setUser} = useContext(AuthContext);

  const handleCommentSubmission = async () => {
    if (comment) {
      const postRef = await db.collection("posts").doc(postid);
      async function addComment() {
        let newComment = {
          content: comment,
          id: Date.now(),
          createdAt: Date.now(),
          username: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        await postRef
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion(newComment),
          })
          .catch((err) => {
            console.error("error adding comment: ", err);
          });
        setComment("");
      }
      addComment();
    }
  };

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.commentWrapper}>
        <View style={styles.row}>
          <TextInput
            style={{ height: 40, flex: 0.9, color: "white" }}
            placeholder="Enter Comment Here"
            placeholderTextColor="grey"
            onChangeText={(text) => setComment(text)}
          />
          <Button
            style={{ flex: 0.1 }}
            title="submit"
            onPress={() => handleCommentSubmission()}
            type="submit"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "100%",
    alignItems: "center",
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
  row: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
  },
});