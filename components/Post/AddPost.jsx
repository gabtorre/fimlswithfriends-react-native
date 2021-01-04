import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import firebase from "firebase/app";
import { db } from "../../firebase";
import {AuthContext} from "../../navigation/AuthProvider"

export default function AddPost(props) {
  const [post, setPost] = useState(null);
  const {user, setUser} = useContext(AuthContext);

  const handlePostSubmission = async () => {
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
        <View >
          <TextInput
            style={{ height: 100, color: "white" }}
            placeholder="What do you think?"
            placeholderTextColor="grey"
            onChangeText={(text) => setPost(text)}
          />
          <Button
            title="share"
            onPress={() => handlePostSubmission()}
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
