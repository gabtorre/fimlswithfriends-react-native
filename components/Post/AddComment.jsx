import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
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
    <View style={styles.commentWrapper}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="grey"
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity
          style={styles.button}
          title="submit"
          onPress={() => handleCommentSubmission()}
          type="submit"
        ><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentWrapper: {
    padding: 10,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#171C2E",
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline'
  },
  input: {
    flexGrow: 1,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: '#dc3546',
  }
});
